import { NextResponse } from 'next/server';
import { updateSession } from "@/lib/supabase-middleware";
import { createServerClient } from "@supabase/ssr";

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

            const { data: settings, error: settingsError } = await supabase
                .from('seo_settings')
                .select('maintenance_mode, maintenance_until, email_2fa_enabled')
                .eq('id', 1)
                .single();

            // DEBUG LOG
            console.log('[Proxy]', path, '| maintenance:', settings?.maintenance_mode, '| until:', settings?.maintenance_until);

            if (settings) {
                const isMaintenance = settings.maintenance_mode === true;
                const isExpired = settings.maintenance_until && new Date(settings.maintenance_until) < new Date();
                const is2faEnabled = settings.email_2fa_enabled === true;

                // Redirect public visitors to maintenance page only if active and NOT expired
                if (isMaintenance && !isExpired && isPublicRoute) {
                    console.log('[Proxy] REDIRECTING', path, '-> /maintenance');
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
