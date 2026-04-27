'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Lock, ArrowRight, Mail, Eye, EyeOff, ShieldCheck, ChevronDown, Globe, FileText, BarChart3, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
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
            <div
                className="hidden lg:flex flex-col justify-between w-[45%] text-white px-16 py-12 relative overflow-hidden"
                style={{
                    backgroundImage: 'url(/hero/property.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Overlay gradient - Deep Navy */}
                <div className="absolute inset-0 bg-[#06142e]/85 z-0"></div>

                {/* Content */}
                <div className="relative z-10 w-full mt-4">
                    {/* Logo */}
                    <div className="mb-24">
                        <Image
                            src="/logo-gesit.png"
                            alt="The Gesit Companies"
                            width={160}
                            height={48}
                            className="brightness-0 invert object-contain"
                            priority
                        />
                    </div>

                    <div className="max-w-md">
                        <h2 className="text-[44px] leading-tight font-serif tracking-normal text-white mb-2">
                            Empowering Your<br />
                            <span className="text-[#BC9C33]">Business Vision</span>
                        </h2>

                        <div className="w-12 h-[2px] bg-[#BC9C33] opacity-80 mb-8 mt-6"></div>

                        <p className="text-[15px] text-slate-300 leading-relaxed font-light mb-20 pr-4">
                            Welcome to the internal management portal.
                            Access administrative tools, manage content,
                            and oversee operations securely and efficiently.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mt-8">
                            <div className="flex flex-col gap-4 items-center text-center">
                                <div className="w-12 h-12 rounded-full border border-[#BC9C33]/30 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-[#BC9C33]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold mb-2 text-white">Secure Access</h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed px-1">Enterprise-grade security<br />to protect your data.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center text-center">
                                <div className="w-12 h-12 rounded-full border border-[#BC9C33]/30 flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-[#BC9C33]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold mb-2 text-white">Operational Efficiency</h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed px-1">Streamline workflows<br />and improve productivity.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center text-center">
                                <div className="w-12 h-12 rounded-full border border-[#BC9C33]/30 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-[#BC9C33]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold mb-2 text-white">Data-Driven Decisions</h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed px-1">Access insights and reports<br />in real time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400 font-light mt-12 mb-4">
                    <ShieldCheck className="w-4 h-4 text-[#BC9C33]" />
                    <p>&copy; {new Date().getFullYear()} The Gesit Companies. All rights reserved.</p>
                </div>
            </div>

            {/* Right Panel - Auth Side */}
            <div className="w-full lg:w-[55%] flex items-center justify-center bg-[#fafafa] relative overflow-hidden">

                {/* Language Switcher */}
                <div className="absolute top-8 right-8 flex items-center gap-2 border px-4 py-2 rounded-lg text-[13px] text-slate-600 bg-white shadow-sm border-slate-200 z-20 cursor-pointer hover:bg-slate-50 transition-colors font-medium">
                    <Globe size={15} className="text-slate-400" /> English <ChevronDown size={15} className="text-slate-400" />
                </div>

                <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 md:px-12 md:py-12 relative z-10 mx-6">
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-[#f8fafc] border border-slate-100 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-[#1a365d]" strokeWidth={2} />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif text-[#1a365d] mb-4">
                            Admin Login
                        </h1>
                        <p className="text-[13px] text-slate-500 font-sans px-2">Enter your secure credentials to<br />access the dashboard system.</p>
                    </div>

                    {!mfaRequired ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-5">
                                <div className="space-y-2 text-left">
                                    <Label htmlFor="email" className="text-[12px] font-bold text-[#1a365d] ml-1">Email Address</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-[18px] w-[18px] text-slate-400" strokeWidth={1.5} />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="admin@gesit.co.id"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 pl-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#bc9c33] transition-all rounded-[8px] text-[13px] shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 text-left">
                                    <Label htmlFor="password" className="text-[12px] font-bold text-[#1a365d] ml-1">Password</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-[18px] w-[18px] text-slate-400" strokeWidth={1.5} />
                                        </div>
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-12 pl-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#bc9c33] transition-all rounded-[8px] text-[13px] shadow-sm"
                                        />
                                        <div
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors" /> : <Eye className="h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors" />}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-[12px] mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-[14px] h-[14px] rounded-[3px] border-slate-300 text-[#1a365d] focus:ring-[#1a365d]" />
                                    <span className="text-slate-600 hover:text-slate-800 transition-colors">Remember me</span>
                                </label>
                                <a href="#" className="text-[#3b82f6] hover:text-[#2563eb] transition-colors">Forgot password?</a>
                            </div>

                            {error && (
                                <div className="text-[13px] font-medium text-red-600 bg-red-50 p-4 rounded-lg border border-red-100 flex items-start gap-3 mt-4">
                                    <div className="mt-0.5"><Lock className="w-3.5 h-3.5" /></div>
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-[#0a1936] hover:bg-[#071328] text-white h-[48px] rounded-[8px] transition-all duration-300 shadow-[0_4px_14px_0_rgba(10,25,54,0.39)] hover:shadow-[0_6px_20px_rgba(10,25,54,0.23)] hover:-translate-y-[1px] flex items-center justify-center gap-2 text-[14px] font-medium mt-8"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" strokeWidth={2} />}
                                <span>Secure Sign In</span>
                                {!loading && <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />}
                            </Button>

                            <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Your connection is secure and encrypted</span>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="p-4 bg-[#f8fafc] rounded-xl flex items-center gap-4 border border-slate-100">
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                    <Mail className="w-5 h-5 text-[#103065]" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-[#103065]">Email Verification</p>
                                    <p className="text-[11px] text-slate-500">Enter the 6-digit code sent to<br />{email}</p>
                                </div>
                            </div>

                            <form onSubmit={handleVerifyMFA} className="space-y-5">
                                <div className="space-y-2">
                                    <Label className="text-[13px] font-bold text-[#103065] ml-1">Verification Code</Label>
                                    <Input
                                        required
                                        placeholder="0 0 0 0 0 0"
                                        maxLength={8}
                                        value={mfaCode}
                                        onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                                        className="h-14 text-center text-xl tracking-[0.5em] font-mono bg-[#f8fafc] border-slate-200 focus:border-[#bc9c33] focus:ring-0 rounded-xl"
                                        autoFocus
                                    />
                                </div>

                                {error && (
                                    <div className="text-[13px] text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 mt-2">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-[#103065] hover:bg-[#0c244b] text-white h-[50px] rounded-xl text-sm font-semibold mt-2"
                                    disabled={loading || mfaCode.length < 6}
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Complete Login
                                </Button>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full text-slate-500 text-xs mt-2 hover:bg-slate-50"
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
