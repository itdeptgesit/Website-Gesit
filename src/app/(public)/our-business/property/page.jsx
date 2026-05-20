"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

const editorialReveal = {
    initial: { clipPath: 'inset(100% 0% 0% 0%)' },
    whileInView: {
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] }
    },
    viewport: { once: true }
};

const PropertyPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const SLIDE_DURATION = 5000;

    useEffect(() => {
        setIsMounted(true);
        document.body.classList.add('property-page-full-width');
        return () => document.body.classList.remove('property-page-full-width');
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
        <div className="property-page-container">
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
                            src="/hero/hero_image_property_1-2.webp"
                            alt="Property"
                            className="gs-hero-zoom-image"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                            fetchPriority="high"
                            sizes="100vw"
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
                            { url: "/hero/hero_image_property_1-2.webp", alt: "Property 1" },
                            { url: "/hero/hero_image_property_2-2.webp", alt: "Property 2" },
                            { url: "/hero/hero_image_property_3-2.webp", alt: "Property 3" }
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
                                    sizes="100vw"
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
                    Property
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
                            <h3 className="text-[28px] md:text-[36px] lg:text-[36px] font-normal leading-snug md:leading-[50px]" style={{
                                color: '#fff',
                                fontFamily: 'Lora, serif',
                                margin: 0,
                                textAlign: 'left'
                            }}>
                                Creating value-adding and sustainable assets to our communities and partnering with leading multinational corporations.
                            </h3>
                        </motion.div>

                        <motion.div style={{ paddingLeft: '24px', borderLeft: '2px solid rgba(255,255,255,0.7)' }} variants={fadeInUp}>
                            <p className="text-[16px] md:text-[24px] lg:text-[23px] leading-relaxed md:leading-normal" style={{
                                color: '#fff',
                                fontFamily: "var(--font-sans)",
                                fontWeight: 400,
                                margin: 0
                            }}>
                                The Gesit Companies&apos; property portfolio is historically centered within Jakarta&apos;s Golden Triangle and is focused on commercial real estate development.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── 3. TRINITY TOWER ── */}
            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                <div className="project-row image-right">
                    <div className="project-text-wrapper left">
                        <motion.div
                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                            className="project-text-content"
                        >
                            <motion.h2 variants={fadeInUp} className="project-title">Trinity Tower</motion.h2>
                            <motion.div variants={fadeInUp} className="project-desc">
                                <p>Completed in 2021, the Trinity Tower is a&nbsp;Premium Grade&nbsp;A office tower constructed by Shimizu Construction located in the heart of&nbsp;Jakarta's Golden Triangle. It spans over 50 floors with a&nbsp;total of 140,000&nbsp;m² in built up area. It has a&nbsp;separate 9-floor structure for food, retail, and tenant parking facility.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="project-info-box">
                                <h6 className="project-info-title">Location : Jakarta, Indonesia</h6>
                                <p className="project-info-text">Property Type : Office and Multifunction Area</p>
                            </motion.div>
                            <motion.div variants={textVariant}>
                                <a className="pill-button" href="https://trinitytower.co.id/" target="_blank" rel="noopener noreferrer">Learn More</a>
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
                            {["trinity_01.webp", "trinity_02.webp", "trinity_03.webp", "trinity_04.webp", "trinity_05.webp", "trinity_06.webp"].map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image src={`/business/property/${img}`} alt={`Trinity Tower ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 530px" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </section>

            {/* ── 4. JS LUWANSA ── */}
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
                            {["property_jsl_2.webp", "property_jsl_3.webp"].map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image src={`/business/property/${img}`} alt={`JS Luwansa ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 530px" />
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
                            <motion.h2 variants={fadeInUp} className="project-title">JS Luwansa</motion.h2>
                            <motion.div variants={fadeInUp} className="project-desc">
                                <p>JS Luwansa Hotel and Convention Center is located in Jakarta&apos;s Golden Triangle, Jakarta&apos;s fastest growing and exclusive business district. Conveniently located in close proximity to major embassies, shopping malls and the toll way. JS Luwansa Hotel and Convention Center is the perfect place for discerning business travelers who need a&nbsp;strategic base to support their business activities from&nbsp;a&nbsp;location within close proximity to the rest of Jakarta.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="project-info-box">
                                <h6 className="project-info-title">Location : Jakarta, Indonesia</h6>
                                <p className="project-info-text">Property Type : Hotel</p>
                            </motion.div>
                            <motion.div variants={textVariant}>
                                <a className="pill-button" href="https://www.jsluwansa.com/" target="_blank" rel="noopener noreferrer">Learn More</a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── 5. PPHUI BUILDING ── */}
            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                <div className="project-row image-right">
                    <div className="project-text-wrapper left">
                        <motion.div
                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                            className="project-text-content"
                        >
                            <motion.h2 variants={fadeInUp} className="project-title">PPHUI Building & Usmar Ismail Hall</motion.h2>
                            <motion.div variants={fadeInUp} className="project-desc">
                                <p>Usmar Ismail Hall is an important part of the PPHUI building, which includes a&nbsp;6,400 m<sup>2</sup> office space and state of the art cinema and concert hall located in CBD Jakarta. The Usmar Ismail Concert Hall has been designed with an exclusive interior, comfortable seating arrangement and modern lighting. The design concept ensures the ultimate enjoyment experience for the audience of each presented program. This is the first Integrated Cinema and Concert Hall in Indonesia.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="project-info-box">
                                <h6 className="project-info-title">Location : Jakarta, Indonesia</h6>
                                <p className="project-info-text">Property Type : Office Space & Concert Hall</p>
                            </motion.div>
                            <motion.div variants={textVariant}>
                                <a className="pill-button" href="mailto:fitri@gesit.co.id">Learn More</a>
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
                            {["property_PPHUI_Exterior_1.webp", "property_PPHUI_Theater_2.webp"].map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image src={`/business/property/${img}`} alt={`PPHUI ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 530px" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </section>

            {/* ── 6. SENAYAN AVENUE ── */}
            <section className="project-section" style={{ padding: '150px 0', backgroundColor: '#fff', overflow: 'hidden' }}>
                <div className="project-row image-left">
                    <motion.div
                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                        className="project-image-container"
                    >
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image src="/business/property/senayan-development-.webp" alt="Senayan Development" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 530px" />
                        </div>
                    </motion.div>

                    <div className="project-text-wrapper right">
                        <motion.div
                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                            className="project-text-content"
                        >
                            <motion.h2 variants={fadeInUp} className="project-title">Senayan Development</motion.h2>
                            <motion.h3 variants={fadeInUp} className="gs-project-subtitle">Under Development</motion.h3>
                            <motion.div variants={fadeInUp} className="project-desc">
                                <p>This development boasts a&nbsp;world-class international standard and comprises over 180 rooms with 1,500 m<sup>2</sup> of multifunction & ballroom space.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="project-info-box">
                                <h6 className="project-info-title">Location : Jakarta, Indonesia</h6>
                                <p className="project-info-text">Project Type : Tower Building</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── 7. TOD RASUNA ── */}
            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                <div className="project-row image-right">
                    <div className="project-text-wrapper left">
                        <motion.div
                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                            className="project-text-content"
                        >
                            <motion.h2 variants={fadeInUp} className="project-title">TOD Rasuna Development</motion.h2>
                            <motion.h3 variants={fadeInUp} className="gs-project-subtitle">Under Development</motion.h3>
                            <motion.div variants={fadeInUp} className="project-desc">
                                <p>This TOD development within inner Jakarta&apos;s Golden Triangle will combine retail, residential, and a&nbsp;world-class theater space together into one  – enabling ease of mobility for tenants and reducing on-street traffic.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="project-info-box">
                                <h6 className="project-info-title">Location : Jakarta, Indonesia</h6>
                                <p className="project-info-text">Project Type : Tower Building</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                        className="project-image-container"
                    >
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image src="/business/property/property_TOD_Rasuna_1.webp" alt="TOD Rasuna" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 530px" />
                        </div>
                    </motion.div>
                </div>
            </section>

            <style jsx global>{`
                .property-page-container {
                    position: relative;
                    background: #fff;
                }
                
                /* Subtle Grain texture remains for premium feel */
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
                    flex: 0 0 530px;
                    height: 652px;
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
                    font-size: 19px;
                    line-height: 1.8;
                    color: #000000;
                    margin-bottom: 45px;
                    text-align: justify;
                }
                .project-desc p {
                    margin-bottom: 25px;
                }
                .project-info-box {
                    padding: 4px 0 4px 35px;
                    border-left: 2px solid #BC9C33;
                    margin-bottom: 45px;
                }
                .project-info-title {
                    font-family: Lora, Georgia, serif;
                    font-size: 20px;
                    color: #222;
                    font-weight: 500;
                    margin: 0;
                }
                .project-info-text {
                    font-family: var(--font-sans);
                    font-size: 17.5px;
                    color: #666;
                    margin: 8px 0 0 0;
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
                        max-width: 100% !important;
                        height: auto !important;
                        aspect-ratio: 922 / 652 !important;
                        border-radius: 0 !important;
                        margin: 0 !important;
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
                        max-width: 100% !important;
                    }
                    .project-title {
                        font-size: clamp(28px, 6vw, 36px) !important;
                        line-height: 1.3 !important;
                        margin-bottom: 25px !important;
                        text-align: center !important;
                    }
                    .project-desc {
                        font-size: 18px !important;
                        line-height: 1.6 !important;
                        text-align: justify !important;
                        hyphens: auto;
                        margin-bottom: 25px !important;
                    }
                    .project-desc p {
                        margin-bottom: 12px !important;
                    }
                    .project-info-box {
                        text-align: left !important;
                        padding-left: 20px !important;
                        margin: 10px 0 25px !important;
                        align-self: flex-start !important;
                    }
                    .project-info-title {
                        font-size: 16px !important;
                        line-height: 1.4 !important;
                    }
                    .project-info-text {
                        font-size: 14.5px !important;
                        line-height: 1.4 !important;
                        margin: 4px 0 0 0 !important;
                    }

                }
            `}</style>
        </div>
    );
};

export default PropertyPage;
