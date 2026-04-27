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
                        src="/wp-content/uploads/2021/12/career_hero_revise.jpg"
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
                        {/* Header Part */}
                        <div>
                            <motion.span
                                variants={textVariant}
                                className="text-[#BC9C33] font-bold uppercase tracking-[.4em] text-[11px] mb-2 block"
                            >
                                Join Our Excellence
                            </motion.span>
                            <motion.h2
                                variants={textVariant}
                                className="text-4xl md:text-5xl text-[#103065] leading-tight mb-4"
                                style={{ fontFamily: 'Lora, serif', fontWeight: 400 }}
                            >
                                We Grow Together
                            </motion.h2>
                            <motion.p
                                variants={textVariant}
                                className="text-lg leading-relaxed text-slate-500 max-w-3xl mx-auto"
                                style={{ fontFamily: '"Source Sans Pro", sans-serif' }}
                            >
                                With a vision to become a leading Holding company in Indonesia, we are seeking high-potential candidates to join as part of The Gesit Companies.
                            </motion.p>
                        </div>

                        <motion.p
                            variants={textVariant}
                            className="text-slate-500 font-medium pt-4"
                        >
                            Find and apply for our latest openings on:
                        </motion.p>

                        {/* Redirection Cards */}
                        <motion.div
                            variants={textVariant}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 pb-12"
                        >
                            {/* LinkedIn Card */}
                            <a
                                href="https://www.linkedin.com/company/the-gesit-companies/jobs/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                            >
                                <div className="p-12 flex flex-col items-center justify-center flex-grow space-y-6">
                                    <div className="relative w-48 h-12 flex items-center justify-center">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/LinkedIn_logo.svg/3840px-LinkedIn_logo.svg.png"
                                            alt="LinkedIn"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#0077b5] transition-colors">
                                        <span className="text-[12px] font-bold uppercase tracking-widest">View our opportunities on LinkedIn</span>
                                        <ExternalLink size={16} />
                                    </div>
                                </div>
                                <div className="h-[5px] bg-[#0077b5]" />
                            </a>

                            {/* Jobstreet Card */}
                            <a
                                href="https://www.jobstreet.co.id/en/job-search/the-gesit-companies-jobs/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                            >
                                <div className="p-12 flex flex-col items-center justify-center flex-grow space-y-6">
                                    <div className="relative w-48 h-12 flex items-center justify-center">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/JOBSTREET_small_scale.png"
                                            alt="Jobstreet"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#e60278] transition-colors">
                                        <span className="text-[12px] font-bold uppercase tracking-widest">View our opportunities on Jobstreet</span>
                                        <ExternalLink size={16} />
                                    </div>
                                </div>
                                <div className="h-[5px] bg-[#e60278]" />
                            </a>
                        </motion.div>

                        {/* Disclaimer Section - Matching Mockup */}
                        <div className="pt-8 border-t border-slate-100 max-w-3xl mx-auto">
                            <motion.span
                                variants={textVariant}
                                className="text-[#BC9C33] font-bold uppercase tracking-[.4em] text-[11px] mb-2 block"
                            >
                                Important Information
                            </motion.span>
                            <motion.h3
                                variants={textVariant}
                                className="text-4xl text-[#103065] mb-6"
                                style={{ fontFamily: 'Lora, serif', fontWeight: 400 }}
                            >
                                Please Note
                            </motion.h3>

                            <div className="space-y-0 text-left">
                                {[
                                    {
                                        icon: <ShieldAlert className="text-[#BC9C33]" size={28} />,
                                        text: "Job openings advertised on other channels may not be official openings. Please be wary of openings posted by unknown parties without our approval or acknowledgement."
                                    },
                                    {
                                        icon: <div className="flex items-center justify-center w-7 h-7 border-2 border-[#BC9C33] rounded-full text-[#BC9C33] font-bold text-lg">$</div>,
                                        text: "No fees will be charged for job applications, selection, and recruitment. Please be wary of anyone claiming to be an agent or representative of The Gesit Companies."
                                    },
                                    {
                                        icon: <Mail className="text-[#BC9C33]" size={28} />,
                                        header: "Further information:",
                                        link: "recruitment@gesit.co.id",
                                        linkHref: "mailto:recruitment@gesit.co.id"
                                    },
                                    {
                                        icon: <FileText className="text-[#BC9C33]" size={28} />,
                                        text: "Due to the large number of job applications we receive, we regret to inform you that only applications that pass the initial selection will be processed further."
                                    }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={textVariant}
                                        className={`flex items-center gap-6 py-3 ${idx !== 3 ? 'border-b border-slate-100' : ''}`}
                                    >
                                        <div className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center shrink-0 bg-white shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-1">
                                            {item.header && <motion.p variants={textVariant} className="text-[14px] text-slate-400 font-medium">{item.header}</motion.p>}
                                            {item.text && <motion.p variants={textVariant} className="text-[17px] leading-relaxed text-slate-500 font-sans">{item.text}</motion.p>}
                                            {item.link && (
                                                <motion.a variants={textVariant} href={item.linkHref} className="text-2xl font-bold text-[#103065] hover:text-[#BC9C33] transition-colors block">
                                                    {item.link}
                                                </motion.a>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
