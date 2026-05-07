'use client';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

/* ── Hero slides (from RevSlider rs-slides) ── */
const heroSlides = [
  { src: '/hero/hero_image_property_3-2.webp', alt: 'Property' },
  { src: '/hero/hero_image_trading_1-2.webp', alt: 'Trading & Services' },
  { src: '/hero/hero_manufacturing.webp', alt: 'Manufacturing' },
  { src: '/hero/hero_natural_resources.webp', alt: 'Natural Resources' },
];

const SLIDE_DURATION = 6000; // ms per slide

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRef = useRef(null);

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  // Force-play video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => { });
    };
    tryPlay();
    v.addEventListener('canplay', tryPlay);
    return () => v.removeEventListener('canplay', tryPlay);
  }, []);

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
    <>
      {/* 1. HERO Section */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#103065',
      }}>
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

        {/* Hero Slides */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              opacity: i === activeIdx ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
              zIndex: 2,
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center bottom',
                transform: i === activeIdx ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 20000ms linear',
              }}
              priority={i === 0}
            />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
              background: 'linear-gradient(rgba(16,48,101,0.5) 0%, transparent 100%)',
              zIndex: 5,
            }} />
          </div>
        ))}

        {/* Hero Title */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', zIndex: 20,
          pointerEvents: 'none', textShadow: '0 4px 15px rgba(0,0,0,0.5)',
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            style={{
              fontFamily: 'var(--font-serif)', color: '#fff',
              fontSize: 'clamp(42px, 7vw, 85px)', fontWeight: 400,
              lineHeight: 1.1, textAlign: 'center', margin: 0,
            }}
          >
            Your First Choice<br />Strategic Partner
          </motion.h1>
        </div>
      </section>

      <main id="qodef-page-content" className="qodef-grid qodef-layout--template">
        <div className="qodef-grid-inner clear">
          <div className="qodef-grid-item qodef-page-content-section qodef-col--12">
            <div data-elementor-type="wp-page" data-elementor-id={215} className="elementor elementor-215">

              {/* 2. TAGLINE SECTION */}
              <section className="elementor-section elementor-top-section elementor-element elementor-element-1ed85d6 qodef-elementor-content-grid elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section-stretched" data-id="1ed85d6" data-element_type="section" id="scroll">
                <div className="elementor-container elementor-column-gap-no">
                  <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7e71f02" data-id="7e71f02" data-element_type="column">
                    <motion.div
                      className="elementor-widget-wrap elementor-element-populated"
                      variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="elementor-element elementor-element-6102ad3 elementor-widget elementor-widget-heading" data-id="6102ad3" data-element_type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <motion.h2 variants={textVariant} className="elementor-heading-title elementor-size-default">
                            Over 50 Years of Investing in <br /> the Development of Indonesia
                          </motion.h2>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-ef90b6d elementor-widget elementor-widget-heading" data-id="ef90b6d" data-element_type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <motion.p variants={textVariant} className="elementor-heading-title elementor-size-default text-white" style={{ fontSize: '24px', lineHeight: '1.3', fontWeight: 400, fontFamily: 'Georgia, Lora, serif' }}>
                            At Gesit, we put the stakeholders first and we are committed to contribute and grow with Indonesia. We invest in our workforce, research, and innovation to create the best and most sustainable industry solutions, while remaining mindful of the environment and our impact.
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* 3. BUSINESS CARDS */}
              <section className="elementor-section elementor-top-section elementor-element elementor-element-4e02d40 elementor-section-stretched zs-custom-height elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="4e02d40" data-element_type="section" suppressHydrationWarning>
                <div className="elementor-container elementor-column-gap-no" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
                  {[
                    { id: 'b35b078', widgetId: 'd64b48a', href: '/our-business/property', img: '/business/property/property-scaled-1.webp', title: 'Property', desc: 'Creating value-adding and sustainable assets to our communities and partnering with leading multinational corporations.' },
                    { id: '4a6a044', widgetId: '0f06ba2', href: '/our-business/trading-services', img: '/business/trading-services/trading_and_services-scaled-1.webp', title: 'Trading & Services', desc: 'Leveraging local Indonesian expertise and broad international network to source and deliver high-quality products.' },
                    { id: '8f2780b', widgetId: '55da946', href: '/our-business/manufacturing', img: '/business/manufacturing/manufacturing-scaled-1.webp', title: 'Manufacturing', desc: 'Serving important industrial sectors, delivering high-quality products, and establishing strong long-term partnership.' },
                    { id: '1055671', widgetId: 'd2b43ba', href: '/our-business/natural-resources', img: '/business/natural-resources/resources-scaled-1.webp', title: 'Natural Resources', desc: "Developing Indonesia's vast natural resources and continually expanding to other types of minerals and resources." },
                  ].map((biz, idx) => (
                    <div key={biz.id} className={`elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-${biz.id}`} data-id={biz.id} data-element_type="column" style={{ display: 'flex', marginBottom: '20px' }}>
                      <motion.div
                        className="elementor-widget-wrap elementor-element-populated"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                      >
                        <div className={`elementor-element elementor-element-${biz.widgetId} p-15 elementor-widget elementor-widget-thetrial_core_location_info`} data-id={biz.widgetId} data-element_type="widget" data-widget_type="thetrial_core_location_info.default">
                          <div className="elementor-widget-container">
                            <div className="qodef-shortcode qodef-m text-center-mobile qodef-location-info qodef-layout--text-below qodef-text-break--disabled" style={{ borderRadius: 5, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                              <div className="qodef-m-image">
                                <Image loading="lazy" decoding="async" src={biz.img} className="attachment-full size-full" alt={biz.title} width={400} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                              </div>
                              <div className="qodef-m-content" style={{ backgroundColor: '#bc9c33', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: '300px', padding: '35px 25px' }}>
                                <motion.div variants={textVariant} role="heading" aria-level={3} className="qodef-m-title" style={{ color: '#ffffff', fontSize: '22px', fontWeight: 600 }}>
                                  <Link href={biz.href} style={{ color: '#ffffff', textDecoration: 'none' }}>{biz.title}</Link>
                                </motion.div>
                                <motion.p variants={textVariant} className="qodef-m-text" style={{ color: '#ffffff' }}>{biz.desc}</motion.p>
                                <motion.div variants={textVariant} style={{ marginTop: 'auto' }}>
                                  <Link href={biz.href} title={`Learn more about ${biz.title}`} className="qodef-m-link qodef-button qodef-layout--textual" style={{ color: '#ffffff' }}>
                                    <span className="qodef-m-link-text">Learn More <span className="sr-only">about {biz.title}</span></span>
                                    <svg className="qodef-filled-arrow" xmlns="http://www.w3.org/2000/svg" width={22} height={22}>
                                      <g fill="currentColor" stroke="currentColor"><circle cx={11} cy={11} r="10.5" /></g>
                                      <path fill="#fff" d="M13.9 10.776l-3.775 3.775L9 13.426l2.651-2.65L9 8.125 10.125 7z" />
                                    </svg>
                                  </Link>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. CSR VIDEO SECTION */}
              <section className="elementor-section elementor-top-section elementor-element elementor-element-69cfa11 elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no elementor-section-stretched" data-id="69cfa11" data-element_type="section">
                <div className="elementor-container elementor-column-gap-no">
                  {/* LEFT – Video */}
                  <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-40a7e5e" data-id="40a7e5e" data-element_type="column">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div className="elementor-element elementor-element-a962264 elementor-widget elementor-widget-video" data-id="a962264" data-element_type="widget" data-widget_type="video.default">
                        <div className="elementor-widget-container">
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="e-hosted-video elementor-wrapper elementor-open-inline" style={{ borderRadius: 12, overflow: 'hidden' }}
                          >
                            <video suppressHydrationWarning ref={videoRef} className="elementor-video" src="/video/csr-video.mp4" autoPlay muted loop playsInline preload="metadata" style={{ width: '100%', display: 'block', borderRadius: 12 }} />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT – Text */}
                  <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-849ada0" data-id="849ada0" data-element_type="column">
                    <motion.div
                      className="elementor-widget-wrap elementor-element-populated"
                      variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="elementor-element elementor-element-7e9aa1b elementor-widget elementor-widget-heading" data-id="7e9aa1b" data-element_type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <motion.h4 variants={textVariant} className="elementor-heading-title elementor-size-default">
                            We want to create a positive effect on lives and communities in Indonesia
                          </motion.h4>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-6fecd41 elementor-widget elementor-widget-text-editor" data-id="6fecd41" data-element_type="widget" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container">
                          <motion.p variants={textVariant}>
                            Our social investment programs focus on three areas where we believe Gesit will add the most value and make a significant and lasting impact: <strong>Healthcare, Environment &amp; Cultural Outreach,</strong> and <strong>Education.</strong>
                          </motion.p>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-5f5a1b0 btn-lora elementor-widget elementor-widget-thetrial_core_button" data-id="5f5a1b0" data-element_type="widget" data-widget_type="thetrial_core_button.default">
                        <div className="elementor-widget-container">
                          <motion.div variants={textVariant}>
                            <Link href="/csr" title="Read more about our CSR programs" className="qodef-shortcode qodef-m qodef-button qodef-layout--textual qodef-size--small qodef-html--link" style={{ color: '#bc9c33', fontSize: 16, fontWeight: 700 }}>
                              <span className="qodef-m-text">Read More <span className="sr-only">about our CSR programs</span></span>
                              <svg className="qodef-filled-arrow" xmlns="http://www.w3.org/2000/svg" width={22} height={22}>
                                <g fill="currentColor" stroke="currentColor"><circle cx={11} cy={11} r="10.5" /></g>
                                <path fill="#fff" d="M13.9 10.776l-3.775 3.775L9 13.426l2.651-2.65L9 8.125 10.125 7z" />
                              </svg>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-b4752b6 elementor-widget elementor-widget-thetrial_core_section_title" data-id="b4752b6" data-element_type="widget" data-widget_type="thetrial_core_section_title.default">
                        <div className="elementor-widget-container">
                          <motion.div variants={textVariant} className="qodef-shortcode qodef-m qodef-section-title qodef-alignment--left">
                            <div role="heading" aria-level={3} className="qodef-m-title" style={{ fontSize: '24px', fontWeight: 400, margin: 0, padding: 0, fontFamily: 'Georgia, Lora, serif', color: '#1e1e1e' }}>Gesit Foundation COVID-19 Vaccination Program</div>
                            <p className="qodef-m-text" style={{ marginTop: 8, fontSize: '18px', color: '#555555', fontFamily: "var(--font-sans)" }}>Participating in COVID control and distributing vaccines.</p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
