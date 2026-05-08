"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

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

export default function NaturalResourcesPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const SLIDE_DURATION = 5000;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const businessCards = [
        {
            title: "Nickel Mining",
            image: "/business/natural-resources/nickel-mining-revise.webp"
        },
        {
            title: "Silica Sand Mining",
            image: "/business/natural-resources/20220317_15075.webp"
        },
        {
            title: "Alumina Refinery and Aluminum Smelter",
            image: "/business/natural-resources/aluminium_smelter.webp"
        }
    ];

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
        <div className="natural-resources-page-container">
            <div className="editorial-grain" />

            {/* ── 1. HERO ── */}
            <section className="gs-hero-section" style={{ position: "relative", width: "100%", overflow: "hidden" }}>
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
                            src="/hero/hero_natural_resources.webp"
                            alt="Natural Resources"
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
                            { url: "/hero/hero_natural_resources.webp", alt: "Natural Resources 1" },
                            { url: "/hero/natural_lds_bauxite_1-1.webp", alt: "Natural Resources 2" },
                            { url: "/hero/hero_image_natural_2-2-1.webp", alt: "Natural Resources 3" }
                        ].map((slide, idx) => (
                            <SwiperSlide key={idx} style={{ position: "relative" }}>
                                <Image
                                    src={slide.url}
                                    alt={slide.alt}
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

                <motion.h1
                    className="gs-hero-title"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
                    Natural Resources
                </motion.h1>

                {/* Navigation arrows - Only show when mounted */}
                {isMounted && (
                    <div className="gs-hero-nav">
                        <button
                            ref={(node) => setPrevEl(node)}
                            className="gs-prev-natural-resources"
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
                            className="gs-next-natural-resources"
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

            {/* ── 2. GOLD INTRO — Synchronized with Manufacturing/CSR ── */}
            <section className="flex justify-center bg-[#BC9C33] py-16 md:py-[60px] lg:py-[150px]">
                <div className="max-w-5xl w-full mx-auto px-6 md:px-[40px] lg:px-12">
                    <motion.div
                        variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                        className="lg:pl-20"
                    >
                        {/* Heading */}
                        <motion.div className="mb-5" variants={fadeInUp}>
                            <h3 className="text-[30px] md:text-[36px] lg:text-[36px] font-normal leading-snug md:leading-[50px]" style={{
                                color: '#fff',
                                fontFamily: 'Lora, serif',
                                margin: 0,
                                textAlign: 'left'
                            }}>
                                Developing Indonesia&apos;s vast natural resources and continually expanding to other types of minerals and resources.
                            </h3>
                        </motion.div>

                    </motion.div>
                </div>
            </section>


            {/* ── 3. BAUXITE MINING – Synchronized Layout ── */}
            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                <div className="project-row image-right">
                    {/* Text Container (Left) */}
                    <div className="project-text-wrapper left">
                        <motion.div
                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                            className="project-text-content"
                        >
                            <motion.h2 variants={fadeInUp} className="project-title">Bauxite Mining</motion.h2>
                            <motion.div variants={fadeInUp} className="project-desc">
                                <p>The Gesit Companies have 6 bauxite concessions of about 75,000 Ha along the Kapuas River in West Kalimantan.</p>
                            </motion.div>

                            <motion.div className="project-info-box" variants={fadeInUp}>
                                <h6 className="project-info-title">Location : West Kalimantan, Indonesia</h6>
                            </motion.div>
                        </motion.div>
                    </div>
                    {/* Image Container (Right) */}
                    <motion.div
                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                        className="project-image-container"
                    >
                        <Swiper
                            modules={[Autoplay, EffectFade]}
                            effect="fade"
                            slidesPerView={1}
                            loop={true}
                            speed={1500}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {[
                                "/natural/bauxite_mining.webp",
                                "/natural/natural_lds_bauxite_1.webp",
                                "/natural/natural_lds_bauxite_2.webp"
                            ].map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image src={img} alt={`Bauxite Mining ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </section>

            {/* ── 4. NEW BUSINESS DEVELOPMENT – Refined Cards ── */}
            <section style={{ backgroundColor: "#fff" }} className="py-16 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-[60px]">
                    <motion.h2
                        variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                        style={{
                            fontFamily: "Lora, serif",
                            color: "#222",
                            fontSize: 'clamp(28px, 5vw, 42px)',
                            fontWeight: 400,
                            marginBottom: '40px',
                            textAlign: "center"
                        }}
                        className="md:mb-20"
                    >
                        New Business Development
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[35px]">
                        {businessCards.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                                style={{
                                    backgroundColor: "#fff",
                                    boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
                                    borderRadius: '5px',
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: 'all 0.4s ease'
                                }}
                                whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}
                            >
                                <div style={{ position: "relative", width: "100%", paddingTop: "65%", overflow: "hidden" }}>
                                    <motion.div
                                        style={{ position: 'absolute', inset: 0 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </motion.div>
                                </div>
                                <div style={{
                                    backgroundColor: "#103065",
                                    padding: "30px 24px",
                                    flexGrow: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}>
                                    <h4 style={{
                                        fontFamily: "Lora, serif",
                                        color: "#fff",
                                        fontSize: 21,
                                        fontWeight: 400,
                                        margin: 0,
                                        lineHeight: 1.4
                                    }}>
                                        {card.title}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .natural-resources-page-container {
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
                .project-text-wrapper.left { justify-content: flex-end; }
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
                    color: #222;
                    font-size: clamp(32px, 5vw, 44px);
                    line-height: 1.25;
                    font-weight: 500;
                    margin: 0 0 35px;
                    letter-spacing: -0.01em;
                }
                .project-desc {
                    font-family: var(--font-sans);
                    font-size: 18px;
                    line-height: 1.8;
                    color: #444;
                    margin-bottom: 45px;
                    text-align: justify;
                }
                .project-desc p { margin-bottom: 25px; }
                .project-info-box {
                    padding: 4px 0 4px 35px;
                    border-left: 2px solid #BC9C33;
                    margin-bottom: 45px;
                }
                .project-info-title {
                    font-family: Lora, Georgia, serif;
                    font-size: 19px;
                    color: #222;
                    font-weight: 500;
                    margin: 0;
                }

                @media (max-width: 1024px) {
                    .project-row {
                        flex-direction: column !important;
                        gap: 40px !important;
                        padding: 0 24px !important;
                    }
                    .project-row.image-right {
                        flex-direction: column-reverse !important;
                    }
                    .project-image-container {
                        flex: 0 0 auto !important;
                        width: 100% !important;
                        height: clamp(300px, 50vh, 480px) !important;
                        border-radius: 8px !important;
                    }
                    .project-section {
                        padding: 80px 0 !important;
                    }
                    .project-text-wrapper {
                        width: 100% !important;
                        justify-content: center !important;
                        text-align: center !important;
                        padding: 0 !important;
                    }
                    .project-text-content {
                        max-width: 100% !important;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .project-desc {
                        text-align: center !important;
                    }
                    .project-info-box {
                        text-align: left !important;
                        margin: 0 auto 35px !important;
                    }
                }
            `}</style>
        </div>
    );
}

