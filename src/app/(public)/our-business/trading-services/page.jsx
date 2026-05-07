'use client';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const textVariant = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
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
    initial: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
    whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
};
const heroSlides = [
    { image: '/wp-content/uploads/2021/09/hero_image_trading_1-2.png' },
    { image: '/wp-content/uploads/2021/09/hero_image_trading_2-2.png' },
    { image: '/wp-content/uploads/2021/09/hero_image_trading_3-2.png' },
];

/* ── Content gallery images ── */
const tradingGallery = [
    '/wp-content/uploads/2021/09/trading_natural_1.png',
    '/wp-content/uploads/2021/09/trading_natural_2.png',
];

const agencyGallery = [
    '/wp-content/uploads/2021/11/agency-services-1-scaled.jpeg',
    '/wp-content/uploads/2021/11/agency-services-2-scaled.jpeg',
    '/wp-content/uploads/2021/11/agency-services-3.jpeg',
];

export default function TradingServicesPage() {
    const [activeTrading, setActiveTrading] = useState(0);
    const [activeAgency, setActiveAgency] = useState(0);

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

    /* content carousels */
    useEffect(() => {
        const t1 = setInterval(() => setActiveTrading(p => (p + 1) % tradingGallery.length), 3000);
        const t2 = setInterval(() => setActiveAgency(p => (p + 1) % agencyGallery.length), 3000);
        return () => { clearInterval(t1); clearInterval(t2); };
    }, []);

    return (
        <>
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
                {isMounted && (
                    <>
                        <Swiper
                            modules={[Autoplay, EffectFade, Navigation]}
                            effect="fade"
                            speed={1500}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            loop={true}
                            navigation={{
                                prevEl,
                                nextEl,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevEl;
                                swiper.params.navigation.nextEl = nextEl;
                            }}
                            onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
                            style={{ width: "100%", height: "100%" }}
                        >
                            {[
                                { url: "/wp-content/uploads/2021/09/hero_image_trading_1-2.png", alt: "Trading 1" },
                                { url: "/wp-content/uploads/2021/09/hero_image_trading_2-2.png", alt: "Trading 2" },
                                { url: "/wp-content/uploads/2021/09/hero_image_trading_3-2.png", alt: "Trading 3" }
                            ].map((slide, idx) => (
                                <SwiperSlide key={idx} style={{ position: "relative" }}>

                                    <Image src={slide.url} alt={slide.alt} fill style={{ objectFit: "cover" }} priority={idx === 0} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="gesit-hero-overlay" />


                        {/* Title */}
                        <motion.div
                            className="gs-hero-title"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
                            Trading & Services
                        </motion.div>

                        {/* Navigation arrows */}
                        <div className="gs-hero-nav">
                            <button
                                ref={(node) => setPrevEl(node)}
                                className="gs-prev-trading-services"
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
                                className="gs-next-trading-services"
                                style={circleBtn}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 5.9 9.092">
                                    <path d="M5.9 4.546L1.354 9.092 0 7.738l3.192-3.192L0 1.354 1.354 0l3.125 3.125z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </section>

            {/* ══ CONTENT BELOW HERO ══ */}
            <main id="qodef-page-content" className="qodef-grid qodef-layout--template">
                <link rel="stylesheet" href="/trading-services.css" media="all" />
                <div className="qodef-grid-inner clear">
                    <div className="qodef-grid-item qodef-page-content-section qodef-col--12">
                        <div data-elementor-type="wp-page" data-elementor-id="5153" className="elementor elementor-5153">

                            {/* SECTION 2: GOLD INTRO — Synchronized with Property page */}
                            <section className="elementor-element-fabe996" style={{ backgroundColor: '#BC9C33', padding: '150px 0' }}>
                                <div className="elementor-container gs-overview-container">
                                    <motion.div
                                        variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                                        className="elementor-column elementor-col-100"
                                    >
                                        <div className="elementor-widget-wrap elementor-element-populated">
                                            <motion.h3 variants={textVariant} className="gs-overview-heading" style={{ color: '#fff', fontFamily: 'Lora, Georgia, serif', fontWeight: 400, marginBottom: '15px' }}>
                                                Leveraging local Indonesian expertise and broad international network to source and deliver high-quality products.
                                            </motion.h3>
                                            <motion.div variants={textVariant} className="gs-overview-border-box" style={{ paddingLeft: '50px', borderLeft: '2px solid rgba(255,255,255,0.7)' }}>
                                                <span className="gs-overview-body" style={{ color: '#fff', fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400 }}>
                                                    The Gesit Companies have been trading commodities along the aluminum value chain and providing agency services used by banks and other consumers for over 30 years.
                                                </span>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                            {/* SECTION 3: TRADING — text left, image right contained */}
                            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                                <div className="project-row image-right">
                                    {/* Text Container (Left) */}
                                    <div className="project-text-wrapper left">
                                        <motion.div
                                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                                            className="project-text-content"
                                        >
                                            <motion.h2 variants={textVariant} className="project-title">Trading</motion.h2>
                                            <motion.p variants={textVariant} className="project-desc">The Gesit Companies has been in this business for over 30 years. We source and deliver a variety of products including Bauxite, Alumina, Calcinated Petroleum Coke, Aluminum Ingots, to domestic and international markets — Indonesia, China, South America and the Middle East.</motion.p>

                                        </motion.div>
                                    </div>
                                    {/* Image Container (Right) */}
                                    <motion.div
                                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                                        className="project-image-container"
                                    >
                                        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                                            {tradingGallery.map((img, i) => (
                                                <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === activeTrading ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
                                                    <Image src={img} alt={`Trading ${i}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                            {/* SECTION 4: AGENCY SERVICES — image left, text right contained */}
                            <section className="project-section" style={{ padding: '150px 0', backgroundColor: '#fcfcfc', overflow: 'hidden' }}>
                                <div className="project-row image-left">
                                    {/* Image Container (Left) */}
                                    <motion.div
                                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                                        className="project-image-container"
                                    >
                                        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                                            {agencyGallery.map((img, i) => (
                                                <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === activeAgency ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
                                                    <Image src={img} alt={`Agency ${i}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                    {/* Text Container (Right) */}
                                    <div className="project-text-wrapper right">
                                        <motion.div
                                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                                            className="project-text-content"
                                        >
                                            <motion.h2 variants={textVariant} className="project-title">Agency Services</motion.h2>
                                            <motion.p variants={textVariant} className="project-desc">For over two decades, this division has provided its agency services to support the supply and distribution of products and technology used by banks and other consumers. Representative products include special currency paper and coins, high security technology to identify brand and documents, and disposal machines.</motion.p>

                                        </motion.div>
                                    </div>
                                </div>
                            </section>

                            <style jsx global>{`
                                .project-row {
                                    display: flex;
                                    flex-wrap: wrap;
                                    align-items: center;
                                    width: 100%;
                                    max-width: 1200px;
                                    margin: 0 auto;
                                    padding: 0 40px;
                                    box-sizing: border-box;
                                    gap: 80px;
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
                                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                                    border-radius: 5px;
                                }

                                .project-title {
                                    font-family: Lora, Georgia, serif;
                                    color: #000;
                                    font-size: clamp(38px, 6vw, 44px);
                                    line-height: 1.2;
                                    font-weight: 500;
                                    margin: 0 0 25px;
                                    letter-spacing: -0.5px;
                                }
                                .project-desc {
                                    font-family: 'Source Sans Pro', sans-serif;
                                    font-size: clamp(16px, 1.8vw, 17.5px);
                                    line-height: 1.8;
                                    color: #000;
                                    margin-bottom: 35px;
                                }
                                .project-info-box {
                                    padding: 4px 0 4px 35px;
                                    border-left: 2px solid #BC9C33;
                                    margin: 25px 0 45px;
                                    border-radius: 5px;
                                }
                                .project-info-text {
                                    font-family: 'Source Sans Pro', sans-serif;
                                    font-size: 16.5px;
                                    color: #666;
                                    margin: 8px 0 0 0;
                                }
                                .pill-button {
                                    display: inline-flex;
                                    align-items: center;
                                    color: #103065;
                                    background-color: transparent;
                                    border: 1.5px solid #103065;
                                    border-radius: 50px;
                                    padding: 14px 42px;
                                    font-family: 'Source Sans Pro', sans-serif;
                                    font-size: 13.5px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 1.5px;
                                    text-decoration: none;
                                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                                }
                                .pill-button:hover {
                                    background-color: #103065;
                                    color: #fff;
                                    transform: translateY(-3px);
                                    box-shadow: 0 8px 20px rgba(16,48,101,0.25);
                                }
                                .project-info-text {
                                    font-family: 'Source Sans Pro', sans-serif;
                                    font-size: 16.5px;
                                    color: #000;
                                    margin: 8px 0 0 0;
                                }



                                @media (max-width: 1024px) {
                                    .project-row {
                                        flex-direction: column !important;
                                        gap: 0px !important;
                                        padding: 0 !important;
                                    }
                                    .project-row.image-right {
                                        flex-direction: column-reverse !important;
                                    }
                                    .project-image-container {
                                        flex: 0 0 auto !important;
                                        width: 100% !important;
                                        max-width: 100% !important;
                                        height: 450px !important;
                                        border-radius: 0 !important;
                                    }
                                    .project-text-wrapper {
                                        flex: 1 1 100% !important;
                                        width: 100% !important;
                                        max-width: 100% !important;
                                        justify-content: center !important;
                                        text-align: center !important;
                                        padding: 60px 30px !important;
                                        box-sizing: border-box;
                                    }
                                    .project-text-content {
                                        padding: 0 !important;
                                        max-width: 100% !important;
                                    }
                                    .project-info-box {
                                        display: inline-block;
                                        text-align: left !important;
                                        border-left: 4px solid #BC9C33 !important;
                                        border-top: none !important;
                                        padding: 0 0 0 25px !important;
                                        margin: 30px auto !important;
                                    }
                                    .project-text-content {
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                    }
                                    .project-section {
                                        padding: 80px 0 !important;
                                    }
                                    .hero-title {
                                        left: 0 !important;
                                        right: 0 !important;
                                        bottom: 50% !important;
                                        transform: translateY(50%) !important;
                                        text-align: center !important;
                                        width: 100% !important;
                                        font-size: 45px !important;
                                        padding: 0 20px !important;
                                        box-sizing: border-box !important;
                                    }
                                    .hero-navigation {
                                        display: none !important;
                                    }
                                    .elementor-element-fabe996 {
                                        padding: 80px 0 !important;
                                    }
                                    .elementor-element-fabe996 .elementor-container {
                                        padding: 0 30px !important;
                                    }
                                    .elementor-element-fabe996 h3 {
                                        font-size: 30px !important;
                                        text-align: left !important;
                                        margin-bottom: 30px !important;
                                    }
                                    .elementor-element-fabe996 div[style*="borderLeft"] {
                                        padding-left: 20px !important;
                                        border-left-width: 2px !important;
                                    }
                                    .elementor-element-fabe996 span {
                                        font-size: 16px !important;
                                        text-align: left !important;
                                        line-height: 1.6 !important;
                                    }
                                }
                            `}</style>

                        </div>
                    </div>
                </div>
            </main >
        </>
    );
}
