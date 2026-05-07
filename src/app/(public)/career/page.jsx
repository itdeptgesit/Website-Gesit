'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    viewport: { once: true, margin: "-100px" }
};

const textVariant = {
    initial: { opacity: 0, y: 30 },
    whileInView: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    viewport: { once: true }
};

const staggerContainer = {
    initial: {},
    whileInView: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export default function CareerPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="bg-white min-h-screen text-[#103065] font-sans">
            {/* 1. HERO SECTION - Matching Manufacturing Cinematic Style */}
            <section className="gs-hero-section" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
                {/* Progress Bar (Simulated for single slide) */}

                <motion.div
                    className="gs-ken-burns"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                >
                    <Image
                        src="/career/career_hero_revise.webp"
                        alt="Gesit Career"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </motion.div>
                
                <div className="gesit-hero-overlay" />

                <motion.h1
                    className="gs-hero-title"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >
                    Career
                </motion.h1>
            </section>

            {/* 2. GOLD INTRO — Synchronized with Manufacturing layout ── */}
            <section className="flex justify-center bg-[#BC9C33] py-16 md:py-[60px] lg:py-[150px]">
                <div className="max-w-5xl w-full mx-auto px-6 md:px-[40px] lg:px-12">
                    <motion.div
                        variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                        className="lg:pl-20"
                    >
                        {/* Heading */}
                        <motion.div className="mb-5" variants={fadeInUp}>
                            <h2 className="text-[30px] md:text-[36px] lg:text-[36px] font-normal leading-snug md:leading-[50px]" style={{
                                color: '#fff',
                                fontFamily: 'var(--font-serif)',
                                margin: 0,
                                textAlign: 'left'
                            }}>
                                At Gesit, our employees are our largest asset.
                            </h2>
                        </motion.div>

                        {/* Description */}
                        <motion.div style={{ paddingLeft: '24px', borderLeft: '2px solid rgba(255,255,255,0.7)' }} variants={fadeInUp}>
                            <p className="text-[16px] md:text-[24px] lg:text-[23px] leading-relaxed md:leading-normal" style={{
                                color: '#fff',
                                fontFamily: "var(--font-sans)",
                                fontWeight: 400,
                                margin: 0
                            }}>
                                We believe that we can reach our goal only through excellent performance and service to our customers provided by our valuable employees. We maintain and develop all employees through trainings, workshops, seminars, and mentoring programs, in order to bring the best standard for our company.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. RECRUITMENT SECTION — Premium Minimalist ── */}
            <section className="py-24 md:py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Side */}
                        <motion.div
                            variants={fadeInUp}
                            className="relative aspect-[4/3] rounded-[5px] overflow-hidden shadow-[0_30px_60px_rgba(16,48,101,0.1)] group"
                        >
                            <Image
                                src="/career/career_contact_form.webp"
                                alt="Join Our Team"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
                            />
                            <div className="absolute inset-0 bg-navy-deep/5 group-hover:bg-transparent transition-colors duration-700" />
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <div>
                                <motion.span
                                    variants={textVariant}
                                    className="text-[#BC9C33] font-black uppercase tracking-[.4em] text-[12px] mb-6 block"
                                >
                                    Career Opportunities
                                </motion.span>
                                
                                <motion.h2
                                    variants={textVariant}
                                    className="text-4xl md:text-5xl text-navy-deep leading-tight mb-8"
                                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                                >
                                    Join Our Team
                                </motion.h2>
                                
                                <motion.div variants={textVariant} className="w-16 h-[2px] bg-[#BC9C33]"></motion.div>
                            </div>
                            
                            <motion.p
                                variants={textVariant}
                                className="text-lg md:text-[20px] leading-relaxed text-slate-500 max-w-lg"
                                style={{ fontFamily: 'var(--font-sans)' }}
                            >
                                Interested in growing with us? <br />
                                Send your profile and introduction to our recruitment team via email.
                            </motion.p>
                            
                            <motion.div variants={textVariant} className="pt-4">
                                <a
                                    href="mailto:contact@gesit.co.id"
                                    className="group inline-flex items-center gap-4 text-navy-deep font-bold uppercase tracking-[.2em] text-[13px]"
                                >
                                    <div className="w-14 h-14 rounded-full border border-navy-deep/20 flex items-center justify-center group-hover:bg-navy-deep group-hover:text-white transition-all duration-500">
                                        <Mail size={20} />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Send Email To</span>
                                        <span className="text-[17px] font-bold text-navy-deep group-hover:text-[#BC9C33] transition-colors lowercase tracking-wide">contact@gesit.co.id</span>
                                    </div>
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .gs-ken-burns {
                    animation: gsKenBurns 30s ease-in-out infinite alternate;
                }
                @keyframes gsKenBurns {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
}

