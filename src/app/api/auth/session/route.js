import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const cookieStore = await cookies()

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

