'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Calendar, Tag, Loader2,
    Facebook, Linkedin, Link as LinkIcon, Clock, Users,
    Handshake, Heart, ShieldCheck, MessageSquare
} from "lucide-react";
import ShareButtons from './ShareButtons';

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
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-navy-deep px-6 pt-20">
                <Loader2 className="animate-spin text-navy-deep" size={40} />
            </div>
        );
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

    return (
        <div className="bg-white min-h-screen pb-24 font-sans text-slate-800 selection:bg-gold/30 selection:text-navy-deep">

            {/* 1. HERO SECTION (SOLID NAVY) */}
            <section className="w-full bg-[#103065] pt-40 pb-20 px-6 relative overflow-hidden">
                {/* Background Logo Overlay */}
                <div className="absolute right-[-5%] bottom-[-10%] w-[40%] opacity-[0.03] pointer-events-none">
                    <img src="/logo-gesit.png" alt="" className="w-full h-full object-contain brightness-0 invert" />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white mb-8 font-bold">
                        <Link href="/" className="text-white hover:text-gold transition-colors">Home</Link>
                        <span className="text-white/40">/</span>
                        <Link href="/news" className="text-white hover:text-gold transition-colors">News</Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white/30 truncate max-w-[200px]">{post.title}</span>
                    </nav>

                    <div className="max-w-4xl">
                        <span className="inline-block bg-[#bc9c33] text-white text-[10px] font-black px-3 py-1 rounded-[5px] uppercase tracking-tighter mb-6">
                            {post.category || 'NEWS'}
                        </span>

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
                                        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
                                        const ytMatch = post.video_url.match(ytRegex);
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
                                        if (post.video_url.match(/\.(mp4|webm|ogg)$/i)) {
                                            return <video src={post.video_url} controls className="w-full h-full object-cover" />;
                                        }
                                        // Fallback if URL is set but not recognized as video
                                        return (
                                            <div className="flex items-center justify-center h-full text-white/50 text-sm italic p-10 text-center">
                                                Video link detected but format not supported for embed.<br />
                                                <a href={post.video_url} target="_blank" className="text-gold underline mt-2 block">{post.video_url}</a>
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
                        <div className="prose prose-lg max-w-none text-slate-700 text-[16px] md:text-[18px] leading-[1.8] news-content mb-16" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
                            {post.content ? (
                                <div
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            ) : (
                                <div className="text-slate-400 italic py-10 border-y border-slate-100 text-center">
                                    Content is not yet available for this article.
                                </div>
                            )}
                        </div>


                    </div>

                    {/* Right Column: Sticky Metadata Sidebar */}
                    <aside className="lg:w-1/3 xl:w-1/4">
                        <div className="sticky-sidebar space-y-10">

                            {/* Meta Info Box */}
                            <div className="bg-slate-50 border border-slate-100 rounded-[5px] p-8 space-y-6 shadow-sm">
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

                                <div className="flex items-center gap-4 text-slate-600 border-b border-slate-100 pb-6">
                                    <Clock className="text-[#bc9c33]" size={20} />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Reading Time</span>
                                        <span className="text-sm font-bold text-navy-deep">2 min read</span>
                                    </div>
                                </div>

                                {/* Share Section */}
                                <div className="pt-2">
                                    <h4 className="text-[11px] font-black text-navy-deep uppercase tracking-widest mb-4">Share Article</h4>
                                    <div className="flex gap-3">
                                        <ShareButtons title={post.title} slug={post.slug} />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </aside>
                </div>

                {/* 3. NAVIGATION (PREV/NEXT) */}
                <div className="mt-24 border-t border-slate-100 pt-16">
                    <div className="flex items-center justify-between gap-4 mb-10 text-navy-deep font-black uppercase text-xs tracking-widest px-4">
                        <div className="flex items-center gap-2"><ChevronLeft size={16} /> Prev News</div>
                        <div className="flex items-center gap-2">Next News <ChevronRight size={16} /></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Prev Article */}
                        <div className="w-full">
                            {prevPost ? (
                                <Link href={`/news/${prevPost.slug}`} className="flex gap-5 p-5 bg-white border border-slate-100 rounded-2xl hover:border-gold hover:shadow-xl transition-all group overflow-hidden h-full">
                                    <div className="w-1/3 aspect-square shrink-0 rounded-xl overflow-hidden relative bg-slate-50">
                                        <Image src={prevPost.image_url || prevPost.image || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-700" shapes="120px" />
                                    </div>
                                    <div className="flex flex-col justify-center gap-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-[#bc9c33] uppercase tracking-tighter">{prevPost.category || 'CSR'}</span>
                                            <span className="text-[10px] text-slate-400 font-bold">{prevPost.date}</span>
                                        </div>
                                        <h4 className="text-sm md:text-base font-bold text-navy-deep group-hover:text-gold transition-colors line-clamp-3 leading-tight">{prevPost.title}</h4>
                                    </div>
                                </Link>
                            ) : (
                                <div className="h-full flex items-center justify-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs italic">Awal dari kabar kami.</div>
                            )}
                        </div>

                        {/* Next Article */}
                        <div className="w-full">
                            {nextPost ? (
                                <Link href={`/news/${nextPost.slug}`} className="flex flex-row-reverse gap-5 p-5 bg-white border border-slate-100 rounded-2xl hover:border-gold hover:shadow-xl transition-all group overflow-hidden h-full">
                                    <div className="w-1/3 aspect-square shrink-0 rounded-xl overflow-hidden relative bg-slate-50">
                                        <Image src={nextPost.image_url || nextPost.image || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-700" shapes="120px" />
                                    </div>
                                    <div className="flex flex-col justify-center gap-2 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <span className="text-[10px] font-black text-[#bc9c33] uppercase tracking-tighter">{nextPost.category || 'NEWS'}</span>
                                            <span className="text-[10px] text-slate-400 font-bold">{nextPost.date}</span>
                                        </div>
                                        <h4 className="text-sm md:text-base font-bold text-navy-deep group-hover:text-gold transition-colors line-clamp-3 leading-tight">{nextPost.title}</h4>
                                    </div>
                                </Link>
                            ) : (
                                <div className="h-full flex items-center justify-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs italic">Kabar terbaru telah ditampilkan.</div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
