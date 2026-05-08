"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Loader2, ChevronLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NewsArchivePage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Trigger pagination after 10 articles

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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;
    
    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-white min-h-screen pb-24 font-sans">
      {/* 1. HERO SECTION (SOLID NAVY) */}
      <section className="w-full bg-[#103065] pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Background Logo Overlay */}
        <div className="absolute right-[-5%] bottom-[-10%] w-[40%] opacity-[0.03] pointer-events-none text-white">
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
            <Link href="/" className="text-white hover:text-[#bc9c33] transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/news" className="text-white hover:text-[#bc9c33] transition-colors">News</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/30 truncate max-w-[200px]">News Archive</span>
          </motion.nav>

          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block bg-[#bc9c33] text-white text-[10px] font-black px-3 py-1 rounded-[5px] uppercase tracking-tighter mb-6"
            >
              ARCHIVE
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl lg:text-[54px] text-white leading-[1.1] font-serif mb-8 max-w-5xl"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
            >
              News Archive
            </motion.h1>

            <div className="w-20 h-1 bg-[#bc9c33]" />
          </div>
        </div>
      </section>

      {/* 2. MAIN GRID (Premium Cards) */}
      <div className="container mx-auto px-6 max-w-7xl pt-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="w-12 h-12 text-[#BC9C33] animate-spin" />
            <p className="text-navy-deep/40 font-bold tracking-[.3em] uppercase text-[10px]">Synchronizing Archives</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto p-12">
            <p className="text-red-500 font-bold mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-navy-deep text-white rounded-full text-[11px] font-bold tracking-widest hover:bg-[#BC9C33] transition-all duration-300">
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                >
                  <Link
                    href={`/news/${item.slug || item.id}`}
                    className="flex flex-col group h-full bg-[#deebf9] rounded-[5px] overflow-hidden transition-all duration-500"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.image_url || item.image || '/images/bussines8-o86fclow0s83d4m73w4dshh7h51ssp4m6ngk248b8o.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      
                      {/* Floating Category */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#bc9c33] text-white text-[9px] font-black px-2 py-1 rounded-[3px] uppercase tracking-widest">
                          {item.category || 'News'}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col flex-1">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-[11px] font-bold text-navy-deep/40 uppercase tracking-widest mb-6">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-[#bc9c33]" />
                          {item.date || new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      <h3 className="text-[20px] md:text-[22px] text-navy-deep leading-[1.3] mb-6 group-hover:text-[#bc9c33] transition-colors line-clamp-3 font-sans font-bold">
                        {item.title}
                      </h3>
                      
                      <div className="mt-auto pt-6 border-t border-navy-deep/10 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-navy-deep/60">
                            <div className="w-6 h-6 rounded-full bg-navy-deep/5 flex items-center justify-center">
                              <User size={10} />
                            </div>
                            <span className="text-[12px] font-bold">by {item.author || 'Gesit'}</span>
                         </div>
                         <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-[#bc9c33] group-hover:text-white transition-all duration-300">
                           <ChevronRight size={16} />
                         </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Premium Pagination */}
            {totalPages > 1 && (
              <div className="mt-24 flex justify-center items-center gap-3">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border ${currentPage === 1 ? 'border-slate-100 text-slate-200 cursor-not-allowed' : 'border-slate-200 text-navy-deep hover:bg-navy-deep hover:text-white hover:border-navy-deep shadow-sm'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center gap-2">
                  {getPageNumbers().map((page, i) => (
                    <React.Fragment key={i}>
                      {page === '...' ? (
                        <span className="w-12 h-12 flex items-center justify-center text-slate-400">...</span>
                      ) : (
                        <button
                          onClick={() => paginate(page)}
                          className={`w-12 h-12 rounded-full font-black text-xs transition-all ${currentPage === page ? 'bg-navy-deep text-white shadow-xl scale-110' : 'bg-white text-navy-deep border border-slate-200 hover:border-navy-deep shadow-sm'}`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border ${currentPage === totalPages ? 'border-slate-100 text-slate-200 cursor-not-allowed' : 'border-slate-200 text-navy-deep hover:bg-navy-deep hover:text-white hover:border-navy-deep shadow-sm'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsArchivePage;

