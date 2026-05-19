'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#103065] flex items-center justify-center relative overflow-hidden font-sans">
            {/* Elegant Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Subtle Gold Glow Top Right */}
                <div className="absolute top-[-20%] right-[-10%] w-[650px] h-[650px] rounded-full bg-[#bc9b39] opacity-[0.08] blur-[150px]"></div>
                {/* Elegant Deep Contrast shadow bottom left */}
                <div className="absolute bottom-[-10%] left-[-20%] w-[850px] h-[850px] rounded-full bg-[#0a1b39] opacity-[0.55] blur-[180px]"></div>
                
                {/* Elegant Geometric Thin Gold Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.03] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#bc9b39]/[0.05] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/[0.015] rounded-full"></div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" 
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
                </div>
            </div>

            <div className="relative z-10 px-6 py-12 text-center max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Upper gold badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#bc9b39]"></span>
                        <span className="text-[#bc9b39] font-bold uppercase tracking-[0.25em] text-[10px]" style={{ fontFamily: 'var(--font-source-sans), sans-serif' }}>
                            ERROR CODE 404
                        </span>
                    </div>
                    
                    {/* Big beautiful 404 */}
                    <h1 className="text-white font-serif text-[clamp(110px,18vw,190px)] leading-none font-bold tracking-tight mb-4 select-none" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
                        404
                    </h1>
                    
                    {/* Thin gold decorative bar */}
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#bc9b39]/60 to-transparent mx-auto mb-10"></div>
                    
                    {/* Page Title - English */}
                    <h2 className="text-2xl md:text-4xl text-white font-serif mb-6 tracking-wide font-medium" style={{ fontFamily: 'Lora, serif' }}>
                        Page Not Found
                    </h2>
                    
                    {/* Descriptive Text - English */}
                    <p className="text-slate-200/80 text-[15px] md:text-[16px] font-light leading-relaxed mb-12 max-w-md mx-auto" style={{ fontFamily: 'var(--font-source-sans), sans-serif' }}>
                        The page you are looking for does not exist, has been removed, or its name has changed. Please return to the homepage to continue.
                    </p>

                    {/* Pathways / Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link href="/" className="pill-button-gold flex items-center justify-center gap-2 w-full sm:w-auto">
                            <Home size={14} />
                            <span>Back to Homepage</span>
                        </Link>
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center justify-center gap-2 text-slate-200 hover:text-white text-[12px] uppercase tracking-widest transition-all duration-300 font-bold border border-white/[0.1] hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.06] rounded-full px-8 py-4 w-full sm:w-auto"
                        >
                            <ArrowLeft size={14} />
                            <span>Go Back</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                .pill-button-gold {
                    display: inline-flex;
                    align-items: center;
                    color: #fff;
                    background-color: #bc9b39;
                    border: 1.5px solid #bc9b39;
                    border-radius: 50px;
                    padding: 16px 36px;
                    font-family: var(--font-source-sans), sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 10px 30px rgba(188, 155, 57, 0.15);
                }
                .pill-button-gold:hover {
                    background-color: transparent;
                    color: #bc9b39;
                    transform: translateY(-2px);
                    box-shadow: 0 15px 35px rgba(188, 155, 57, 0.25);
                }
            `}</style>
        </div>
    );
}
