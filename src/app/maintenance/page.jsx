'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, Hammer, Settings, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase-client';

const supabase = createClient();

export default function MaintenancePage() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [maintenanceUntil, setMaintenanceUntil] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data, error } = await supabase
                    .from('seo_settings')
                    .select('maintenance_until')
                    .eq('id', 1)
                    .single();

                if (data && data.maintenance_until) {
                    setMaintenanceUntil(new Date(data.maintenance_until));
                }
            } catch (err) {
                console.error("Error fetching maintenance settings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    useEffect(() => {
        if (!maintenanceUntil) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = maintenanceUntil.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                // Optionally redirect to home if maintenance is over
                // window.location.href = '/';
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [maintenanceUntil]);

    const CountdownItem = ({ label, value }) => (
        <div className="flex flex-col items-center">
            <div className="relative group">
                <div className="absolute inset-0 bg-[#bc9c33] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-2 shadow-2xl relative">
                    <span className="text-2xl md:text-4xl font-bold text-white tabular-nums">
                        {String(value).padStart(2, '0')}
                    </span>
                </div>
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{label}</span>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1b365d] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#bc9c33] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1b365d] flex flex-col items-center justify-center p-6 text-center overflow-hidden selection:bg-[#bc9c33]/30 selection:text-white">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-black/20 rounded-full blur-[160px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#bc9c33]/10 rounded-full blur-[140px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>

            <div className="relative z-10 max-w-4xl w-full">
                {/* Logo Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <img 
                        src="/logo-gesit.webp" 
                        alt="Gesit Companies" 
                        className="h-12 md:h-16 mx-auto brightness-0 invert opacity-90 drop-shadow-2xl"
                    />
                </motion.div>

                {/* Main Content Area */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-4"
                    >
                        <Settings className="w-4 h-4 text-[#bc9c33] animate-spin-slow" />
                        <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest">Systems Update in Progress</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                            We are <br className="md:hidden" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#bc9c33] to-white bg-[length:200%_auto] animate-shimmer">
                                Refining Excellence
                            </span>
                        </h1>
                        <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                            The Gesit Companies is performing a scheduled infrastructure upgrade to provide you with a superior digital experience. We will be back shortly with new enhancements.
                        </p>
                    </motion.div>

                    {/* Countdown Timer Section */}
                    {maintenanceUntil && timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex justify-center items-center gap-4 md:gap-8 pt-8"
                        >
                            <CountdownItem label="Days" value={timeLeft.days} />
                            <div className="text-2xl md:text-4xl font-bold text-slate-700 mt-[-20px] md:mt-[-30px]">:</div>
                            <CountdownItem label="Hours" value={timeLeft.hours} />
                            <div className="text-2xl md:text-4xl font-bold text-slate-700 mt-[-20px] md:mt-[-30px]">:</div>
                            <CountdownItem label="Minutes" value={timeLeft.minutes} />
                            <div className="text-2xl md:text-4xl font-bold text-slate-700 mt-[-20px] md:mt-[-30px]">:</div>
                            <CountdownItem label="Seconds" value={timeLeft.seconds} />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="pt-8"
                        >
                            <div className="inline-flex items-center gap-2 text-[#bc9c33] font-bold tracking-[0.2em] uppercase text-sm">
                                <Clock className="w-4 h-4" />
                                Estimating Restoration Time...
                            </div>
                        </motion.div>
                    )}

                    {/* Security & Status Badges */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-wrap items-center justify-center gap-8 pt-12"
                    >
                        <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <ShieldCheck className="w-5 h-5 text-[#bc9c33]" />
                            <div className="text-left">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-1">Security</p>
                                <p className="text-xs font-semibold text-white">Full Encryption</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <Clock className="w-5 h-5 text-[#bc9c33]" />
                            <div className="text-left">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-1">Schedule</p>
                                <p className="text-xs font-semibold text-white">Auto-Restore</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-24 pt-8 border-t border-white/5"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white font-medium">
                            &copy; 2024 The Gesit Companies. All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#bc9c33] rounded-full animate-pulse" />
                            <span className="text-[9px] uppercase tracking-widest text-slate-400">Global Infrastructure Status: Maintenance</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .animate-shimmer {
                    animation: shimmer 5s infinite linear;
                }
                .animate-spin-slow {
                    animation: spin 8s infinite linear;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
