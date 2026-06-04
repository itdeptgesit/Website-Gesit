import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req) {
    try {
        // Verify the user is actually authenticated before setting 2FA cookie
        const supabase = await createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized — you must be logged in.' },
                { status: 401 }
            )
        }

        const response = NextResponse.json({ success: true })
        response.cookies.set('admin_2fa_verified', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 // 24 hours
        })

        return response
    } catch (error) {
        return NextResponse.json({ error: 'Failed to set session' }, { status: 500 })
    }
}
