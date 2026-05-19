'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0b1629] flex items-center justify-center relative overflow-hidden font-sans">
            {/* Elegant Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gold Glow Top Right */}
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#bc9c33] opacity-[0.06] blur-[150px]"></div>
                {/* Deep Navy Glow Bottom Left */}
                <div className="absolute bottom-[-10%] left-[-20%] w-[800px] h-[800px] rounded-full bg-[#103065] opacity-[0.25] blur-[180px]"></div>
                
                {/* Elegant Geometric Thin Gold Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.02] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#bc9c33]/[0.03] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/[0.01] rounded-full"></div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.015]" 
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#bc9c33] animate-pulse"></span>
                        <span className="text-[#bc9c33] font-bold uppercase tracking-[0.25em] text-[10px]" style={{ fontFamily: 'var(--font-source-sans), sans-serif' }}>
                            ERROR CODE 404
                        </span>
                    </div>
                    
                    {/* Big beautiful 404 */}
                    <h1 className="text-white font-serif text-[clamp(110px,18vw,190px)] leading-none font-bold tracking-tight mb-4 select-none" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
                        404
                    </h1>
                    
                    {/* Thin gold decorative bar */}
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#bc9c33]/60 to-transparent mx-auto mb-10"></div>
                    
                    {/* Page Titles - Indonesian / English */}
                    <h2 className="text-2xl md:text-3xl text-white font-serif mb-3 tracking-wide font-medium" style={{ fontFamily: 'Lora, serif' }}>
                        Halaman Tidak Ditemukan
                    </h2>
                    <p className="text-[#bc9c33]/70 font-sans text-sm md:text-base uppercase tracking-[0.15em] font-semibold mb-6">
                        Page Not Found
                    </p>
                    
                    {/* Descriptive Text */}
                    <p className="text-slate-400 text-[15px] md:text-[16px] font-light leading-relaxed mb-12 max-w-lg mx-auto" style={{ fontFamily: 'var(--font-source-sans), sans-serif' }}>
                        Halaman yang Anda cari tidak tersedia, telah dihapus, atau dipindahkan. Silakan kembali ke Beranda untuk melanjutkan penelusuran.
                    </p>

                    {/* Pathways / Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link href="/" className="pill-button-gold flex items-center justify-center gap-2 w-full sm:w-auto">
                            <Home size={14} />
                            <span>Kembali ke Beranda</span>
                        </Link>
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center justify-center gap-2 text-slate-400 hover:text-white text-[12px] uppercase tracking-widest transition-all duration-300 font-bold border border-white/[0.08] hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.04] rounded-full px-8 py-4 w-full sm:w-auto"
                        >
                            <ArrowLeft size={14} />
                            <span>Kembali</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                .pill-button-gold {
                    display: inline-flex;
                    align-items: center;
                    color: #fff;
                    background-color: #bc9c33;
                    border: 1.5px solid #bc9c33;
                    border-radius: 50px;
                    padding: 16px 36px;
                    font-family: var(--font-source-sans), sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 10px 30px rgba(188, 156, 51, 0.15);
                }
                .pill-button-gold:hover {
                    background-color: transparent;
                    color: #bc9c33;
                    transform: translateY(-2px);
                    box-shadow: 0 15px 35px rgba(188, 156, 51, 0.25);
                }
            `}</style>
        </div>
    );
}
