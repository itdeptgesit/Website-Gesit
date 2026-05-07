'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0a1b39] flex items-center justify-center relative overflow-hidden font-sans">
            {/* Elegant Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#BC9C33] opacity-[0.03] blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-[#103065] opacity-[0.2] blur-[150px]"></div>
                
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" 
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>
            </div>

            <div className="relative z-10 px-8 text-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-[#BC9C33] font-bold uppercase tracking-[0.6em] text-[11px] mb-12 block"
                    >
                        Error Code 404
                    </motion.span>
                    
                    <h1 className="text-white font-serif text-[clamp(120px,20vw,200px)] leading-none mb-4 font-light">
                        404
                    </h1>
                    
                    <div className="w-16 h-[1px] bg-[#BC9C33]/40 mx-auto mb-12"></div>
                    
                    <h2 className="text-2xl md:text-3xl text-white font-serif mb-8 tracking-wide font-light">
                        The page you requested was not found.
                    </h2>
                    
                    <p className="text-slate-400 text-[15px] md:text-[16px] font-light leading-relaxed mb-16 max-w-md mx-auto">
                        It seems you've followed a broken link or entered a URL that doesn't exist on our servers.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/" className="pill-button-gold">
                            Back to Homepage
                        </Link>
                        <button 
                            onClick={() => window.history.back()}
                            className="text-slate-400 hover:text-white text-[13px] uppercase tracking-widest transition-colors duration-300 font-medium"
                        >
                            Go Back
                        </button>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                .pill-button-gold {
                    display: inline-flex;
                    align-items: center;
                    color: #fff;
                    background-color: #BC9C33;
                    border: 1.5px solid #BC9C33;
                    border-radius: 50px;
                    padding: 16px 42px;
                    font-family: var(--font-sans);
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 10px 30px rgba(188, 156, 51, 0.15);
                }
                .pill-button-gold:hover {
                    background-color: transparent;
                    color: #BC9C33;
                    transform: translateY(-3px);
                    box-shadow: 0 15px 35px rgba(188, 156, 51, 0.25);
                }
            `}</style>
        </div>
    );
}
