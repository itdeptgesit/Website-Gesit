'use client';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Maximize, Minimize } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';

const SLIDE_DURATION = 6000; // ms per slide

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [heroSlides, setHeroSlides] = useState([
    { src: '/hero/hero_image_property_3-2.webp', alt: 'Property' },
    { src: '/hero/hero_image_trading_1-2.webp', alt: 'Trading & Services' },
    { src: '/hero/hero_manufacturing.webp', alt: 'Manufacturing' },
    { src: '/hero/hero_natural_resources.webp', alt: 'Natural Resources' },
  ]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isYtPlaying, setIsYtPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ytIframeRef = useRef(null);
  const videoContainerRef = useRef(null);

  // BUG-09 FIX: Set mounted flag after hydration to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const fetchImages = async () => {
      const supabase = createClient();
      const { data } = await supabase
          .from('hero_images')
          .select('image_url')
          .eq('page_name', 'home')
          .order('display_order');
      if (data && data.length > 0) {
          setHeroSlides(data.map((h, i) => ({ src: h.image_url, alt: `Home Slide ${i + 1}` })));
      }
    };
    fetchImages();
  }, []);

  // Auto-advance hero slides
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [heroSlides]);

  const YT_VIDEO_ID = 'fK5J6qNrVUE';
  const YT_THUMB = '/csr/gallery/Gallery 2_water for nansean.webp';

  const toggleYtPlay = () => {
    const iframe = ytIframeRef.current;
    if (!iframe) return;
    const cmd = isYtPlaying ? 'pauseVideo' : 'playVideo';
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args: [] }), '*');
    setIsYtPlaying(prev => !prev);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!videoContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Auto-mute video when leaving page or scrolling away
  useEffect(() => {
    if (!videoPlaying) return;

    const handleVisibilityChange = () => {
      if (!ytIframeRef.current) return;
      if (document.hidden) {
        ytIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');
      } else {
        ytIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!ytIframeRef.current) return;
        if (!entry.isIntersecting) {
          ytIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');
        } else {
          ytIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
        }
      });
    }, { threshold: 0 });

    if (ytIframeRef.current) {
      observer.observe(ytIframeRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [videoPlaying]);

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
              fill quality={100}
                  sizes="(max-width: 768px) 200vw, 100vw"
              quality={60}
              style={{
                objectFit: 'cover',
                objectPosition: 'center bottom',
                transform: i === activeIdx ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 20000ms linear',
              }}
              priority={i === 0}
              {...(i === 0 ? { fetchPriority: "high", loading: "eager", unoptimized: true } : {})}
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
            className="text-[38px] md:text-[clamp(52px,7vw,85px)]"
            style={{
              fontFamily: 'var(--font-serif)', color: '#fff',
              fontWeight: 400,
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
                        <div className="elementor-widget-container px-6 md:px-0">
                          <motion.h2 variants={textVariant} className="elementor-heading-title elementor-size-default">
                            Over 50 Years of Investing in <br className="hidden md:inline" /> the Development of Indonesia
                          </motion.h2>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-ef90b6d elementor-widget elementor-widget-heading" data-id="ef90b6d" data-element_type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container px-6 md:px-0">
                          <motion.p variants={textVariant} className="elementor-heading-title elementor-size-default text-white gs-home-tagline">
                            At Gesit, we put the stakeholders first and we are committed to contribute and grow with Indonesia. We invest in our workforce, research, and innovation to create the best and most sustainable industry solutions, while remaining mindful of the environment and our impact.
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* 3. BUSINESS CARDS */}
              <section className="elementor-section elementor-top-section elementor-element elementor-element-4e02d40 elementor-section-stretched zs-custom-height elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no gs-home-business-section" data-id="4e02d40" data-element_type="section" suppressHydrationWarning>
                <div className="elementor-container elementor-column-gap-no flex flex-col md:flex-row gs-business-grid top: 1657px; left: 397px; width: 292.75px; height: 231.906px;" style={{ alignItems: 'stretch' }}>
                  {[
                    { id: 'b35b078', widgetId: 'd64b48a', href: '/our-business/property', img: '/business/property/property-scaled-1.webp', title: 'Property', desc: 'Creating value-adding and sustainable assets to our communities and partnering with leading multinational corporations.' },
                    { id: '4a6a044', widgetId: '0f06ba2', href: '/our-business/trading-services', img: '/home/trading-card.webp', title: 'Trading & Services', desc: 'Leveraging local Indonesian expertise and broad international network to source and deliver high-quality products.' },
                    { id: '8f2780b', widgetId: '55da946', href: '/our-business/manufacturing', img: '/home/manufacturing-card.webp', title: 'Manufacturing', desc: 'Serving important industrial sectors, delivering high-quality products, and establishing strong long-term partnership.' },
                    { id: '1055671', widgetId: 'd2b43ba', href: '/our-business/natural-resources', img: '/business/natural-resources/resources-scaled-1.webp', title: 'Natural Resources', desc: "Developing Indonesia's vast natural resources and continually expanding to other types of minerals and resources." },
                  ].map((biz, idx) => (
                    <div key={biz.id} className={`elementor-column w-full md:w-1/4 elementor-top-column elementor-element elementor-element-${biz.id} gs-business-column`} data-id={biz.id} data-element_type="column" style={{ display: 'flex' }}>
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
                            <div className="qodef-shortcode qodef-m text-center-mobile qodef-location-info qodef-layout--text-below qodef-text-break--disabled gs-business-card mx-auto md:mx-0" style={{ borderRadius: 5, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                              <div className="qodef-m-image">
                                <Image loading="lazy" decoding="async" src={biz.img} className="attachment-full size-full" alt={biz.title} width={400} height={300} sizes="(max-width: 768px) 100vw, 25vw" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                              </div>
                              <div className="qodef-m-content gs-business-card-content" style={{ backgroundColor: '#bc9c33', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <motion.div variants={textVariant} role="heading" aria-level={3} className="qodef-m-title" style={{ color: '#ffffff', fontSize: '26px', fontWeight: 600 }}>
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
                  <div className="elementor-column w-full md:w-1/2 elementor-top-column elementor-element elementor-element-40a7e5e" data-id="40a7e5e" data-element_type="column">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div className="elementor-element elementor-element-a962264 elementor-widget elementor-widget-video" data-id="a962264" data-element_type="widget" data-widget_type="video.default">
                        <div className="elementor-widget-container">
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ borderRadius: 12, overflow: 'hidden' }}
                          >
                            <div
                              style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000', cursor: videoPlaying ? 'default' : 'pointer', borderRadius: 12, overflow: 'hidden' }}
                              onClick={() => !videoPlaying && setVideoPlaying(true)}
                            >
                              {!videoPlaying ? (
                                <>
                                  <Image
                                    src={YT_THUMB}
                                    alt="Water For Nansean 2025 - Gesit Foundation"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                  {/* Dark overlay */}
                                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
                                  {/* Play button */}
                                  <div style={{
                                    position: 'absolute', inset: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    pointerEvents: 'none'
                                  }}>
                                    <div style={{
                                      width: 72, height: 72, borderRadius: '50%',
                                      background: 'rgba(255,255,255,0.95)',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                    }}>
                                      <Play size={28} style={{ color: '#BC9C33', marginLeft: 4 }} fill="#BC9C33" />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                /* Outer clip container - hides title bar (top) and YouTube logo (bottom) */
                                <div ref={videoContainerRef} style={{ position: 'absolute', inset: 0, borderRadius: isFullscreen ? 0 : 12, overflow: 'hidden', background: '#000' }}>
                                  {/* Inner container - iframe scaled to hide YouTube UI bands */}
                                  <div style={{ position: 'absolute', top: isFullscreen ? '-10%' : '-80px', left: 0, right: 0, bottom: isFullscreen ? '-10%' : '-80px' }}>
                                    <iframe
                                      ref={ytIframeRef}
                                      src={`https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&controls=0&fs=0&disablekb=1&enablejsapi=1`}
                                      title="Water For Nansean 2025"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      style={{ width: '100%', height: '100%', border: 'none' }}
                                    />
                                  </div>
                                  
                                  {/* Custom Fullscreen Button */}
                                  <button
                                    onClick={toggleFullscreen}
                                    style={{
                                      position: 'absolute',
                                      bottom: 16,
                                      right: 16,
                                      zIndex: 20,
                                      background: 'rgba(0,0,0,0.6)',
                                      border: 'none',
                                      borderRadius: 8,
                                      padding: 8,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: '#fff',
                                      transition: 'background 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                                  >
                                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT – Text */}
                  <div className="elementor-column w-full md:w-1/2 elementor-top-column elementor-element elementor-element-849ada0" data-id="849ada0" data-element_type="column">
                    <motion.div
                      className="elementor-widget-wrap elementor-element-populated"
                      variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="elementor-element elementor-element-7e9aa1b elementor-widget elementor-widget-heading" data-id="7e9aa1b" data-element_type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <motion.h4 variants={textVariant} className="elementor-heading-title elementor-size-default">
                            Water For Nansean 2025
                          </motion.h4>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-6fecd41 elementor-widget elementor-widget-text-editor" data-id="6fecd41" data-element_type="widget" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container">
                          <motion.p variants={textVariant}>
                            Gesit Foundation provides access to clean water for the Nansean community in East Nusa Tenggara, Indonesia. This initiative is part of our ongoing commitment to improving the quality of life in underserved areas through sustainable infrastructure.
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
                            <div role="heading" aria-level={3} className="qodef-m-title" style={{ fontSize: '24px', fontWeight: 400, margin: 0, padding: 0, fontFamily: 'Georgia, Lora, serif', color: '#1e1e1e' }}>Gesit Foundation CSR Program</div>
                            <p className="qodef-m-text" style={{ marginTop: 8, fontSize: '18px', color: '#555555', fontFamily: "var(--font-sans)" }}>Constructing clean water facilities in remote areas to support the Nansean community.</p>
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
