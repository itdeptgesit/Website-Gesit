'use client';

import { motion } from "framer-motion";
import { ExternalLink, Mail, ShieldAlert, CheckCircle2, FileText, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CareerPage() {
    const textVariant = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const staggerContainer = {
        initial: {},
        whileInView: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-white min-h-screen text-[#103065] font-sans overflow-hidden relative">
            {/* 1. Hero Section - Unified Style */}
            <section className="gs-hero-section" style={{ position: "relative", width: "100%", overflow: "hidden", height: '100vh' }}>
                <motion.div
                    animate={{ scale: 1.15 }}
                    transition={{ duration: 15, ease: "easeOut" }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                >
                    <Image
                        src="/career/career_hero_revise.webp"
                        alt="Join Gesit Career"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </motion.div>
                <div className="gesit-hero-overlay" />

                <motion.h1
                    className="gs-hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                >
                    Career
                </motion.h1>
            </section>

            {/* 2. Intro Statement Section - Gold Style (RESTORED) */}
            <section className="bg-[#BC9C33] py-16 md:py-24 min-h-[300px] flex items-center">
                <div className="max-w-[1000px] mx-auto px-8 md:px-16 text-white w-full">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="text-left"
                    >
                        <motion.h2
                            variants={textVariant}
                            style={{
                                fontFamily: 'Lora, Georgia, serif',
                                fontWeight: 400,
                                fontSize: 'clamp(28px, 3.5vw, 48px)',
                                lineHeight: 1.3,
                                color: '#fff',
                                marginBottom: '25px',
                            }}
                        >
                            At Gesit, our employees are our largest asset.
                        </motion.h2>

                        <motion.div variants={textVariant} className="flex gap-8 items-stretch pt-2">
                            <div className="w-[1.5px] bg-white shrink-0"></div>
                            <p
                                className="text-white/95 text-lg md:text-[1.2rem] leading-[1.8] font-normal"
                                style={{ fontFamily: '"Source Sans Pro", sans-serif', fontWeight: 400 }}
                            >
                                We believe that we can reach our goal only through excellent performance and service to our customers provided by our valuable employees. We maintain and develop all employees through trainings, workshops, seminars, and mentoring programs, in order to bring the best standard for our company.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Main Announcement Section (RECRUITMENT) */}
            {/* 3. Main Announcement Section (RECRUITMENT - MATCHING MOCKUP) */}
            <section className="py-16 md:py-20 relative bg-white">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="400" cy="400" r="300" stroke="#103065" strokeWidth="1" />
                        <circle cx="400" cy="400" r="250" stroke="#BC9C33" strokeWidth="1" />
                    </svg>
                </div>
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="text-center space-y-6"
                    >
                        {/* Join Our Team Section */}
                        <div className="py-20 md:py-24">
                            <motion.div
                                variants={textVariant}
                                className="text-center max-w-3xl mx-auto"
                            >
                                <motion.span
                                    className="text-[#BC9C33] font-bold uppercase tracking-[.4em] text-[12px] mb-6 block"
                                >
                                    Career Opportunities
                                </motion.span>
                                
                                <motion.h2
                                    className="text-4xl md:text-5xl text-[#103065] leading-tight mb-8"
                                    style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 400 }}
                                >
                                    Join Our Team
                                </motion.h2>
                                
                                <div className="w-16 h-[2px] bg-[#BC9C33] mx-auto mb-8"></div>
                                
                                <motion.p
                                    className="text-lg md:text-[20px] leading-relaxed text-slate-500 mb-12"
                                    style={{ fontFamily: '"Source Sans Pro", sans-serif' }}
                                >
                                    Interested in growing with us?<br />
                                    Send your profile and introduction to our team.
                                </motion.p>
                                
                                <motion.div>
                                    <a
                                        href="mailto:contact@gesit.co.id"
                                        className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-transparent border border-[#103065] text-[#103065] rounded-full font-bold uppercase tracking-[.2em] text-[13px] hover:bg-[#103065] hover:text-white transition-all duration-300"
                                    >
                                        <Mail size={18} className="group-hover:scale-110 transition-transform duration-300" />
                                        contact@gesit.co.id
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
