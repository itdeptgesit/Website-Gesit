'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Calendar, Tag, Loader2,
    Clock, Users, Handshake, Heart, ShieldCheck, MessageSquare, FileText
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaLink, FaCheck } from "react-icons/fa6";
import ShareButtons from './ShareButtons';
import xss from 'xss';

function NewsDetailSkeleton() {
    return (
        <div className="bg-white min-h-screen pb-24 font-sans text-slate-800">
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
                        {/* Title Lines */}
                        <div className="h-10 w-full md:w-3/4 bg-white/20 rounded"></div>
                        <div className="h-10 w-1/2 bg-white/20 rounded mb-2"></div>
                        {/* Meta Line */}
                        <div className="flex gap-4 items-center pb-2">
                            <div className="h-3 w-16 bg-white/10 rounded"></div>
                            <div className="h-3 w-24 bg-white/10 rounded"></div>
                        </div>
                        {/* Accent Bar */}
                        <div className="w-20 h-1 bg-white/30 rounded" />
                    </div>
                </div>
            </div>

            {/* 2. MAIN LAYOUT SKELETON */}
            <div className="container mx-auto px-6 lg:px-8 max-w-4xl pt-16">
                <div className="flex flex-col space-y-12 w-full">
                    {/* Featured Media Box */}
                    <div className="w-full aspect-[16/10] bg-slate-100 rounded-[10px] border border-slate-100 shadow-sm"></div>

                    {/* Article Text Paragraphs */}
                    <div className="space-y-6">
                        <div className="h-4 w-full bg-slate-100 rounded"></div>
                        <div className="h-4 w-11/12 bg-slate-100 rounded"></div>
                        <div className="h-4 w-full bg-slate-100 rounded"></div>
                        <div className="h-4 w-10/12 bg-slate-100 rounded"></div>
                        <div className="h-4 w-8/12 bg-slate-100 rounded"></div>
                        <div className="h-4 w-full bg-slate-100 rounded"></div>
                    </div>

                    {/* Share Button Block */}
                    <div className="pt-8 border-t border-slate-100 space-y-4">
                        <div className="h-5 w-24 bg-slate-100 rounded"></div>
                        <div className="flex gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-100"></div>
                            <div className="w-9 h-9 rounded-full bg-slate-100"></div>
                            <div className="w-9 h-9 rounded-full bg-slate-100"></div>
                            <div className="w-9 h-9 rounded-full bg-slate-100"></div>
                        </div>
                    </div>

                    {/* Recent News Block */}
                    <div className="mt-16 pt-12 border-t border-slate-100">
                        <div className="flex justify-between items-end mb-8">
                            <div className="h-6 w-40 bg-slate-100 rounded"></div>
                            <div className="h-4 w-24 bg-slate-50 rounded"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col bg-white border border-slate-100 rounded-xl overflow-hidden">
                                    <div className="w-full aspect-[16/10] bg-slate-100"></div>
                                    <div className="p-6 space-y-4">
                                        <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
                                        <div className="h-4 w-full bg-slate-100 rounded"></div>
                                        <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
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
    const [isCopied, setIsCopied] = useState(false);

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

    useEffect(() => {
        if (!loading) {
            // Disable download and right-click on any video elements in content body
            const videos = document.querySelectorAll('.news-content video');
            videos.forEach(video => {
                video.setAttribute('controlsList', 'nodownload');
                video.addEventListener('contextmenu', (e) => e.preventDefault());
            });
        }
    }, [loading, newsItems]);

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

    // Find recent news (not current post)
    const recentNews = newsItems
        .filter(item => item.id !== post.id)
        .slice(0, 3);

    // Clean content to remove duplicate video tags if post has a video_url
    let cleanContent = post.content || '';
    if (post.video_url) {
        const filename = post.video_url.split('/').pop();
        if (filename) {
            const escapedFilename = filename.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const customVideoRegex = new RegExp(`<video[^>]*?>([\\s\\S]*?${escapedFilename}[\\s\\S]*?)<\\/video>|<video[^>]*?src=["']?[^"'>]*?${escapedFilename}[^"'>]*?["'][^>]*?>([\\s\\S]*?)<\\/video>`, 'gi');
            cleanContent = cleanContent.replace(customVideoRegex, '');
        }
    }

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
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl lg:text-[54px] text-white leading-[1.15] font-serif mb-6 max-w-5xl"
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap items-center gap-4 text-white text-[13px] uppercase tracking-widest font-bold mb-10"
                        >
                            <span>{post.category || 'NEWS'}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-white" />
                                <span>{post.date}</span>
                            </div>
                        </motion.div>

                        <div className="w-20 h-1 bg-[#bc9c33]" />
                    </div>
                </div>
            </section>

            {/* 2. MAIN LAYOUT (CONTENT ONLY) */}
            <main className="container mx-auto px-6 lg:px-8 max-w-4xl pt-16">
                <div className="flex flex-col">

                    {/* Content Area */}
                    <div className="w-full">

                        {/* Featured Media (Video or Image) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full aspect-[16/10] rounded-[10px] overflow-hidden mb-14 shadow-2xl bg-slate-100 ring-1 ring-slate-900/5"
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
                                            return (
                                                <video
                                                    src={cleanVideoUrl} poster={post.image_url || post.image}
                                                    controls
                                                    controlsList="nodownload"
                                                    onContextMenu={(e) => e.preventDefault()}
                                                    className="w-full h-full object-cover"
                                                />
                                            );
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
                                    dangerouslySetInnerHTML={{ __html: xss(cleanContent) }}
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
                                className="mt-[-2rem] mb-6 pt-8 border-t border-slate-100"
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

                        {/* Share to Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`mb-16 ${post.source_url ? 'pt-6' : 'pt-8 border-t border-slate-100 mt-8'}`}
                        >
                            <h4 className="text-[16px] md:text-[18px] font-bold text-[#103065] mb-4" style={{ fontFamily: "var(--font-sans)" }}>Share to</h4>
                            <div className="flex gap-3">
                                {/* Facebook */}
                                <button
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="w-[36px] h-[36px] rounded-full bg-[#103065] hover:bg-[#bc9c33] text-white flex items-center justify-center transition-colors duration-300"
                                    title="Share to Facebook"
                                >
                                    <FaFacebookF size={15} />
                                </button>
                                {/* LinkedIn */}
                                <button
                                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="w-[36px] h-[36px] rounded-full bg-[#103065] hover:bg-[#bc9c33] text-white flex items-center justify-center transition-colors duration-300"
                                    title="Share to LinkedIn"
                                >
                                    <FaLinkedinIn size={15} />
                                </button>
                                {/* X */}
                                <button
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="w-[36px] h-[36px] rounded-full bg-[#103065] hover:bg-[#bc9c33] text-white flex items-center justify-center transition-colors duration-300"
                                    title="Share to X"
                                >
                                    <FaXTwitter size={15} />
                                </button>
                                {/* Copy Link */}
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        setIsCopied(true);
                                        setTimeout(() => setIsCopied(false), 2000);
                                    }}
                                    className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors duration-300 ${isCopied ? 'bg-green-600 text-white' : 'bg-[#103065] hover:bg-[#bc9c33] text-white'}`}
                                    title={isCopied ? "Copied!" : "Copy Link"}
                                >
                                    {isCopied ? <FaCheck size={14} /> : <FaLink size={15} />}
                                </button>
                            </div>
                        </motion.div>


                        {/* Recent News Box (Moved from sidebar) */}
                        {recentNews.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="mt-16 pt-12 border-t border-slate-200"
                            >
                                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
                                    <h3 className="text-navy-deep font-black text-lg tracking-widest uppercase m-0">
                                        RECENT NEWS
                                    </h3>
                                    <Link href="/news" className="inline-flex items-center gap-2 text-navy-deep hover:text-gold font-bold text-xs tracking-widest uppercase transition-colors">
                                        View all news <ChevronRight size={14} />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
                                    {recentNews.map((item) => (
                                        <Link href={`/news/${item.slug}`} key={item.id} className="group flex flex-col bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                            <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-200">
                                                <Image
                                                    src={item.image_url || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    unoptimized
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                />
                                            </div>
                                            <div className="flex flex-col p-6 flex-1">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-[10px] uppercase font-black text-[#bc9c33] tracking-widest leading-none">{item.category || 'NEWS'}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                    <span className="text-[10px] text-slate-400 font-bold leading-none">{item.date}</span>
                                                </div>
                                                <h4 className="text-[16px] font-bold text-navy-deep leading-snug group-hover:text-[#103065] transition-colors line-clamp-3">
                                                    {item.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                            </motion.div>
                        )}

                    </div>
                </div>

            </main >
        </div >
    );
}