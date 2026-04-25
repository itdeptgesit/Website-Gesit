import { NextResponse } from 'next/server';
import { updateSession } from "@/lib/supabase-middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
    const path = request.nextUrl.pathname;

    // 1. Check Maintenance & 2FA Settings
    try {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    getAll() { return request.cookies.getAll(); },
                    setAll() { /* Read only */ },
                },
            }
        );

        const { data: settings } = await supabase.from('seo_settings').select('maintenance_mode, email_2fa_enabled').eq('id', 1).single();

        const isMaintenance = settings?.maintenance_mode === true;
        const is2faEnabled = settings?.email_2fa_enabled === true;

        const isDashboard = path.startsWith('/dashboard');
        const isPublicRoute = !path.startsWith('/admin') && !path.startsWith('/dashboard') && !path.startsWith('/api') && path !== '/maintenance';

        // Maintenance Mode Redirection
        if (isMaintenance && isPublicRoute) {
            return NextResponse.redirect(new URL('/maintenance', request.url));
        }

        // Email 2FA Enforcement
        const has2faCookie = request.cookies.get('admin_2fa_verified')?.value === 'true';
        if (isDashboard && is2faEnabled && !has2faCookie) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // If maintenance is OFF, don't allow access to the maintenance page
        if (!isMaintenance && path === '/maintenance') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } catch (e) {
        console.error("Middleware Safety Checks Failed:", e);
    }

    // 2. Handle Auth Session updates ONLY for protected routes
    if (path.startsWith('/dashboard') || path.startsWith('/admin')) {
        return await updateSession(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - any file with common image extensions
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
