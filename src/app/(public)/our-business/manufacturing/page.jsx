"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
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


export default function ManufacturingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [activeAlu, setActiveAlu] = useState(0);
  const [activePackaging, setActivePackaging] = useState(0);

  const SLIDE_DURATION = 5000;

  useEffect(() => {
    setIsMounted(true);
    const aluTimer = setInterval(() => {
      setActiveAlu(prev => (prev + 1) % 3);
    }, 5000);
    const packagingTimer = setInterval(() => {
      setActivePackaging(prev => (prev + 1) % 4);
    }, 5000);
    return () => {
      clearInterval(aluTimer);
      clearInterval(packagingTimer);
    };
  }, []);

  const aluminumImages = [
    "/manufacturing/aluminum1.webp",
    "/manufacturing/aluminum2.webp",
    "/manufacturing/aluminum3.webp"
  ];

  const packagingImages = [
    "/manufacturing/steel1.webp",
    "/manufacturing/steel2.webp",
    "/manufacturing/steel3.webp",
    "/manufacturing/steel4.webp"
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
    <div className="manufacturing-page-container">
      <div className="editorial-grain" />

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
        {/* Fallback Hero Image (Server-side rendered for instant loading) */}
        {!isMounted && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <Image
              src="/manufacturing/hero1.webp"
              alt="Manufacturing"
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
              { url: "/manufacturing/hero1.webp", alt: "Manufacturing 1" },
              { url: "/manufacturing/hero2.webp", alt: "Manufacturing 2" }
            ].map((slide, idx) => (
              <SwiperSlide key={idx} style={{ position: "relative" }}>
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  className="gs-hero-zoom-image"
                  fill
                  style={{ objectFit: "cover" }}
                  priority={idx === 0}
                  fetchPriority={idx === 0 ? "high" : "low"}
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
          Manufacturing
        </motion.h1>

        {/* Navigation arrows - Only show when mounted */}
        {isMounted && (
          <div className="gs-hero-nav">
            <button
              ref={(node) => setPrevEl(node)}
              className="gs-prev-manufacturing"
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
              className="gs-next-manufacturing"
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

      {/* ── 2. GOLD INTRO — Synchronized with CSR page layout ── */}
      <section className="bg-[#BC9C33] gs-gold-intro-section">
        <div className="max-w-[824px] w-full mx-auto px-6 md:px-[70px] lg:px-0">
          <motion.div
            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
            className="lg:pl-0"
          >
            {/* Heading */}
            <motion.div className="mb-5" variants={fadeInUp}>
              <h3 className="text-[30px] md:text-[36px] lg:text-[36px] font-normal leading-snug md:leading-[50px]" style={{
                color: '#fff',
                fontFamily: 'var(--font-serif)',
                margin: 0,
                textAlign: 'left'
              }}>
                Serving important industrial sectors, delivering high-quality products, and establishing strong long-term partnership.
              </h3>
            </motion.div>

            {/* Description */}
            <motion.div style={{ paddingLeft: '24px', borderLeft: '2px solid rgba(255,255,255,0.7)' }} variants={fadeInUp}>
              <p className="text-[16px] md:text-[24px] lg:text-[23px] leading-relaxed md:leading-normal" style={{
                color: '#fff',
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                margin: 0
              }}>
                The Gesit Companies operates aluminum fabrication and packaging company through two business lines: <strong>Alakasa Andalan Mitra Sejati</strong> and <strong>Rheem Indonesia</strong>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. ALUMINUM FABRICATION – text LEFT, images RIGHT ── */}
      <section className="project-section" style={{ paddingTop: '150px', overflow: 'hidden' }}>
        <div className="project-row image-right">
          {/* Text Container (Left) */}
          <div className="project-text-wrapper left">
            <motion.div
              variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
              className="project-text-content"
            >
              <motion.h2 variants={fadeInUp} className="project-title">Aluminum Fabrication</motion.h2>
              <motion.div variants={fadeInUp} className="project-desc">
                <p>The Gesit Companies invests and manages its aluminum fabrication company—Alakasa Andalan Mitra Sejati—since its Joint Venture with Alcan Aluminum in 1972. We focus on aluminum fabrication company that specializes in the industrial sector (e.g., train, marine, plantation, other industrial products) to serve the local and international market. We have served countries such as Singapore, Malaysia, Philippine, Brunei, Japan, and Hong Kong over the last 40 years, and we plan on continuing our vision to be recognized as&nbsp;a&nbsp;leader in Manufacturing and Fabricating Aluminum.</p>
              </motion.div>

              <motion.div variants={textVariant}>
                <a
                  href="/business/manufacturing/Company-Profile-Alakasa-Andalan-Mitra-Sejati-2022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button"
                >
                  View Brochure
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Container (Right) */}
          <motion.div
            variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
            className="project-image-container"
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              {aluminumImages.map((img, i) => (
                <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === activeAlu ? 1 : 0, transition: 'opacity 1.5s ease-in-out', zIndex: i === activeAlu ? 10 : 0 }}>
                  {(i === activeAlu || i === (activeAlu + 1) % aluminumImages.length) && (
                    <Image src={img} alt={`Aluminum ${i}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. STEEL & PLASTIC PACKAGING – images LEFT, text RIGHT ── */}
      <section className="project-section" style={{ padding: '150px 0', backgroundColor: '#fff', overflow: 'hidden' }}>
        <div className="project-row image-left">
          {/* Image Container (Left) */}
          <motion.div
            variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
            className="project-image-container"
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              {packagingImages.map((img, i) => (
                <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === activePackaging ? 1 : 0, transition: 'opacity 1.5s ease-in-out', zIndex: i === activePackaging ? 10 : 0 }}>
                  {(i === activePackaging || i === (activePackaging + 1) % packagingImages.length) && (
                    <Image src={img} alt={`Packaging ${i}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                  )}
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
              <motion.h2 variants={fadeInUp} className="project-title">Steel & Plastic Packaging</motion.h2>
              <motion.div variants={fadeInUp} className="project-desc">
                <p>The Gesit Companies invests and manages its packaging company—Rheem Indonesia—since it was established by Rheem Australia in 1969. The focus is to build&nbsp;a&nbsp;packaging company that specialises in industrial packaging products, such as steel and plastic drums as well as Jerry cans, for use in industries such as oil, paint, fragrance, chemical, and food processing. We ensure that customers obtain the highest standard of quality products and services, using premium materials and operating to international standards (on time and at competitive prices).</p>
              </motion.div>

              <motion.div variants={textVariant}>
                <a
                  href="https://rheem.co.id/"
                  target="_blank" rel="noopener noreferrer"
                  className="pill-button"
                  title="Learn more about Steel and Plastic Packaging"
                >
                  Learn More
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. ALUMINA REFINERY – text LEFT, image RIGHT ── */}
      <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
        <div className="project-row image-right">
          {/* Text Container (Left) */}
          <div className="project-text-wrapper left">
            <motion.div
              variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
              className="project-text-content"
            >
              <motion.h2 variants={fadeInUp} className="project-title" style={{ marginBottom: '10px' }}>Alumina Refinery & Aluminum Smelter Development</motion.h2>
              <motion.h3 variants={fadeInUp} className="gs-project-subtitle">Under Development</motion.h3>

              <motion.div variants={fadeInUp} className="project-desc">
                <p>We believe the Alumina and Aluminum industries can be domestically developed to service domestic and global clients due to Indonesia&apos;s rich natural resources and logistical advantage.</p>
                <p>The Gesit Companies will develop&nbsp;a&nbsp;2-million-ton Alumina Refinery and upon completion, develop an Aluminum Smelter which will reach 1 million ton for the next phase.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Container (Right) */}
          <motion.div
            variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
            className="project-image-container"
          >
            <Image src="/manufacturing/alumina.webp" alt="Alumina Refinery" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
                .manufacturing-page-container {
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
                    }
                }
            `}</style>

    </div>
  );
}

