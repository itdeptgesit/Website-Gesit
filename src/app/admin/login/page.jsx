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
                className="hidden lg:flex flex-col justify-between w-[45%] text-white px-24 py-12 relative overflow-hidden shrink-0"
                style={{
                    backgroundImage: 'url(/hero/property.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Overlay gradient - Deep Premium Navy */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c2044]/95 via-[#0a1b39]/90 to-[#050f21]/95 z-0"></div>
                
                {/* Interactive subtle light ray overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(188,156,51,0.06),_transparent_60%)] z-0 pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 w-full mt-4">
                    {/* Logo */}
                    <div className="mb-24">
                        <Image
                            src="/logo-gesit.webp"
                            alt="The Gesit Companies"
                            width={160}
                            height={48}
                            className="brightness-0 invert object-contain hover:opacity-95 transition-opacity"
                            priority
                        />
                    </div>

                    <div className="max-w-xl">
                        <h2 className="text-[44px] leading-tight font-serif tracking-normal text-white mb-2 font-normal">
                            Advancing Global<br />
                            <span className="text-[#BC9C33] font-bold">Business Excellence</span>
                        </h2>

                        <div className="w-16 h-[3px] bg-gradient-to-r from-[#BC9C33] to-[#ebd382] opacity-90 mb-8 mt-6 rounded-full"></div>

                        <p className="text-[15px] text-slate-300 leading-relaxed font-light mb-20 max-w-lg">
                            Welcome to the central administrative hub of The Gesit Companies. 
                            This secure platform provides authorized personnel with advanced 
                            tools to manage corporate assets and oversee global operations.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mt-8 border-t border-white/10 pt-10">
                            <div className="flex flex-col gap-4 items-center text-center group cursor-default">
                                <div className="w-12 h-12 rounded-full border border-[#BC9C33]/20 bg-white/5 flex items-center justify-center group-hover:border-[#BC9C33]/40 group-hover:bg-white/10 transition-all duration-300">
                                    <ShieldCheck className="w-5 h-5 text-[#BC9C33]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold mb-1.5 text-white">Fortified Security</h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed px-1">Protecting corporate intelligence with enterprise-grade protocols.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center text-center group cursor-default">
                                <div className="w-12 h-12 rounded-full border border-[#BC9C33]/20 bg-white/5 flex items-center justify-center group-hover:border-[#BC9C33]/40 group-hover:bg-white/10 transition-all duration-300">
                                    <BarChart3 className="w-5 h-5 text-[#BC9C33]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold mb-1.5 text-white">Operational Agility</h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed px-1">Optimizing workflows to drive organizational productivity.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center text-center group cursor-default">
                                <div className="w-12 h-12 rounded-full border border-[#BC9C33]/20 bg-white/5 flex items-center justify-center group-hover:border-[#BC9C33]/40 group-hover:bg-white/10 transition-all duration-300">
                                    <FileText className="w-5 h-5 text-[#BC9C33]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold mb-1.5 text-white">Strategic Insights</h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed px-1">Harnessing real-time data to inform high-level decisions.</p>
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
            <div className="w-full lg:w-[55%] flex items-center justify-center bg-[#f8fafc] relative overflow-hidden px-4 sm:px-6">
                
                {/* Background glow effects */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(188,156,51,0.06)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none z-0"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(16,48,101,0.04)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none z-0"></div>
                
                {/* Subtle dot pattern grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 z-0 pointer-events-none"></div>

                {/* Language Switcher */}
                <div className="absolute top-8 right-8 flex items-center gap-2 border px-4 py-2 rounded-lg text-[13px] text-slate-600 bg-white/80 backdrop-blur-sm shadow-sm border-slate-200/60 z-20 cursor-pointer hover:bg-slate-50 transition-colors font-medium">
                    <Globe size={15} className="text-[#BC9C33]" /> English <ChevronDown size={15} className="text-slate-400" />
                </div>

                <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(16,48,101,0.08)] border border-slate-100/80 p-8 md:p-12 relative z-10 overflow-hidden">
                    {/* Top Golden-Navy Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#103065] via-[#BC9C33] to-[#103065]"></div>

                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                            <Lock className="w-5 h-5 text-[#103065]" strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif text-[#103065] mb-3 font-normal">
                            Management Portal
                        </h1>
                        <p className="text-[13px] text-slate-500 font-sans leading-relaxed px-2">
                            Please provide your authorized credentials to<br />access the corporate management system.
                        </p>
                    </div>

                    {!mfaRequired ? (
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-4">
                                <div className="space-y-1.5 text-left">
                                    <Label htmlFor="email" className="text-[11px] font-bold text-[#103065] ml-1 uppercase tracking-wider">Email Address</Label>
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
                                            className="h-12 pl-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#bc9c33] focus-visible:border-[#bc9c33] transition-all rounded-[8px] text-[13px] shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <Label htmlFor="password" className="text-[11px] font-bold text-[#103065] ml-1 uppercase tracking-wider">Password</Label>
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
                                            className="h-12 pl-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#bc9c33] focus-visible:border-[#bc9c33] transition-all rounded-[8px] text-[13px] shadow-sm"
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
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input type="checkbox" className="w-[14px] h-[14px] rounded-[3px] border-slate-300 text-[#103065] focus:ring-[#103065]" />
                                    <span className="text-slate-600 hover:text-slate-800 transition-colors font-medium">Remember me</span>
                                </label>
                                <a href="#" className="text-[#3b82f6] hover:text-[#2563eb] transition-colors font-semibold">Forgot password?</a>
                            </div>

                            {error && (
                                <div className="text-[13px] font-medium text-red-600 bg-red-50 p-4 rounded-lg border border-red-100 flex items-start gap-3 mt-4 text-left">
                                    <div className="mt-0.5 shrink-0"><Lock className="w-3.5 h-3.5" /></div>
                                    <p>{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#103065] to-[#1c4587] hover:from-[#0c244b] hover:to-[#103065] text-white h-[48px] rounded-[8px] transition-all duration-300 shadow-[0_4px_14px_0_rgba(16,48,101,0.35)] hover:shadow-[0_6px_20px_rgba(16,48,101,0.25)] hover:-translate-y-[1px] active:translate-y-0 flex items-center justify-center gap-2 text-[14px] font-bold mt-8 border-0 cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />}
                                <span>Secure Sign In</span>
                                {!loading && <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2.5} />}
                            </button>

                            <div className="pt-6 mt-6 border-t border-slate-100/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#BC9C33]" />
                                <span>Your connection is secure and encrypted</span>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="p-4 bg-[#f8fafc] rounded-xl flex items-center gap-4 border border-slate-100 text-left">
                                <div className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100 shrink-0">
                                    <Mail className="w-5 h-5 text-[#103065]" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-[#103065]">Email Verification</p>
                                    <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Enter the 6-digit code sent to<br /><strong className="text-slate-700">{email}</strong></p>
                                </div>
                            </div>

                            <form onSubmit={handleVerifyMFA} className="space-y-5">
                                <div className="space-y-2 text-left">
                                    <Label className="text-[11px] font-bold text-[#103065] ml-1 uppercase tracking-wider">Verification Code</Label>
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
                                    <div className="text-[13px] text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 text-left">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-[#103065] hover:bg-[#0c244b] text-white h-[50px] rounded-xl text-sm font-semibold mt-2 shadow-[0_4px_14px_rgba(16,48,101,0.25)] border-0 cursor-pointer flex items-center justify-center"
                                    disabled={loading || mfaCode.length < 6}
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Complete Login
                                </button>

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

