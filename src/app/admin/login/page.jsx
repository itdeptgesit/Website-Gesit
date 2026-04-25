'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Lock, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [mfaRequired, setMfaRequired] = useState(false)
    const [mfaCode, setMfaCode] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkAutoMFA = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session && !otpSent) {
                const { data: settings } = await supabase.from('seo_settings').select('email_2fa_enabled').eq('id', 1).single()
                const has2faCookie = document.cookie.includes('admin_2fa_verified=true')

                if (settings?.email_2fa_enabled && !has2faCookie) {
                    setMfaRequired(true)
                    setEmail(session.user.email)
                    setOtpSent(true)
                    // Trigger Native Supabase OTP
                    await supabase.auth.signInWithOtp({
                        email: session.user.email,
                        options: { shouldCreateUser: false }
                    })
                } else if (!settings?.email_2fa_enabled || has2faCookie) {
                    router.push('/dashboard/news')
                }
            }
        }
        checkAutoMFA()
    }, [supabase, router, otpSent])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            // Check if Email 2FA is enabled in global settings
            const { data: settings } = await supabase.from('seo_settings').select('email_2fa_enabled').eq('id', 1).single()

            if (settings?.email_2fa_enabled) {
                // Trigger Native Supabase OTP
                const { error: otpError } = await supabase.auth.signInWithOtp({
                    email,
                    options: { shouldCreateUser: false }
                })
                if (otpError) throw otpError

                setMfaRequired(true)
                setLoading(false)
                return
            }

            // No 2FA -> Proceed and set session cookie
            await fetch('/api/auth/session', { method: 'POST' })
            router.push('/dashboard/news')
            router.refresh()
        } catch (err) {
            setError(err.message || 'Invalid login credentials')
            setLoading(false)
        }
    }

    const handleVerifyMFA = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.verifyOtp({
                email,
                token: mfaCode,
                type: 'email'
            })
            if (error) throw error

            // Success -> Set 24 hour session cookie
            await fetch('/api/auth/session', { method: 'POST' })

            router.push('/dashboard/news')
            router.refresh()
        } catch (err) {
            setError(err.message || 'MFA Verification failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex w-full font-sans">
            {/* Left Panel - Brand Side (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#103065] text-white px-16 py-12 relative overflow-hidden">
                {/* Subtle Geometric Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 w-full max-w-sm">
                    <Image
                        src="/logo-gesit.png"
                        alt="The Gesit Companies"
                        width={200}
                        height={60}
                        className="brightness-0 invert mb-4"
                        priority
                    />
                </div>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-4xl md:text-5xl mb-6 text-[#BC9C33] leading-tight" style={{ fontFamily: 'Lora, serif', fontWeight: 400 }}>
                        Empowering Your Business Vision
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        Welcome to the internal management portal of The Gesit Companies.
                        Access administrative tools, manage content, and oversee operations securely.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="text-sm text-slate-400 font-light">&copy; {new Date().getFullYear()} The Gesit Companies. All rights reserved.</p>
                </div>
            </div>

            {/* Right Panel - Auth Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12 md:px-12 relative">
                {/* Mobile Logo (Visible only on small screens) */}
                <div className="absolute top-8 left-6 lg:hidden">
                    <Image
                        src="/logo-gesit.png"
                        alt="The Gesit Companies"
                        width={140}
                        height={40}
                        priority
                    />
                </div>

                <div className="w-full max-w-sm">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold tracking-tight text-[#103065] mb-2" style={{ fontFamily: 'Lora, serif', fontWeight: 400 }}>
                            Admin Login
                        </h1>
                        <p className="text-slate-500 font-sans">Enter your secure credentials to access the dashboard system.</p>
                    </div>

                    {!mfaRequired ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-600 font-semibold">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@gesit.co.id"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#bc9c33] transition-all px-4"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-slate-600 font-semibold">Password</Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-[#bc9c33] transition-all px-4"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm font-medium text-red-600 bg-red-50 p-4 rounded-lg flex items-start gap-3 border border-red-100">
                                    <div className="mt-0.5"><Lock className="w-4 h-4" /></div>
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-[#103065] hover:bg-[#0c244b] text-white h-14 rounded-lg transition-all duration-300 shadow-lg shadow-[#103065]/20 flex items-center justify-center space-x-2 text-base font-bold tracking-wide mt-4 relative overflow-hidden group"
                                disabled={loading}
                            >
                                {!loading && <span className="absolute inset-0 bg-[#bc9c33] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>}
                                <span className="relative z-10 flex items-center gap-2">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Secure Sign In'}
                                    {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </span>
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-4 border border-emerald-100">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Lock className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-emerald-800">Email Verification</p>
                                    <p className="text-[11px] text-emerald-600">Enter the 6-digit code sent to {email}</p>
                                </div>
                            </div>

                            <form onSubmit={handleVerifyMFA} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-600 font-semibold">Verification Code</Label>
                                    <Input
                                        required
                                        placeholder="000000"
                                        maxLength={6}
                                        value={mfaCode}
                                        onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                                        className="h-16 text-center text-2xl tracking-[0.5em] font-mono bg-slate-50 border-slate-200 focus:border-[#bc9c33] focus:ring-0"
                                        autoFocus
                                    />
                                </div>

                                {error && (
                                    <div className="text-xs text-red-600 bg-red-50 p-3 rounded border border-red-100">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-[#103065] hover:bg-[#0c244b] text-white h-14 rounded-lg font-bold"
                                    disabled={loading || mfaCode.length < 6}
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                                    Complete Login
                                </Button>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full text-slate-400 text-xs"
                                    onClick={() => setMfaRequired(false)}
                                >
                                    Back to Login
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
