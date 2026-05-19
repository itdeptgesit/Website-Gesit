"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft, Loader2, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Remove static import
// import { newsItems as staticNewsItems } from './newsData';

const NewsPage = () => {

  const heroImages = [
    "/news/Background-Handover-Daswin.jpeg",
    "/news/30-Ventilator-DKI.jpeg",
    "/news/Gubernur-Kalbar-Ventilator.jpeg",
    "/news/PMI-Ventilator.jpeg"
  ];

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
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/news');
        const data = await res.json();
        if (res.ok) {
          setNewsItems(data);
        } else {
          setError(data.error || "Failed to fetch news");
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Network error or server is down");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const featuredArticle = newsItems[0];
  const otherArticles = newsItems.slice(1, 5); // Fetch up to 4 cards for the grid

  /* ── Swiper refs/buttons logic ── */
  const [isMounted, setIsMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

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
    <div className="bg-white min-h-screen text-navy-deep font-sans">
      {/* ================= HERO ================= */}
      <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        {/* Fallback Hero Image (Server-side rendered for instant loading) */}
        {!isMounted && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <Image 
              src={heroImages[0]} 
              alt="News" 
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
            {heroImages.map((url, idx) => (
              <SwiperSlide key={idx} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                <Image
                  src={url}
                  alt={`News ${idx}`}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover"
                  }}
                  priority={idx === 0}
                  {...(idx === 0 ? { fetchPriority: "high", loading: "eager" } : {})}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        
        {/* Gold Progress Bar - TOP */}
        <div className="absolute top-0 left-0 w-full h-[4px] bg-black/20 z-40">
          <motion.div
            key={activeIdx}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: "linear" }}
            style={{ originX: 0 }}
            className="h-full bg-[#BC9C33]"
          />
        </div>

        <div className="gesit-hero-overlay" />

        {/* Hero Content - Matching global .gs-hero-title positioning */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="gs-hero-title"
        >
          News
        </motion.h1>

        {/* Navigation arrows - Only show when mounted */}
        {isMounted && (
          <div className="gs-hero-nav">
            <button
              ref={(node) => setPrevEl(node)}
              className="gs-prev-news"
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
              className="gs-next-news"
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

      {/* ================= LOADING / SKELETON STATE ================= */}
      {loading && (
        <section className="pt-24 md:pt-32 pb-8 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-slate-50 overflow-hidden rounded-[5px] animate-pulse">
              <div className="aspect-[16/9] lg:aspect-auto bg-slate-200 min-h-[400px]"></div>
              <div className="p-6 md:p-12 lg:p-20 space-y-8">
                <div className="h-4 bg-slate-200 w-1/4 rounded"></div>
                <div className="h-12 bg-slate-200 w-full rounded"></div>
                <div className="h-12 bg-slate-200 w-full rounded"></div>
                <div className="h-12 bg-slate-200 w-12 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!loading && newsItems.length === 0 && (
        <section className="pt-40 pb-20 bg-white text-center">
          <p className="text-slate-400 font-bold uppercase tracking-widest">No articles published yet.</p>
        </section>
      )}

      {/* ================= FEATURED NEWS ================= */}
      {!loading && newsItems.length > 0 && (
        <section className="pt-24 md:pt-32 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              variants={textVariant}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="gs-news-featured-card grid grid-cols-1 lg:grid-cols-[2fr_1fr] shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden rounded-[5px]"
            >
              {/* Image Side - Balanced Landscape */}
              <div className="gs-news-featured-image relative aspect-[16/9] lg:aspect-auto h-full overflow-hidden bg-slate-100 min-h-[350px] lg:min-h-[480px]">
                <Image
                  src={featuredArticle?.image_url || featuredArticle?.image || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'}
                  alt={featuredArticle?.title || 'News Update'}
                  fill
                  className="gs-news-featured-img object-cover hover:scale-105 transition duration-1000"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  priority
                />
              </div>

              {/* Content Side (Navy Box) */}
              <div className="gs-news-featured-content bg-navy-deep p-10 md:p-12 flex flex-col justify-between text-white">
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="gs-news-featured-inner flex flex-col h-full"
                >
                  <motion.span 
                    variants={textVariant} 
                    className="text-[14px] font-medium uppercase tracking-[.2em] text-white/60 mb-8 block"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif' }}
                  >
                    {featuredArticle?.date || (featuredArticle?.created_at ? new Date(featuredArticle.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '')}
                  </motion.span>
                  
                  <div className="gs-news-featured-main flex-grow flex flex-col justify-center">
                    <motion.h2
                      variants={textVariant}
                      className="text-2xl md:text-3xl lg:text-[38px] text-white leading-[1.2] mb-8"
                      style={{ fontFamily: 'Lora, serif', fontWeight: 500 }}
                    >
                      {featuredArticle?.title}
                    </motion.h2>
                    
                    <motion.div variants={textVariant}>
                      <Link
                        href={`/news/${featuredArticle?.slug || featuredArticle?.id}`}
                        className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-navy-deep transition-all duration-300 group"
                      >
                        <ChevronRight size={18} strokeWidth={2} className="text-white group-hover:text-navy-deep group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </motion.div>
                  </div>

                  <motion.div variants={textVariant} className="gs-news-card-meta gs-news-card-meta-featured pt-8 mt-8 border-t border-white/10">
                    <p className="gs-news-card-category text-[13px] font-semibold text-white/75 mb-1 uppercase tracking-[.22em]">News</p>
                    <p className="gs-news-card-author text-[13px] font-semibold text-white/95">by {featuredArticle?.author || 'Gesit'}</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= NEWS GRID ================= */}
      <section className="pt-8 pb-12 bg-white" id="news-archive">
        <div className="container mx-auto px-6 max-w-7xl">


          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4" data-testid="news-loading">
              <Loader2 className="w-12 h-12 text-[#BC9C33] animate-spin" />
              <p className="text-navy-deep/60 animate-pulse font-medium">Fetching the latest news...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-12 text-center max-w-2xl mx-auto" data-testid="news-error">
              <h3 className="text-red-800 text-xl font-bold mb-2">Oops! Something went wrong</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-800 text-white rounded-full hover:bg-red-900 transition-colors">
                Try Again
              </button>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-32 bg-slate-50 rounded-3xl" data-testid="news-empty">
              <div className="text-slate-300 mb-6 flex justify-center">
                <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 2v4a2 2 0 002 2h4" />
                </svg>
              </div>
              <h3 className="text-navy-deep text-xl md:text-2xl font-bold mb-2">No Stories Yet</h3>
              <p className="text-navy-deep/60">Check back later for the latest updates from Gesit.</p>
            </div>
          ) : (
            <div className="gs-news-grid-list grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {otherArticles.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex ${index === 3 ? "xl:hidden" : ""}`}
                >
                      <Link
                        href={`/news/${item.slug || item.id}`}
                        className="gs-news-grid-card flex-1 bg-[#deebf9] p-10 flex flex-col items-start group hover:bg-[#d0e1f4] transition-all duration-500 min-h-[480px] rounded-[5px]"
                      >
                        <span 
                          className="text-[13px] font-medium uppercase tracking-[.1em] text-navy-deep/50 mb-8 block"
                          style={{ fontFamily: 'var(--font-source-sans), sans-serif' }}
                        >
                          {item.date || new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        
                        <div className="flex-grow">
                          <h3
                            className="text-[24px] md:text-[26px] text-navy-deep leading-[1.3] mb-8 group-hover:text-[#bc9c33] transition-colors"
                            style={{ fontFamily: 'Lora, serif', fontWeight: 500 }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        
                        <div className="mt-auto w-full">
                          <div className="mb-10">
                            <div className="w-9 h-9 rounded-full bg-transparent border border-navy-deep/20 flex items-center justify-center group-hover:bg-[#BC9C33] group-hover:border-[#BC9C33] transition-all duration-300">
                              <ChevronRight size={16} strokeWidth={2} className="text-navy-deep group-hover:text-white" />
                            </div>
                          </div>
                          
                          <div className="gs-news-card-meta pt-8 border-t border-navy-deep/10 w-full">
                            <p className="gs-news-card-category text-[13px] font-semibold text-navy-deep/55 mb-1 uppercase tracking-[.22em]">News</p>
                            <p className="gs-news-card-author text-[13px] font-semibold text-navy-deep">by {item.author || 'Gesit'}</p>
                          </div>
                        </div>
                      </Link>
                </motion.div>
              ))}
            </div>
          )}

            {/* See All Button */}
            {newsItems.length > 4 && (
              <div className="gs-news-see-all-row mt-8 flex justify-start">
                <Link
                  href="/news/archive"
                  className="gs-news-see-all-link flex items-center gap-3 group text-navy-deep font-black uppercase tracking-[.3em] text-[11px]"
                >
                  <span>See All</span>
                  <div className="gs-news-see-all-icon w-8 h-8 rounded-full border border-navy-deep flex items-center justify-center group-hover:bg-navy-deep group-hover:text-white transition-all duration-300">
                    <ArrowRight size={14} strokeWidth={3} />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </section>

      {/* ================= INFINITE SCROLL GALLERY ================= */}
      <section className="gs-news-gallery-section py-24 bg-[#BC9C33] overflow-hidden">
        <div className="relative w-full">
          <div className="gs-news-gallery-window flex overflow-hidden relative">
            <motion.div
              className="gs-news-gallery-track flex gap-6 md:gap-10 px-4 py-6 md:py-12 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 95,
                repeat: Infinity,
                repeatType: "loop",
              }}
              style={{ width: "fit-content" }}
            >
              {newsItems.length > 0 && [...newsItems, ...newsItems].map((item, index) => (
                <motion.div
                  key={`gallery-scroll-${index}`}
                  className="gs-news-gallery-card w-[280px] h-[190px] md:w-[450px] md:h-[300px] shrink-0 rounded-[5px] overflow-hidden transition-all duration-700 group relative bg-white"
                  whileHover={{ y: -10, scale: 1.025 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={item.image_url || item.image || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'}
                    alt={item.title || 'News Update'}
                    fill
                    className="object-cover grayscale-[10%] scale-[1.01] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2200ms] ease-out"
                    sizes="(max-width: 768px) 280px, 450px"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#103065]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;

