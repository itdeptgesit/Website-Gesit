'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

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
            {/* 1. HERO SECTION */}
            <section className="gs-hero-section" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>

                {!isMounted && (
                    <div className="gs-ken-burns" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}>
                        <Image
                            src="/career/hero1.png"
                            alt="Gesit Career"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                            fetchPriority="high"
                            loading="eager"
                        />
                    </div>
                )}

                {isMounted && (
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        speed={1500}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
                    >
                        {[
                            { url: "/career/hero1.png", alt: "Career 1" },
                            { url: "/career/hero2.png", alt: "Career 2" },
                            { url: "/career/hero3.png", alt: "Career 3" }
                        ].map((slide, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="gs-ken-burns" style={{ position: "relative", width: "100%", height: "100%" }}>
                                    <Image
                                        src={slide.url}
                                        alt={slide.alt}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        priority={idx === 0}
                                        {...(idx === 0 ? { fetchPriority: "high", loading: "eager" } : {})}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                <div className="gesit-hero-overlay" style={{ zIndex: 2 }} />

                <motion.h1
                    className="gs-hero-title"
                    style={{ zIndex: 3 }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >
                    Career
                </motion.h1>
            </section>

            {/* 2. GOLD INTRO — Synchronized with Manufacturing layout ── */}
            <section className="flex justify-center items-center bg-[#BC9C33] py-16 md:py-0 md:h-[412px] lg:h-auto lg:py-[150px]">
                <div className="w-full mx-auto px-6 md:max-w-[922px] md:px-[77px] lg:max-w-5xl lg:px-12">
                    <motion.div
                        variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                        className="lg:pl-20"
                    >
                        {/* Heading */}
                        <motion.div className="mb-5" variants={fadeInUp}>
                            <h2 className="text-[22px] md:text-[36px] lg:text-[36px] font-normal leading-snug md:leading-[50px]" style={{
                                color: '#fff',
                                fontFamily: 'var(--font-serif)',
                                margin: 0,
                                textAlign: 'left'
                            }}>
                                At Gesit, our employees are our largest asset.
                            </h2>
                        </motion.div>

                        {/* Description */}
                        <motion.div className="pl-[24px] md:pl-[40px]" style={{ borderLeft: '2px solid rgba(255,255,255,0.7)' }} variants={fadeInUp}>
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
            <section className="py-24 md:py-32 bg-slate-50 overflow-hidden relative">
                {/* Subtle Background Decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#103065]/5 -skew-x-12 transform origin-top-right"></div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Image Side with Premium Decorative Border */}
                        <motion.div
                            variants={fadeInUp}
                            className="relative order-1 lg:order-2 px-4 md:px-8"
                        >
                            {/* Decorative background blocks */}
                            <div className="absolute inset-0 bg-[#BC9C33]/20 rounded-xl transform rotate-3 transition-transform duration-500 hover:rotate-6"></div>
                            <div className="absolute inset-0 bg-[#103065]/10 rounded-xl transform -rotate-3 transition-transform duration-500 hover:-rotate-6"></div>

                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(16,48,101,0.2)] group">
                                <Image
                                    src="/career/IMG_2053.jpg"
                                    alt="Join Our Team"
                                    fill
                                    className="object-cover object-top scale-125 group-hover:scale-[1.35] transition-transform duration-[3000ms] ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#103065]/40 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="space-y-8 order-2 lg:order-1"
                        >
                            <div>
                                <motion.span
                                    variants={textVariant}
                                    className="text-[#BC9C33] font-bold uppercase tracking-[.4em] text-[12px] mb-4 block"
                                >
                                    Career Opportunities
                                </motion.span>

                                <motion.h2
                                    variants={textVariant}
                                    className="text-[32px] md:text-5xl text-[#103065] leading-tight mb-6"
                                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                                >
                                    Join Our Team
                                </motion.h2>

                                <motion.div variants={textVariant} className="w-20 h-[2px] bg-[#BC9C33]"></motion.div>
                            </div>

                            <motion.p
                                variants={textVariant}
                                className="text-[16px] md:text-[20px] leading-relaxed text-slate-600 max-w-lg"
                                style={{ fontFamily: 'var(--font-sans)' }}
                            >
                                Interested in growing with us? <br />
                                Send your profile and introduction to our recruitment team via email.
                            </motion.p>

                            <motion.div variants={textVariant} className="pt-4">
                                <a
                                    href="mailto:contact@gesit.co.id"
                                    className="group inline-flex items-center gap-4 text-[#103065] font-bold uppercase tracking-[.2em] text-[13px]"
                                >
                                    <div className="w-14 h-14 rounded-full border border-[#103065]/20 flex items-center justify-center group-hover:bg-[#103065] group-hover:text-white transition-all duration-500">
                                        <Mail size={20} />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Send Email To</span>
                                        <span className="text-[17px] font-bold text-[#103065] group-hover:text-[#BC9C33] transition-colors lowercase tracking-wide">contact@gesit.co.id</span>
                                    </div>
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .gs-ken-burns {
                    transform: scale(1);
                    will-change: transform;
                }
                .swiper-slide-active .gs-ken-burns,
                .gs-hero-section > .gs-ken-burns {
                    animation: gsKenBurns 8s linear forwards;
                }
                @keyframes gsKenBurns {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
}

