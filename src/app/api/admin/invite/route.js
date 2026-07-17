import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function POST(req) {
    try {
        // Verify requester is authenticated and is SUPER_ADMIN
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if requester is SUPER_ADMIN
        const { data: profile } = await supabase
            .from('admin_profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (!profile || profile.role !== 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'Forbidden — SUPER_ADMIN only' }, { status: 403 });
        }

        const body = await req.json();
        const { email, role = 'CONTENT_EDITOR', department = '', accessible_menus = [] } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // Use Supabase Admin client (service_role) to invite user
        const adminSupabase = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            { auth: { autoRefreshToken: false, persistSession: false } }
        );

        const { data: inviteData, error: inviteError } = await adminSupabase.auth.admin.inviteUserByEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/login`,
            data: { role, department }
        });

        if (inviteError) {
            console.error('Invite error:', inviteError);
            // Handle "already registered" gracefully
            if (inviteError.message?.includes('already been registered')) {
                return NextResponse.json({ error: 'This email is already registered as an admin.' }, { status: 409 });
            }
            return NextResponse.json({ error: inviteError.message || 'Failed to send invitation' }, { status: 500 });
        }

        // Create admin_profiles record for the invited user
        if (inviteData?.user?.id) {
            await adminSupabase.from('admin_profiles').upsert({
                id: inviteData.user.id,
                email,
                role,
                department,
                accessible_menus: role === 'SUPER_ADMIN'
                    ? ['/dashboard/news', '/dashboard/contacts', '/dashboard/csr', '/dashboard/heroes', '/dashboard/settings']
                    : accessible_menus
            });
        }

        return NextResponse.json({ success: true, message: `Invitation sent to ${email}` });
    } catch (err) {
        console.error('Invite route error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
