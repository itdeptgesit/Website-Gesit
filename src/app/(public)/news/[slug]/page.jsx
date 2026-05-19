'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Calendar, Tag, Loader2,
    Facebook, Linkedin, Link as LinkIcon, Clock, Users,
    Handshake, Heart, ShieldCheck, MessageSquare, FileText
} from "lucide-react";
import ShareButtons from './ShareButtons';
import xss from 'xss';

function NewsDetailSkeleton() {
    return (
        <div className="bg-white min-h-screen pb-24 font-sans text-slate-800 animate-pulse">
            {/* 1. HERO SKELETON */}
            <div className="w-full bg-[#103065] pt-40 pb-20 px-6 relative overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    {/* Breadcrumbs Skeleton */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-3 w-12 bg-white/20 rounded"></div>
                        <span className="text-white/20">/</span>
                        <div className="h-3 w-12 bg-white/20 rounded"></div>
                        <span className="text-white/20">/</span>
                        <div className="h-3 w-32 bg-white/10 rounded"></div>
                    </div>

                    <div className="max-w-4xl space-y-6">
                        {/* Category Tag */}
                        <div className="h-5 w-20 bg-white/20 rounded-[5px]"></div>
                        {/* Title Lines */}
                        <div className="h-10 w-full md:w-3/4 bg-white/25 rounded"></div>
                        <div className="h-10 w-1/2 bg-white/20 rounded"></div>
                        {/* Accent Bar */}
                        <div className="w-20 h-1 bg-white/30 rounded" />
                    </div>
                </div>
            </div>

            {/* 2. MAIN LAYOUT SKELETON */}
            <div className="container mx-auto px-6 lg:px-8 max-w-6xl pt-16">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                    {/* Content Column */}
                    <div className="lg:w-2/3 xl:w-3/4 space-y-12">
                        {/* Featured Media Box */}
                        <div className="w-full aspect-[16/10] bg-slate-100 rounded-[5px] border border-slate-200/50 shadow-sm flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-gold/50 animate-spin"></div>
                        </div>

                        {/* Article Text Paragraphs */}
                        <div className="space-y-6">
                            <div className="h-4 w-full bg-slate-100 rounded"></div>
                            <div className="h-4 w-11/12 bg-slate-100 rounded"></div>
                            <div className="h-4 w-full bg-slate-100 rounded"></div>
                            <div className="h-4 w-10/12 bg-slate-100 rounded"></div>
                            <div className="h-4 w-8/12 bg-slate-100 rounded"></div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-slate-100">
                            <div className="h-6 w-1/4 bg-slate-100 rounded mb-4"></div>
                            <div className="h-4 w-full bg-slate-100 rounded"></div>
                            <div className="h-4 w-full bg-slate-100 rounded"></div>
                            <div className="h-4 w-9/12 bg-slate-100 rounded"></div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:w-1/3 xl:w-1/4 space-y-10">
                        {/* Meta Info Card */}
                        <div className="bg-slate-50 border border-slate-100 rounded-[5px] p-8 space-y-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-200/60"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-3 w-1/3 bg-slate-200/80 rounded"></div>
                                    <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-200/60"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-3 w-1/3 bg-slate-200/80 rounded"></div>
                                    <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100 space-y-3">
                                <div className="h-3 w-1/2 bg-slate-200/80 rounded"></div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                </div>
                            </div>
                        </div>

                        {/* Related News Card */}
                        <div className="space-y-6">
                            <div className="h-4 w-1/3 bg-slate-100 rounded"></div>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-20 h-20 bg-slate-100 rounded-lg shrink-0"></div>
                                    <div className="space-y-3 flex-1">
                                        <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
                                        <div className="h-4 w-full bg-slate-100 rounded"></div>
                                        <div className="h-3 w-3/4 bg-slate-100 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function NewsDetailPage() {
    const params = useParams();
    const slug = params?.slug;

    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news');
                const data = await res.json();
                if (res.ok) setNewsItems(data);
            } catch (err) {
                console.error("Failed to fetch news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) {
        return <NewsDetailSkeleton />;
    }

    const post = newsItems.find((item) => item.slug === slug || item.id === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-navy-deep px-6 pt-20">
                <div className="text-center">
                    <h1 className="text-4xl font-serif mb-6">Article Not Found</h1>
                    <Link href="/news" className="text-gold font-bold uppercase tracking-widest hover:underline">
                        Back to News
                    </Link>
                </div>
            </div>
        );
    }

    // Find next and prev posts for navigation
    const currentIndex = newsItems.findIndex((item) => item.id === post.id);
    const prevPost = currentIndex > 0 ? newsItems[currentIndex - 1] : null;
    const nextPost = currentIndex < newsItems.length - 1 ? newsItems[currentIndex + 1] : null;

    // Find related news (same category, not current post)
    const relatedNews = newsItems
        .filter(item => item.id !== post.id && item.category === post.category)
        .slice(0, 3);

    return (
        <div className="bg-white min-h-screen pb-24 font-sans text-slate-800 selection:bg-gold/30 selection:text-navy-deep">

            {/* 1. HERO SECTION (SOLID NAVY) */}
            <section className="w-full bg-[#103065] pt-40 pb-20 px-6 relative overflow-hidden">
                {/* Background Logo Overlay */}
                <div className="absolute right-[-5%] bottom-[-10%] w-[40%] opacity-[0.03] pointer-events-none">
                    <img src="/logos/logos.png" alt="" className="w-full h-full object-contain brightness-0 invert" />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    {/* Breadcrumbs */}
                    <motion.nav
                        className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white mb-8 font-bold"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link href="/" className="text-white hover:text-gold transition-colors">Home</Link>
                        <span className="text-white/40">/</span>
                        <Link href="/news" className="text-white hover:text-gold transition-colors">News</Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white/30 truncate max-w-[200px]">{post.title}</span>
                    </motion.nav>

                    <div className="max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="inline-block bg-[#bc9c33] text-white text-[10px] font-black px-3 py-1 rounded-[5px] uppercase tracking-tighter mb-6"
                        >
                            {post.category || 'NEWS'}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl lg:text-[54px] text-white leading-[1.1] font-serif mb-8 max-w-5xl"
                        >
                            {post.title}
                        </motion.h1>

                        <div className="w-20 h-1 bg-[#bc9c33]" />
                    </div>
                </div>
            </section>

            {/* 2. MAIN LAYOUT (CONTENT + SIDEBAR) */}
            <main className="container mx-auto px-6 lg:px-8 max-w-6xl pt-16">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

                    {/* Left Column: Content */}
                    <div className="lg:w-2/3 xl:w-3/4">

                        {/* Featured Media (Video or Image) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full aspect-[16/10] rounded-[5px] overflow-hidden mb-12 shadow-2xl bg-slate-100"
                        >
                            {post.video_url ? (
                                <div className="w-full h-full bg-black">
                                    {(() => {
                                        const normalizeUrl = (url) => {
                                            if (!url) return url;
                                            return url.replace(/^https?:\/\/(dev\.)?gesit\.co\.id/i, '');
                                        };
                                        const cleanVideoUrl = normalizeUrl(post.video_url);

                                        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
                                        const ytMatch = cleanVideoUrl.match(ytRegex);
                                        if (ytMatch) {
                                            return (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            );
                                        }
                                        if (cleanVideoUrl.match(/\.(mp4|webm|ogg)$/i)) {
                                            return <video src={cleanVideoUrl} controls className="w-full h-full object-cover" />;
                                        }
                                        // Fallback if URL is set but not recognized as video
                                        return (
                                            <div className="flex items-center justify-center h-full text-white/50 text-sm italic p-10 text-center">
                                                Video link detected but format not supported for embed.<br />
                                                <a href={cleanVideoUrl} target="_blank" className="text-gold underline mt-2 block">{cleanVideoUrl}</a>
                                            </div>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <Image
                                    src={post.image_url || post.image || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                />
                            )}
                        </motion.div>


                        {/* Body Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="prose prose-lg max-w-none text-slate-700 text-[16px] md:text-[18px] leading-[1.8] news-content mb-16"
                            style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                        >
                            <style jsx global>{`
                                .news-content p, 
                                .news-content span, 
                                .news-content font,
                                .news-content div {
                                    font-family: 'Source Sans Pro', sans-serif !important;
                                    font-size: 16px !important;
                                    line-height: 1.8 !important;
                                    color: #334155 !important;
                                    text-align: justify !important;
                                }
                                .news-content h1, 
                                .news-content h2, 
                                .news-content h3, 
                                .news-content h4 {
                                    font-family: 'Lora', serif !important;
                                    color: #103065 !important;
                                    margin-top: 2rem !important;
                                    margin-bottom: 1rem !important;
                                    text-align: left !important;
                                }
                                .news-content img { border-radius: 8px; margin: 2rem auto; }
                            `}</style>
                            {post.content ? (
                                <div
                                    dangerouslySetInnerHTML={{ __html: xss(post.content) }}
                                />
                            ) : (
                                <div className="text-slate-400 italic py-10 border-y border-slate-100 text-center">
                                    Content is not yet available for this article.
                                </div>
                            )}
                        </motion.div>

                        {post.source_url && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mt-[-2rem] mb-16 pt-8 border-t border-slate-100"
                            >
                                <div className="flex items-center gap-3 text-slate-500">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                        <FileText size={14} className="text-navy-deep" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase font-medium tracking-widest text-slate-400 leading-tight">Source / Reference</span>
                                        <span className="text-navy-deep font-normal text-xs break-all leading-normal">
                                            {post.source_url}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}


                    </div>

                    {/* Right Column: Sticky Metadata Sidebar */}
                    <aside className="lg:w-1/3 xl:w-1/4">
                        <div className="sticky-sidebar space-y-10">

                            {/* Meta Info Box */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-slate-50 border border-slate-100 rounded-[5px] p-8 space-y-6 shadow-sm"
                            >
                                <div className="flex items-center gap-4 text-slate-600">
                                    <Calendar className="text-[#bc9c33]" size={20} />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Published</span>
                                        <span className="text-sm font-bold text-navy-deep">{post.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-slate-600">
                                    <Tag className="text-[#bc9c33]" size={20} />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Category</span>
                                        <span className="text-sm font-bold text-navy-deep uppercase">{post.category || 'NEWS'}</span>
                                    </div>
                                </div>

                                {/* Share Section */}
                                <div className="!mt-6 pt-2 border-t border-slate-100">
                                    <h4 className="text-[11px] font-black text-navy-deep uppercase tracking-widest mb-4">Share Article</h4>
                                    <div className="flex gap-3">
                                        <ShareButtons title={post.title} slug={post.slug} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Related News Box */}
                            {relatedNews.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="flex flex-col pt-8"
                                >
                                    <h3 className="text-navy-deep font-black text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                                        RELATED NEWS
                                    </h3>

                                    <div className="flex flex-col gap-6 w-full">
                                        {relatedNews.map((item) => (
                                            <Link href={`/news/${item.slug}`} key={item.id} className="group flex gap-4 items-start">
                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-200 mt-1">
                                                    <Image
                                                        src={item.image_url || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className="text-[10px] uppercase font-black text-[#bc9c33] tracking-widest leading-none">{item.category || 'NEWS'}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold leading-none">{item.date}</span>
                                                    </div>
                                                    <h4 className="text-sm font-bold text-navy-deep leading-tight group-hover:text-[#bc9c33] transition-colors line-clamp-3 mt-0">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <Link href="/news" className="text-navy-deep font-bold text-xs flex items-center gap-2 mt-8 hover:text-gold transition-colors w-full">
                                        View all news <ChevronRight size={14} />
                                    </Link>
                                </motion.div>
                            )}

                        </div>
                    </aside>
                </div>

                {/* 3. NAVIGATION (PREV/NEXT) */}
                <div className="mt-24 border-t border-slate-100 pt-8 pb-16 flex justify-between items-center px-4">
                    <div className="w-1/2 text-left">
                        {prevPost && (
                            <Link href={`/news/${prevPost.slug}`} className="group inline-flex items-center gap-2 text-navy-deep font-black text-xs tracking-widest hover:text-[#bc9c33] transition-colors">
                                <ChevronLeft size={16} className="text-navy-deep group-hover:text-[#bc9c33] transition-colors" /> Previous News
                            </Link>
                        )}
                    </div>
                    <div className="w-1/2 text-right">
                        {nextPost && (
                            <Link href={`/news/${nextPost.slug}`} className="group inline-flex items-center gap-2 text-navy-deep font-black text-xs tracking-widest hover:text-[#bc9c33] transition-colors justify-end">
                                Next News <ChevronRight size={16} className="text-navy-deep group-hover:text-[#bc9c33] transition-colors" />
                            </Link>
                        )}
                    </div>
                </div>
            </main >
        </div >
    );
}