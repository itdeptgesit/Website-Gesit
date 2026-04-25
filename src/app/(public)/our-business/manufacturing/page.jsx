"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

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
    "/wp-content/uploads/2022/03/3-e1646232593879.jpeg",
    "/wp-content/uploads/2022/03/DSCF3418-edi-2-e1646233775296.jpeg",
    "/wp-content/uploads/2022/01/alu_lr.jpeg"
  ];

  const packagingImages = [
    "/wp-content/uploads/2021/09/manufacturing_steel_1.png",
    "/wp-content/uploads/2021/09/manufacturing_steel_2.png",
    "/wp-content/uploads/2022/01/plastic_packaging.jpeg",
    "/wp-content/uploads/2022/01/steel.jpeg"
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
                { url: "/wp-content/uploads/2021/11/hero_manufacturing.jpg", alt: "Manufacturing 1" },
                { url: "/wp-content/uploads/2022/03/edit-1-scaled.jpg", alt: "Manufacturing 2" },
                { url: "/wp-content/uploads/2022/01/manufacturing-scaled-1.jpg", alt: "Manufacturing 3" }
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
              Manufacturing
            </motion.div>

            {/* Navigation arrows */}
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
          </>
        )}
      </section>

      {/* ── 2. GOLD INTRO — Synchronized with Property page ── */}
      <section className="elementor-element-fabe996" style={{ backgroundColor: '#BC9C33', padding: '150px 0' }}>
        <div className="elementor-container gs-overview-container">
          <motion.div
            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
            className="elementor-column elementor-col-100"
          >
            <div className="elementor-widget-wrap elementor-element-populated">
              <motion.h3 variants={textVariant} className="gs-overview-heading" style={{ color: '#fff', fontFamily: 'Lora, Georgia, serif', fontWeight: 400, marginBottom: '15px' }}>
                Serving important industrial sectors, delivering high-quality products, and establishing strong long-term partnership.
              </motion.h3>
              <motion.div variants={textVariant} className="gs-overview-border-box" style={{ paddingLeft: '50px', borderLeft: '2px solid rgba(255,255,255,0.7)' }}>
                <span className="gs-overview-body" style={{ color: '#fff', fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400 }}>
                  The Gesit Companies operates aluminum fabrication and packaging company through two business lines: Alakasa Andalan Mitra Sejati and Rheem Indonesia.
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. ALUMINUM FABRICATION – text LEFT, images RIGHT ── */}
      <section className="project-section" style={{ padding: '150px 0', overflow: 'hidden' }}>
        <div className="project-row image-right">
          {/* Text Container (Left) */}
          <div className="project-text-wrapper left">
            <motion.div
              variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
              className="project-text-content"
            >
              <motion.h2 variants={textVariant} className="project-title">Aluminum Fabrication</motion.h2>
              <motion.div variants={textVariant} className="project-desc">
                <p>The Gesit Companies invests and manages its aluminum fabrication company—Alakasa Andalan Mitra Sejati—since its Joint Venture with Alcan Aluminum in 1972. We focus on aluminum fabrication company that specializes in the industrial sector (e.g., train, marine, plantation, other industrial products) to serve the local and international market.</p>
                <p>We have served countries such as Singapore, Malaysia, Philippine, Brunei, Japan, and Hong Kong over the last 40 years.</p>
              </motion.div>

              <motion.div variants={textVariant} style={{ marginTop: '45px' }}>
                <a
                  href="/wp-content/uploads/2022/03/Company-Profile-Alakasa-Andalan Mitra-Sejati-2022.pdf"
                  download="AAMS-Brochure.pdf"
                  className="pill-button"
                >
                  Download The Brochure
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
                <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === activeAlu ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
                  <Image src={img} alt={`Aluminum ${i}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. STEEL & PLASTIC PACKAGING – images LEFT, text RIGHT ── */}
      <section className="project-section" style={{ padding: '150px 0', backgroundColor: '#fcfcfc', overflow: 'hidden' }}>
        <div className="project-row image-left">
          {/* Image Container (Left) */}
          <motion.div
            variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
            className="project-image-container"
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              {packagingImages.map((img, i) => (
                <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === activePackaging ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
                  <Image src={img} alt={`Packaging ${i}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
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
              <motion.h2 variants={textVariant} className="project-title">Steel & Plastic Packaging</motion.h2>
              <motion.div variants={textVariant} className="project-desc">
                <p>The Gesit Companies invests and manages its packaging company—Rheem Indonesia—since it was established by Rheem Australia in 1969. The focus is to build a packaging company that specialises in industrial packaging products, such as steel and plastic drums as well as Jerry cans.</p>
                <p>We ensure that customers obtain the highest standard of quality products and services, used in industries such as oil, paint, fragrance, chemical, and food processing.</p>
              </motion.div>

              <motion.div variants={textVariant} style={{ marginTop: '45px' }}>
                <a
                  href="https://www.rheem-ina.com/"
                  target="_blank" rel="noopener noreferrer"
                  className="pill-button"
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
              <motion.h2 variants={textVariant} className="project-title">Alumina Refinery & Aluminum Smelter Development</motion.h2>

              <div className="project-info-box">
                <h6 className="project-info-title" style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '19px', color: '#000', fontWeight: 500, margin: 0 }}>
                  Status : Under Development
                </h6>
                <p className="project-info-text">Project Phase : Development Cycle</p>
              </div>

              <motion.div variants={textVariant} className="project-desc">
                <p>We believe the Alumina and Aluminum industries can be domestically developed to service domestic and global clients due to Indonesia&apos;s rich natural resources and logistical advantage.</p>
                <p>The Gesit Companies will develop a 2-million-ton Alumina Refinery and upon completion, develop an Aluminum Smelter which will reach 1 million ton for the next phase.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Container (Right) */}
          <motion.div
            variants={imageVariant} initial="initial" whileInView="whileInView" viewport={{ once: true }}
            className="project-image-container"
          >
            <Image src="/wp-content/uploads/2021/12/distillation-column.jpeg" alt="Alumina Refinery" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </motion.div>
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
                    .hero-title {
                        left: 0 !important;
                        right: 0 !important;
                        bottom: 50% !important;
                        transform: translateY(50%) !important;
                        text-align: center !important;
                        width: 100% !important;
                        font-size: 55px !important;
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
  );
}
