import { NextResponse } from 'next/server';
import { updateSession } from "@/lib/supabase-middleware";
import { createServerClient } from "@supabase/ssr";

// BUG-10 FIX: In-memory cache for middleware to prevent DB hits on every request
let cachedSettings = null;
let lastFetchTime = 0;
const CACHE_TTL = 60000; // 1 minute cache

export async function proxy(request) {
    const path = request.nextUrl.pathname;

    const isDashboard = path.startsWith('/dashboard');
    const isAdmin = path.startsWith('/admin');
    const isApi = path.startsWith('/api');
    const isMaintenancePage = path === '/maintenance';
    const isPublicRoute = !isAdmin && !isDashboard && !isApi && !isMaintenancePage;

    // 1. Database-driven checks (Maintenance & Security)
    if (isPublicRoute || isDashboard || isMaintenancePage) {
        try {
            let settings = cachedSettings;
            const now = Date.now();

            if (!settings || (now - lastFetchTime > CACHE_TTL)) {
                const supabase = createServerClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                    {
                        cookies: {
                            getAll() { return request.cookies.getAll(); },
                            setAll(cookiesToSet) {
                                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                            },
                        },
                    }
                );

                const { data, error: settingsError } = await supabase
                    .from('seo_settings')
                    .select('maintenance_mode, maintenance_until, email_2fa_enabled')
                    .eq('id', 1)
                    .single();

                if (data) {
                    cachedSettings = data;
                    lastFetchTime = now;
                    settings = data;
                }
            }

            // DEBUG LOG
            console.debug('[Proxy]', path, '| maintenance:', settings?.maintenance_mode, '| until:', settings?.maintenance_until, '| cached:', now - lastFetchTime < CACHE_TTL);

            if (settings) {
                const isMaintenance = settings.maintenance_mode === true;
                const isExpired = settings.maintenance_until && new Date(settings.maintenance_until) < new Date();
                const is2faEnabled = settings.email_2fa_enabled === true;

                // Redirect public visitors to maintenance page only if active and NOT expired
                if (isMaintenance && !isExpired && isPublicRoute) {
                    console.debug('[Proxy] REDIRECTING', path, '-> /maintenance');
                    return NextResponse.redirect(new URL('/maintenance', request.url));
                }

                // Redirect away from maintenance page if OFF or EXPIRED
                if ((!isMaintenance || isExpired) && isMaintenancePage) {
                    return NextResponse.redirect(new URL('/', request.url));
                }

                // 2FA Enforcement for Dashboard
                if (isDashboard && is2faEnabled) {
                    const has2faCookie = request.cookies.get('admin_2fa_verified')?.value === 'true';
                    if (!has2faCookie) {
                        return NextResponse.redirect(new URL('/admin/login', request.url));
                    }
                }
            }
        } catch (e) {
            console.error("[Proxy] CRITICAL ERROR:", e.message);
        }
    }

    // 2. Handle Auth Session updates for protected routes
    if ((isDashboard || isAdmin) && !path.startsWith('/admin/login')) {
        return await updateSession(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
