"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

/* ─── ANIMATION VARIANTS ─── */
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

const PropertyPage = () => {

    const [isMounted, setIsMounted] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const SLIDE_DURATION = 5000;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Force full-width layout by adding a specific class to body
    useEffect(() => {
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
        <>
            {/* SECTION 1: HERO SLIDER — Forced 100vw breakout to bypass any parent container constraints */}
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
                                { url: "/wp-content/uploads/2021/09/hero_image_property_1-2.png", alt: "Property 1" },
                                { url: "/wp-content/uploads/2021/09/hero_image_property_2-2.png", alt: "Property 2" },
                                { url: "/wp-content/uploads/2021/09/hero_image_property_3-2.webp", alt: "Property 3" }
                            ].map((slide, idx) => (
                                <SwiperSlide key={idx} style={{ position: "relative", overflow: "hidden" }}>
                                    <Image
                                        src={slide.url}
                                        alt={slide.alt}
                                        fill
                                        style={{
                                            objectFit: "cover",
                                            transform: idx === activeIdx ? "scale(1.15)" : "scale(1.05)",
                                            transition: "transform 10000ms ease-out"
                                        }}
                                        priority={idx === 0}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="gesit-hero-overlay" />


                        {/* "Property" animated title — Larger and Precisely Positioned */}
                        <motion.div
                            className="gs-hero-title"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
                            Property
                        </motion.div>

                        {/* Navigation arrows */}
                        <div className="gs-hero-nav">
                            <button
                                ref={(node) => setPrevEl(node)}
                                className="gs-prev-property"
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
                                className="gs-next-property"
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

            <main id="qodef-page-content" className="qodef-grid qodef-layout--template" style={{ backgroundColor: '#fff' }}>
                <div className="qodef-grid-inner clear">
                    <div className="qodef-grid-item qodef-page-content-section qodef-col--12">
                        <div data-elementor-type="wp-page" data-elementor-id="5121" className="elementor elementor-5121">

                            {/* SECTION 2: GOLD INTRO — Increased Padding and Size */}
                            <section className="elementor-element-fabe996" style={{ backgroundColor: '#BC9C33', padding: '150px 0' }}>
                                <div className="elementor-container gs-overview-container">
                                    <motion.div
                                        variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                                        className="elementor-column elementor-col-100"
                                    >
                                        <div className="elementor-widget-wrap elementor-element-populated">
                                            <motion.h3 variants={textVariant} className="gs-overview-heading" style={{ color: '#fff', fontFamily: 'Lora, Georgia, serif', fontWeight: 400, marginBottom: '15px' }}>
                                                Creating value-adding and sustainable assets to our communities and partnering with leading multinational corporations.
                                            </motion.h3>
                                            <motion.div variants={textVariant} className="gs-overview-border-box" style={{ paddingLeft: '50px', borderLeft: '2px solid rgba(255,255,255,0.7)' }}>
                                                <span className="gs-overview-body" style={{ color: '#fff', fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400 }}>
                                                    The Gesit Companies&apos; property portfolio is historically centered within Jakarta&apos;s Golden Triangle and is focused on commercial real estate development.
                                                </span>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                            {/* PROJECT SECTIONS — TEXT AND IMAGE ALTERNATING — Centered 1200px Container */}

                            {/* SECTION 3: TRINITY TOWER — text left, image right breakout */}
                            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                                <div className="project-row image-right">
                                    {/* Text Container (Left) */}
                                    <div className="project-text-wrapper left">
                                        <motion.div
                                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                                            className="project-text-content"
                                        >
                                            <motion.h2 variants={textVariant} className="project-title">Trinity Tower</motion.h2>
                                            <motion.p variants={textVariant} className="project-desc">Completed in 2021, the Trinity Tower is a Premium Grade A office tower constructed by Shimizu Construction located in the heart of Jakarta&apos;s Golden Triangle. It spans over 50 floors with a total of 140,000m<sup>2</sup> in built up area. It has a separate 9-floor structure for food, retail, and tenant parking facility</motion.p>
                                            <motion.div variants={textVariant} className="project-info-box">
                                                <h6 className="project-info-title">Location : Jakarta, Indonesia</h6>
                                                <p className="project-info-text">Property Type : Office and Multifunction Area</p>
                                            </motion.div>
                                            <motion.div variants={textVariant}>
                                                <a className="pill-button" href="https://trinitytower.co.id/" target="_blank" rel="noopener noreferrer">Learn More</a>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                    {/* Image Container (Right Breakout) */}
                                    <motion.div
                                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                                        className="project-image-container"
                                    >
                                        <Swiper modules={[Autoplay]} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} style={{ width: '100%', height: '100%' }}>
                                            {["trinity_01.jpg", "trinity_02.jpg", "trinity_03.jpg", "trinity_04.jpg", "trinity_05.jpg", "trinity_06.jpg"].map(img => (
                                                <SwiperSlide key={img} style={{ width: '100%', height: '100%' }}>
                                                    <img src={`/wp-content/uploads/2021/12/${img}`} alt="Trinity Tower" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </motion.div>
                                </div>
                            </section>

                            {/* SECTION 4: JS LUWANSA — image left, text right breakout */}
                            <section className="project-section" style={{ padding: '150px 0', backgroundColor: '#fcfcfc', overflow: 'hidden' }}>
                                <div className="project-row image-left">
                                    {/* Image Container (Left Breakout) */}
                                    <motion.div
                                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                                        className="project-image-container"
                                    >
                                        <Swiper modules={[Autoplay]} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} style={{ width: '100%', height: '100%' }}>
                                            {["property_jsl_2.png", "property_jsl_3.png"].map(img => (
                                                <SwiperSlide key={img} style={{ width: '100%', height: '100%' }}>
                                                    <img src={`/wp-content/uploads/2021/09/${img}`} alt="JS Luwansa" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </motion.div>
                                    {/* Text Container (Right) */}
                                    <div className="project-text-wrapper right">
                                        <motion.div
                                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                                            className="project-text-content"
                                        >
                                            <motion.h2 variants={textVariant} className="project-title">JS Luwansa</motion.h2>
                                            <motion.p variants={textVariant} className="project-desc">JS Luwansa Hotel and Convention Center is located in Jakarta&apos;s Golden Triangle, Jakarta&apos;s fastest growing and exclusive business district. Conveniently located in close proximity to major embassies, shopping malls and the toll way. JS Luwansa Hotel and Convention Center is the perfect place for discerning business travelers who need a strategic base to support their business activities from a location within close proximity to the rest of Jakarta.</motion.p>
                                            <motion.div variants={textVariant} className="project-info-box">
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

                            {/* SECTION 5: PPHUI — text left, image right breakout */}
                            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                                <div className="project-row image-right">
                                    {/* Text Container (Left) */}
                                    <div className="project-text-wrapper left">
                                        <motion.div
                                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                                            className="project-text-content"
                                        >
                                            <motion.h2 variants={textVariant} className="project-title">PPHUI Building &amp; Usmar Ismail Hall</motion.h2>
                                            <motion.p variants={textVariant} className="project-desc">Usmar Ismail Hall is an important part of the PPHUI building, which includes a 6,400 m<sup>2</sup> office space and state of the art cinema and concert hall located in CBD Jakarta. The Usmar Ismail Concert Hall has been designed with an exclusive interior, comfortable seating arrangement and modern lighting. The design concept ensures the ultimate enjoyment experience for the audience of each presented program. This is the first Integrated Cinema and Concert Hall in Indonesia.</motion.p>
                                            <motion.div variants={textVariant} className="project-info-box">
                                                <h6 className="project-info-title">Location : Jakarta, Indonesia</h6>
                                                <p className="project-info-text">Property Type : Office Space &amp; Concert Hall</p>
                                            </motion.div>
                                            <motion.div variants={textVariant}>
                                                <a className="pill-button" href="mailto:fitri@gesit.co.id" target="_self">Learn More</a>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                    {/* Image Container (Right Breakout) */}
                                    <motion.div
                                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                                        className="project-image-container"
                                    >
                                        <Swiper modules={[Autoplay]} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} style={{ width: '100%', height: '100%' }}>
                                            {["property_PPHUI_Exterior_1.png", "property_PPHUI_Theater_2.png"].map(img => (
                                                <SwiperSlide key={img} style={{ width: '100%', height: '100%' }}>
                                                    <img src={`/wp-content/uploads/2021/09/${img}`} alt="PPHUI" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </motion.div>
                                </div>
                            </section>

                            {/* SECTION 6: SENAYAN AVENUE — image left, text right breakout */}
                            <section className="project-section" style={{ padding: '150px 0', backgroundColor: '#fcfcfc', overflow: 'hidden' }}>
                                <div className="project-row image-left">
                                    {/* Image Container (Left Breakout) */}
                                    <motion.div
                                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                                        className="project-image-container"
                                    >
                                        <div style={{ width: '100%', height: '100%' }}>
                                            <img src="/wp-content/uploads/2021/11/senayan-development-.jpg" alt="Senayan Development" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                        </div>
                                    </motion.div>
                                    {/* Text Container (Right) */}
                                    <div className="project-text-wrapper right">
                                        <motion.div
                                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                                            className="project-text-content"
                                        >
                                            <motion.h2 variants={textVariant} className="project-title">Senayan Development</motion.h2>
                                            <motion.h2 variants={textVariant} className="project-title" style={{ fontSize: '24px', fontStyle: 'italic', color: '#BC9C33', marginTop: '-15px' }}>Under Development</motion.h2>
                                            <motion.p variants={textVariant} className="project-desc">This development boasts a world-class international standard and comprises over 180 rooms with 1,500 m<sup>2</sup> of multifunction &amp; ballroom space.</motion.p>
                                            <motion.div variants={textVariant} className="project-info-box">
                                                <h6 className="project-info-title">Location : Jakarta, Indonesia</h6>
                                                <p className="project-info-text">Project Type : Tower Building</p>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </section>

                            {/* SECTION 7: TOD RASUNA — text left, image right breakout */}
                            <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
                                <div className="project-row image-right">
                                    {/* Text Container (Left) */}
                                    <div className="project-text-wrapper left">
                                        <motion.div
                                            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                                            className="project-text-content"
                                        >
                                            <motion.h2 variants={textVariant} className="project-title">TOD Rasuna Development</motion.h2>
                                            <motion.h2 variants={textVariant} className="project-title" style={{ fontSize: '24px', fontStyle: 'italic', color: '#BC9C33', marginTop: '-15px' }}>Under Development</motion.h2>
                                            <motion.p variants={textVariant} className="project-desc">This TOD development within inner Jakarta&apos;s Golden Triangle will combine retail, residential, and a world-class theater space together into one – enabling ease of mobility for tenants and reducing on-street traffic.</motion.p>
                                            <motion.div variants={textVariant} className="project-info-box">
                                                <h6 className="project-info-title">Location : Jakarta, Indonesia</h6>
                                                <p className="project-info-text">Project Type : Tower Building</p>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                    {/* Image Container (Right Breakout) */}
                                    <motion.div
                                        variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
                                        className="project-image-container"
                                    >
                                        <div style={{ width: '100%', height: '100%' }}>
                                            <img src="/wp-content/uploads/2021/09/property_TOD_Rasuna_1.png" alt="TOD Rasuna" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </main>

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
                    font-size: clamp(38px, 6vw, 44px); /* Slightly larger matching screenshot */
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
                        height: 480px !important;
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
        </>
    );
};

export default PropertyPage;
