'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

/* ── Animation Variants (Refined Editorial) ── */
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    },
    viewport: { once: true, margin: "-100px" }
};

const textVariant = {
    initial: { opacity: 0, y: 40 },
    whileInView: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    },
    viewport: { once: true }
};

const staggerContainer = {
    initial: {},
    whileInView: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const imageVariant = {
    initial: { opacity: 0, scale: 1.1, filter: 'blur(15px)' },
    whileInView: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
    },
    viewport: { once: true }
};

/* ── Content Assets ── */
const tradingGallery = [
    '/business/trading-services/trading_natural_1.webp',
    '/business/trading-services/trading_natural_2.webp',
];

const agencyGallery = [
    '/business/trading-services/agency-services-1-scaled.webp',
    '/business/trading-services/agency-services-2-scaled.webp',
    '/business/trading-services/agency-services-3.webp',
];

export default function TradingServicesPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const SLIDE_DURATION = 5000;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const circleBtn = {
        width: 60, height: 60, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.3s ease",
        color: "#fff",
    };

    return (
        <div className="trading-services-page-container">
            <div className="editorial-grain" />
            {/* ── 1. HERO SECTION ── */}
            <section className="gs-hero-section" style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                {/* Progress Bar */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: 4,
                    background: 'rgba(0,0,0,0.2)', zIndex: 40,
                }}>
                    <motion.div
                        key={activeIdx}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                        style={{ originX: 0, height: '100%', background: '#BC9C33' }}
                    />
                </div>

                {/* Fallback Hero Image (Server-side rendered for instant loading) */}
                {!isMounted && (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                        <Image
                            src="/hero/hero_image_trading_1-2.webp"
                            alt="Trading"
                            className="gs-hero-zoom-image"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                            fetchPriority="high"
                        />
                    </div>
                )}

                {isMounted && (
                    <Swiper
                        modules={[Autoplay, EffectFade, Navigation]}
                        effect="fade"
                        speed={1500}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        navigation={{ prevEl, nextEl }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevEl;
                            swiper.params.navigation.nextEl = nextEl;
                        }}
                        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
                        style={{ width: "100%", height: "100%" }}
                    >
                        {[
                            { url: "/hero/hero_image_trading_1-2.webp", alt: "Trading 1" },
                            { url: "/hero/hero_image_trading_2-2.webp", alt: "Trading 2" },
                            { url: "/hero/hero_image_trading_3-2.webp", alt: "Trading 3" }
                        ].map((slide, idx) => (
                            <SwiperSlide key={idx}>
                                <Image
                                    src={slide.url}
                                    alt={slide.alt}
                                    className="gs-hero-zoom-image"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    priority={idx === 0}
                                    {...(idx === 0 ? { fetchPriority: "high", loading: "eager" } : {})}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                <div className="gesit-hero-overlay" />

                {/* Title - Outside isMounted for instant display */}
                <motion.h1
                    className="gs-hero-title"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
                    Trading & Services
                </motion.h1>

                {/* Navigation arrows - Only show when mounted */}
                {isMounted && (
                    <div className="gs-hero-nav">
                        <button
                            ref={(node) => setPrevEl(node)}
                            style={circleBtn}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 5.9 9.092" style={{ transform: "rotate(180deg)" }}>
                                <path d="M5.9 4.546L1.354 9.092 0 7.738l3.192-3.192L0 1.354 1.354 0l3.125 3.125z" fill="currentColor" />
                            </svg>
                        </button>
                        <button
                            ref={(node) => setNextEl(node)}
                            style={circleBtn}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 5.9 9.092">
                                <path d="M5.9 4.546L1.354 9.092 0 7.738l3.192-3.192L0 1.354 1.354 0l3.125 3.125z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                )}
            </section>

            {/* ── 2. GOLD INTRO ── */}
            <section className="bg-[#BC9C33] gs-gold-intro-section">
                <div className="max-w-[824px] w-full mx-auto px-6 md:px-[70px] lg:px-0">
                    <motion.div
                        variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                        className="lg:pl-0"
                    >
                        <motion.div className="mb-5" variants={fadeInUp}>
                            <h3 className="text-[30px] md:text-[36px] lg:text-[36px] font-normal leading-snug md:leading-[50px]" style={{
                                color: '#fff',
                                fontFamily: 'Lora, serif',
                                margin: 0,
                                textAlign: 'left'
                            }}>
                                Leveraging local Indonesian expertise and broad international network to source and deliver high-quality products.
                            </h3>
                        </motion.div>

                        <motion.div style={{ paddingLeft: '24px', borderLeft: '2px solid rgba(255,255,255,0.7)' }} variants={fadeInUp}>
                            <p className="text-[16px] md:text-[24px] lg:text-[23px] leading-relaxed md:leading-normal" style={{
                                color: '#fff',
                                fontFamily: "var(--font-sans)",
                                fontWeight: 400,
                                margin: 0
                            }}>
                                The Gesit Companies have been trading commodities along the aluminum value chain and providing agency services used by banks and other consumers for over 30 years.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── 3. TRADING SECTION ── */}
            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                <div className="project-row image-right">
                    <div className="project-text-wrapper left">
                        <motion.div
                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                            className="project-text-content"
                        >
                            <motion.h2 variants={fadeInUp} className="project-title" style={{ margin: '0 0 35px' }}>Trading</motion.h2>
                            <motion.div variants={fadeInUp} className="project-desc">
                                <p>The Gesit Companies has been in this business for over 30 years. We source and deliver a&nbsp;variety of products including Bauxite, Alumina, Calcinated Petroleum Coke, Aluminum Ingots, to domestic and international markets — Indonesia, China, South America and the Middle East.</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                        className="project-image-container"
                    >
                        <Swiper
                            modules={[Autoplay, EffectFade]}
                            effect="fade"
                            speed={1500}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {tradingGallery.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image src={img} alt={`Trading ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </section>

            {/* ── 4. AGENCY SERVICES SECTION ── */}
            <section className="project-section" style={{ padding: '150px 0', backgroundColor: '#fff', overflow: 'hidden' }}>
                <div className="project-row image-left">
                    <motion.div
                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                        className="project-image-container"
                    >
                        <Swiper
                            modules={[Autoplay, EffectFade]}
                            effect="fade"
                            speed={1500}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {agencyGallery.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image src={img} alt={`Agency Services ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>

                    <div className="project-text-wrapper right">
                        <motion.div
                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                            className="project-text-content"
                        >
                            <motion.h2 variants={fadeInUp} className="project-title" style={{ margin: '0 0 35px' }}>Agency Services</motion.h2>
                            <motion.div variants={fadeInUp} className="project-desc">
                                <p>For over two decades, this division has provided its agency services to support the supply and distribution of products and technology used by banks and other consumers. Representative products include special currency paper and coins, high security technology to identify brand and documents, and disposal machines.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .trading-services-page-container {
                    position: relative;
                    background: #fff;
                }
                
                .editorial-grain {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.04;
                    background-image: url("https://grainy-gradients.vercel.app/noise.svg");
                }

                .project-row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 60px;
                    box-sizing: border-box;
                    gap: 100px;
                }
                .project-text-wrapper {
                    flex: 1;
                    display: flex;
                }
                .project-text-wrapper.left {
                    justify-content: flex-end;
                }
                .project-text-wrapper.right {
                    justify-content: flex-start;
                }
                .project-text-content {
                    max-width: 600px;
                    width: 100%;
                    box-sizing: border-box;
                }

                .project-image-container {
                    flex: 0 0 540px;
                    height: 680px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
                    border-radius: 4px;
                }

                .project-title {
                    font-family: Lora, Georgia, serif;
                    color: #000000;
                    font-size: clamp(32px, 5vw, 44px);
                    line-height: 1.25;
                    font-weight: 400;
                    margin: 0 0 35px;
                    letter-spacing: -0.01em;
                }
                .project-desc {
                    font-family: var(--font-sans);
                    font-size: 20px;
                    line-height: 1.8;
                    color: #000000;
                    margin-bottom: 45px;
                    text-align: justify;
                }
                .project-desc p {
                    margin-bottom: 25px;
                }

                @media (max-width: 1024px) {
                    .project-row {
                        flex-direction: column !important;
                        gap: 0 !important;
                        padding: 0 !important;
                        max-width: 100% !important;
                    }
                    .project-row.image-right {
                        flex-direction: column-reverse !important;
                    }
                    .project-image-container {
                        flex: 0 0 auto !important;
                        width: 100% !important;
                        height: auto !important;
                        aspect-ratio: 922 / 652 !important;
                        border-radius: 0 !important;
                    }
                    .project-section {
                        padding: 0 !important;
                    }
                    .project-text-wrapper {
                        width: 100% !important;
                        justify-content: center !important;
                        text-align: center !important;
                        padding: 50px 40px 80px 40px !important;
                    }
                    .project-text-content {
                        max-width: 100% !important;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .project-title {
                        font-size: 42px !important;
                        line-height: 50px !important;
                        margin-bottom: 25px !important;
                        text-align: center !important;
                    }
                    .project-desc {
                        font-size: 18px !important;
                        line-height: 1.6 !important;
                        text-align: justify !important;
                        hyphens: auto;
                    }
                }
            `}</style>
        </div>
    );
}
