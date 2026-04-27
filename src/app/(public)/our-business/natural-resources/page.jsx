"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const imageVariant = {
    initial: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    viewport: { once: true },
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
};

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

export default function NaturalResourcesPage() {
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
    const bauxiteImages = [
        "/business/natural-resources/bauxite_mining.webp",
        "/business/natural-resources/natural_lds_bauxite_1.webp",
        "/business/natural-resources/natural_lds_bauxite_2.webp"
    ];

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
        <div style={{ backgroundColor: "#fff" }}>

            {/* ── 1. HERO ── */}
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
                                { url: "/hero/hero_natural_resources.webp", alt: "Natural Resources 1" },
                                { url: "/hero/natural_lds_bauxite_1-1.webp", alt: "Natural Resources 2" },
                                { url: "/hero/hero_image_natural_2-2-1.webp", alt: "Natural Resources 3" }
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
                            Natural Resources
                        </motion.div>

                        {/* Navigation arrows */}
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
                    </>
                )}
            </section>

            {/* ── 2. GOLD INTRO ── */}
            <section className="elementor-element-fabe996" style={{ backgroundColor: '#BC9C33', padding: '150px 0' }}>
                <div className="elementor-container gs-overview-container">
                    <motion.div
                        variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                        className="elementor-column elementor-col-100"
                    >
                        <div className="elementor-widget-wrap elementor-element-populated">
                            <motion.h3 variants={textVariant} className="gs-overview-heading" style={{ color: '#fff', fontFamily: 'Lora, Georgia, serif', fontWeight: 400, marginBottom: '15px' }}>
                                Developing Indonesia&apos;s vast natural resources and continually expanding to other types of minerals and resources.
                            </motion.h3>
                            <motion.div variants={textVariant} className="gs-overview-border-box" style={{ paddingLeft: '50px', borderLeft: '2px solid rgba(255,255,255,0.7)' }}>
                                <span className="gs-overview-body" style={{ color: '#fff', fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400 }}>
                                    The Gesit Companies have several bauxite concessions and actively developing its mining and refining capabilities.
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── 3. BAUXITE MINING – text LEFT, image RIGHT contained ── */}
            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                <div className="project-row image-right">
                    {/* Text Container (Left) */}
                    <div className="project-text-wrapper left">
                        <motion.div
                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                            className="project-text-content"
                        >
                            <motion.h2 variants={textVariant} className="project-title">Bauxite Mining</motion.h2>
                            <motion.div variants={textVariant} className="project-desc">
                                <p>The Gesit Companies have several bauxite concessions of about 75,000 Ha along the Kapuas River in West Kalimantan.</p>
                                <p>We are actively developing our mining operations and logistic infrastructure to support the growing national and international alumina industry.</p>
                            </motion.div>

                            <div className="project-info-box">
                                <h6 className="project-info-title">Location : West Kalimantan, Indonesia</h6>
                                <p className="project-info-text">Project Type : Mining & Exploration</p>
                            </div>
                        </motion.div>
                    </div>
                    {/* Image Container (Right) */}
                    <motion.div
                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                        className="project-image-container"
                    >
                        <Swiper
                            modules={[Autoplay]}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {bauxiteImages.map((img, i) => (
                                <SwiperSlide key={i} style={{ width: '100%', height: '100%' }}>
                                    <img src={img} alt={`Bauxite Mining ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </section>

            {/* ── 4. NEW BUSINESS DEVELOPMENT – Grid matching the design ── */}
            <section style={{ backgroundColor: "#f9f9f9", padding: "100px 0" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
                    <motion.h2
                        variants={textVariant}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        style={{
                            fontFamily: "Lora, Georgia, serif",
                            color: "#103065",
                            fontSize: 42,
                            fontWeight: 400,
                            marginBottom: 60,
                            textAlign: "center"
                        }}
                    >
                        New Business Development
                    </motion.h2>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 24
                    }}>
                        {businessCards.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                                style={{
                                    backgroundColor: "#fff",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <div style={{ position: "relative", width: "100%", paddingTop: "60%", overflow: "hidden" }}>
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                                <div style={{
                                    backgroundColor: "#103065",
                                    padding: "24px",
                                    flexGrow: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}>
                                    <h4 style={{
                                        fontFamily: "Lora, Georgia, serif",
                                        color: "#fff",
                                        fontSize: 20,
                                        fontWeight: 400,
                                        margin: 0,
                                        lineHeight: 1.3
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
                .project-desc p {
                    margin-bottom: 20px;
                }
                .project-info-box {
                    padding: 4px 0 4px 35px;
                    border-left: 2px solid #BC9C33;
                    margin: 25px 0 45px;
                    border-radius: 5px;
                }
                .project-info-title {
                    font-family: Lora, Georgia, serif;
                    font-size: 19px;
                    color: #000;
                    font-weight: 500;
                    margin: 0;
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

                @media (max-width: 1024px) {
                    .project-row {
                        gap: 40px;
                    }
                    .project-image-container {
                        flex: 0 0 100%;
                        height: 500px;
                    }
                }

                @media (max-width: 768px) {
                    .project-section {
                        padding: 80px 0 !important;
                    }
                    .project-row {
                        padding: 0 !important;
                        gap: 0 !important;
                    }
                    .project-text-wrapper {
                        padding: 40px 30px !important;
                        justify-content: center !important;
                        text-align: center !important;
                    }
                    .project-image-container {
                        height: 400px;
                        box-shadow: none;
                        order: -1;
                    }
                    .image-right .project-image-container {
                        order: -1;
                    }
                    .project-info-box {
                        display: inline-block;
                        text-align: left;
                        margin: 25px 0;
                    }
                    .hero-navigation {
                        display: none !important;
                    }
                    .elementor-element-fabe996 {
                        padding: 80px 0 !important;
                    }
                    .elementor-element-fabe996 h3 {
                        font-size: 30px !important;
                    }
                }
            `}</style>
        </div>
    );
}
