"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
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
  const otherArticles = newsItems.slice(1);

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
              {heroImages.map((url, idx) => (
                <SwiperSlide key={idx} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                  <Image
                    src={url}
                    alt={`News ${idx}`}
                    fill
                    unoptimized
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


            {/* Title */}
            <motion.h1
              className="gs-hero-title"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              style={{
                lineHeight: "72px"
              }}>
              News
            </motion.h1>

            {/* Navigation arrows */}
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
          </>
        )}
      </section>

      {/* ================= LOADING / EMPTY STATE ================= */}
      {(loading || newsItems.length === 0) && (
        <section className="pt-40 pb-20 bg-white text-center">
          {loading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin text-navy-deep" size={40} /></div>
          ) : (
            <p className="text-slate-400 font-bold uppercase tracking-widest">No articles published yet.</p>
          )}
        </section>
      )}

      {/* ================= FEATURED NEWS ================= */}
      {newsItems.length > 0 && (
        <section className="pt-24 md:pt-32 pb-8 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              variants={textVariant}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden rounded-[5px]"
            >
              {/* Image Side */}
              <div className="relative aspect-[4/3] lg:aspect-auto h-full overflow-hidden bg-slate-100 min-h-[400px]">
                <Image
                  src={featuredArticle?.image_url || featuredArticle?.image || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'}
                  alt={featuredArticle?.title || 'News Update'}
                  fill
                  className="object-cover hover:scale-105 transition duration-1000"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content Side (Navy Box) */}
              <div className="bg-navy-deep p-12 lg:p-20 flex flex-col justify-between text-white space-y-12">
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                >
                  <motion.span variants={textVariant} className="text-[14px] font-bold uppercase tracking-[.4em] text-white/60 mb-8 block">
                    {featuredArticle?.date}
                  </motion.span>
                  <motion.h2
                    variants={textVariant}
                    className="text-3xl md:text-5xl text-white leading-tight mb-12"
                    style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
                  >
                    {featuredArticle?.title}
                  </motion.h2>
                  <motion.div variants={textVariant}>
                    <Link
                      href={`/news/${featuredArticle?.slug || featuredArticle?.id}`}
                      className="w-12 h-12 rounded-full bg-[#BC9C33] flex items-center justify-center hover:bg-white hover:text-navy-deep transition-all duration-300 group shadow-lg"
                    >
                      <ChevronRight size={22} strokeWidth={2.5} className="text-white group-hover:text-navy-deep group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div variants={textVariant} className="pt-12 border-t border-white/10 mt-auto">
                  <p className="text-[16px] font-bold text-[#BC9C33] mb-2 uppercase tracking-widest">News</p>
                  <p className="text-[15px] font-medium text-white/80">by {featuredArticle?.author || 'Gesit'}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= NEWS GRID ================= */}
      <section className="py-24 bg-white" id="news-archive">
        <div className="container mx-auto px-6">
          <motion.h2 {...textVariant} className="text-[32px] md:text-[44px] text-navy-deep mb-16 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            Latest Stories
          </motion.h2>

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
              <h3 className="text-navy-deep text-2xl font-bold mb-2">No Stories Yet</h3>
              <p className="text-navy-deep/60">Check back later for the latest updates from Gesit.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex"
                >
                  <Link
                    href={`/news/${item.slug || item.id}`}
                    className="flex-1 bg-[#f0f4f9] p-10 md:p-12 flex flex-col items-start group hover:bg-[#e4ebf3] transition-all duration-500 min-h-[360px] rounded-[5px]"
                  >
                    <span className="text-[13px] font-bold uppercase tracking-[.3em] text-navy-deep/50 mb-8 block">
                      {new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3
                      className="text-2xl text-navy-deep leading-snug mb-10 group-hover:text-[#BC9C33] transition-colors"
                      style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
                    >
                      {item.title}
                    </h3>
                    <div className="mt-auto">
                      <div className="w-11 h-11 rounded-full bg-white border border-navy-deep/5 flex items-center justify-center shadow-sm group-hover:bg-[#BC9C33] group-hover:text-white transition-all duration-300">
                        <ChevronRight size={20} strokeWidth={2.5} className="text-navy-deep group-hover:text-white" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

            {/* See All Button */}
            <div className="mt-12 flex justify-start">
              <Link
                href="/news/archive"
                className="flex items-center gap-3 group text-navy-deep font-bold uppercase tracking-[.3em] text-[11px]"
              >
                <span>See All</span>
                <div className="w-8 h-8 rounded-full border border-navy-deep flex items-center justify-center group-hover:bg-navy-deep group-hover:text-white transition-all duration-300">
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </div>
        </section>

      {/* ================= INFINITE SCROLL GALLERY ================= */}
      <section className="py-24 bg-[#BC9C33] overflow-hidden">
        <div className="relative w-full">
          <div className="flex overflow-hidden relative">
            <motion.div
              className="flex gap-12 px-4 py-12 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 120,
                repeat: Infinity,
              }}
              style={{ width: "fit-content" }}
            >
              {newsItems.length > 0 && [...newsItems, ...newsItems, ...newsItems].map((item, index) => (
                <div
                  key={`gallery-scroll-${index}`}
                  className="w-[450px] h-[300px] shrink-0 rounded-[5px] overflow-hidden transition-all duration-700 group relative bg-white"
                >
                  <Image
                    src={item.image_url || item.image || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'}
                    alt={item.title || 'News Update'}
                    fill
                    className="object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-out"
                    sizes="450px"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
