'use client';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, FreeMode } from "swiper/modules";
import { Plus, Minus, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "./csr.css";

const renderTextWithLinks = (text) => {
    if (typeof text !== "string") return text;
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
            <a
                key={match.index}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#BC9C33] hover:underline inline-flex items-center gap-1 font-medium"
            >
                {match[1]}
            </a>
        );
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
};

export default function CSRPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openInitiative, setOpenInitiative] = useState("Healthcare");
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const [isGalleryPaused, setIsGalleryPaused] = useState(false);
    const galleryPauseTimer = useRef(null);
    const swiperRef = useRef(null);
    const isLightboxOpenRef = useRef(false);

    const handleGalleryEnter = () => {
        if (isLightboxOpenRef.current) return;
        galleryPauseTimer.current = setTimeout(() => {
            setIsGalleryPaused(true);
            if (swiperRef.current && swiperRef.current.autoplay) swiperRef.current.autoplay.pause();
        }, 100);
    };
    const handleGalleryLeave = () => {
        clearTimeout(galleryPauseTimer.current);
        setIsGalleryPaused(false);
        if (isLightboxOpenRef.current) return;
        if (swiperRef.current && swiperRef.current.autoplay) swiperRef.current.autoplay.resume();
    };

    const openLightbox = (index) => {
        isLightboxOpenRef.current = true;
        setLightboxIndex(index);
        clearTimeout(galleryPauseTimer.current);
        if (swiperRef.current && swiperRef.current.autoplay) swiperRef.current.autoplay.pause();
    };

    const closeLightbox = () => {
        isLightboxOpenRef.current = false;
        setLightboxIndex(null);
        if (swiperRef.current && swiperRef.current.autoplay) swiperRef.current.autoplay.resume();
    };

    const nextLightboxImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev + 1) % csrGalleryImages.length);
    };

    const prevLightboxImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev - 1 + csrGalleryImages.length) % csrGalleryImages.length);
    };

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

    useEffect(() => {
        setIsMounted(true);
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

    /* ================= HERO IMAGES ================= */
    const heroImages = [
        "/csr/images/csr_slider_1.webp",
        "/csr/images/HP3A763-scaled.webp",
        "/csr/images/HP3A783-scaled.webp",
    ];

    /* ================= GALLERY IMAGES ================= */
    const csrGalleryImages = [
        "/csr/gallery/gallery21.webp",
        "/csr/gallery/gallery22.webp",
        "/csr/gallery/gallery1.webp",
        "/csr/gallery/gallery2.webp",
        "/csr/gallery/gallery3.webp",
        "/csr/gallery/gallery4.webp",
        "/csr/gallery/gallery5.webp",
        "/csr/gallery/gallery6.webp",
        "/csr/gallery/gallery7.webp",
        "/csr/gallery/gallery8.webp",
        "/csr/gallery/gallery9.webp",
        "/csr/gallery/gallery10.webp",
        "/csr/gallery/gallery11.webp",
        "/csr/gallery/gallery12.webp",
        "/csr/gallery/gallery13.webp",
        "/csr/gallery/gallery14.webp",
        "/csr/gallery/gallery15.webp",
        "/csr/gallery/gallery16.webp",
        "/csr/gallery/gallery17.webp",
        "/csr/gallery/gallery18.webp",
        "/csr/gallery/gallery19.webp",
        "/csr/gallery/gallery20.webp",
    ];

    const focusAreas = [
        {
            title: "Healthcare",
            desc: "We provide initiatives that ensure proper medical treatment and aid for the sick and injured. Our focus goes beyond donations; we get involved in the causes that help improve the infrastructures needed to support healthcare.",
            image: "/csr/Healthcare.webp"
        },
        {
            title: "Social & Environment",
            desc: "We provide cultural training, concerts, religious infrastructure, and enforce diversity in our society, but most importantly we prioritize initiatives that improve the environments in which we operate everyday.",
            image: "/csr/Environment-Cultural-Outreach.webp"
        },
        {
            title: "Education",
            desc: "We provide hands-on opportunities for disadvantaged children through various initiatives, such as scholarships. Most notably, we ensure that educational facilities are available to the people that we believe need it most.",
            image: "/csr/Education.webp"
        }
    ];

    const initiatives = [
        {
            title: "Healthcare",
            content: [
                {
                    subtitle: "Pandemic",
                    items: [
                        "Distributing more than 200 ventilators and thousands of PPE to more than 130 hospitals across Indonesia",
                        "Supporting Covid Vaccination"
                    ]
                },
                {
                    subtitle: "Natural Disaster",
                    items: [
                        "Rebuilding healthcare facilities and hospitals",
                        "Donating food and other resources to victims of natural disasters, such as the volcanic eruption at Mount Merapi, Mentawai, the landslide at Puncak and the floods in Jakarta"
                    ]
                },
                {
                    subtitle: "Medical Equipment",
                    items: [
                        "Donating speedboat ambulances in West Kalimantan",
                        "Providing ambulances for DKI Jakarta Region, in partnership with Red Cross Indonesia",
                        "Contributed in the construction of YPAC (Yayasan Penyandang Anak Cacat) by providing Aluminum Profile"
                    ]
                }
            ]
        },
        {
            title: "Social & Environment",
            content: [
                {
                    subtitle: "Environment",
                    items: [
                        "Developing water projects and clean water facilities in remote areas",
                        "Creating and maintaining roads and open road access in some districts in Indonesia",
                        "Collaborating with Yayasan Kebun Raya Indonesia in the conservation of endangered and rare botanical species in Kebun Raya Cibodas and Kebun Raya Bedugul, Bali",
                        "Planting 1,000 trees in West Kalimantan Deforestation Areas"
                    ]
                },
                {
                    subtitle: "Social Outreach",
                    items: [
                        "Holding charitable concerts in partnership with foreign embassies to gather donations for disaster victims",
                        "Contributed to the construction of a mosque in Ciloto-Puncak as well as renovation of local churches and temples"
                    ]
                }
            ]
        },
        {
            title: "Education",
            content: [
                {
                    subtitle: "",
                    items: [
                        "Building, renovating, and providing school facilities for:",
                        "- North Sumatera: Sekolah Mitra Inalum",
                        "- Jakarta: Down Syndrome & Deaf School of Cempaka Putih",
                        "- Jakarta: School of Yayasan Penyandang Anak Cacat",
                        "- Fujian: Primary, Secondary School, Sport and Library in Normal University",
                        "Providing over 300 university scholarships per year",
                        "Supporting online classes to reach students and children in frontier area",
                        "Train and equip teachers with improved teaching skills.",
                        "Supporting Program Pendidikan Kesetaraan Paket C"
                    ]
                }
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* 1. Cinematic Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Fallback Hero Image (Server-side rendered for instant loading) */}
                    {!isMounted && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                            <Image
                                src={heroImages[0]}
                                alt="CSR Hero"
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
                            speed={2000}
                            autoplay={{ delay: 6000, disableOnInteraction: false }}
                            navigation={{
                                prevEl,
                                nextEl,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevEl;
                                swiper.params.navigation.nextEl = nextEl;
                            }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            loop={true}
                            className="h-full w-full"
                        >
                            {heroImages.map((src, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative h-full w-full overflow-hidden">
                                        <Image
                                            src={src}
                                            alt={`CSR Hero ${index + 1}`}
                                            fill
                                            sizes="100vw"
                                            style={{
                                                objectFit: 'cover',
                                                transformOrigin: 'center',
                                                transform: index === activeIndex ? "scale(1.15)" : "scale(1.05)",
                                                transition: "transform 10000ms ease-out"
                                            }}
                                            priority={index === 0}
                                            {...(index === 0 ? { fetchPriority: "high", loading: "eager" } : {})}
                                        />
                                        {/* Standard Hero Overlay */}
                                        <div className="gesit-hero-overlay" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                    {/* Gold Progress Bar - TOP */}
                    <div className="absolute top-0 left-0 w-full h-[4px] bg-black/20 z-40">
                        <motion.div
                            key={activeIndex}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 6, ease: "linear" }}
                            style={{ originX: 0 }}
                            className="h-full bg-[#BC9C33]"
                        />
                    </div>
                </div>

                <div className="gesit-hero-overlay z-10" />

                {/* Hero title - Outside for instant display */}
                <motion.h1
                    className="gs-hero-title gs-csr-hero-title z-20"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    style={{ lineHeight: "1.2" }}
                >
                    Corporate <br className="md:hidden" />Social<br className="md:hidden" /> Responsibility
                </motion.h1>

                {/* Navigation arrows */}
                <div className="gs-hero-nav hidden md:flex">
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
            </section>

            {/* ================= OVERVIEW ================= */}
            <section className="bg-[#e3eaf4] gs-csr-overview-section">
                <div className="max-w-[824px] w-full mx-auto px-[40px] lg:px-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:pl-0"
                    >
                        {/* Heading - Forced breaks to match your reference image exactly */}
                        <div className="mb-5">
                            <h3 className="text-[22px] md:text-[36px] lg:text-[36px] font-normal leading-snug md:leading-[50px]" style={{
                                color: '#103065',
                                fontFamily: 'Lora, serif',
                                margin: 0,
                                textAlign: 'left'
                            }}>
                                Creating a positive effect on lives and communities <br className="hidden lg:block" />
                                by adding the most value and making a significant <br className="hidden lg:block" />
                                and lasting impact through Gesit Foundation.
                            </h3>
                        </div>

                        {/* Description - Bold focus areas */}
                        <div style={{ paddingLeft: '24px', borderLeft: '2px solid #BC9C33' }}>
                            <p className="text-[16px] md:text-[24px] lg:text-[23px] leading-relaxed md:leading-normal" style={{
                                color: '#103065',
                                fontFamily: "var(--font-sans)",
                                fontWeight: 400,
                                margin: 0
                            }}>
                                Our social investment programs focus on three areas: <strong className="font-extrabold">Healthcare, </strong><br className="hidden lg:block" />
                                <strong className="font-extrabold">Social &amp; Environment,</strong> and <strong className="font-extrabold">Education.</strong>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section suppressHydrationWarning className="bg-[#103065] py-16 md:py-24 gs-csr-focus-section">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] justify-items-center">
                        {focusAreas.map((val, idx) => (
                            <div key={val.title} className="w-full max-w-[383px] flex flex-col relative group">
                                <motion.div
                                    className="w-full flex flex-col flex-1"
                                    variants={staggerContainer}
                                    initial="initial"
                                    whileInView="whileInView"
                                    viewport={{ once: true }}
                                >
                                    <div className="w-full flex flex-col relative">
                                        <div className="qodef-m-image relative rounded-[5px] overflow-hidden">
                                            <Image
                                                src={val.image}
                                                alt={val.title}
                                                fill
                                                sizes="383px"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        {/* White Connector Line Animation */}
                                        <div className="qodef-location-info-line-animated" />

                                        {/* 36px Spacer */}
                                        <div className="h-[36px] w-full flex-none" />

                                        <div className="qodef-m-content" style={{ backgroundColor: '#BC9C33' }}>
                                            <motion.h4
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6 }}
                                                className="qodef-m-title !text-white min-h-[0px] md:min-h-[64px] lg:min-h-[72px]"
                                            >
                                                {val.title}
                                            </motion.h4>
                                            <motion.p
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.15 }}
                                                className="qodef-m-text !text-white !m-0"
                                            >
                                                {val.desc}
                                            </motion.p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ================= INITIATIVES ================= */}
            <section className="py-20 bg-white">
                <div className="mx-auto w-full px-6 lg:px-0" style={{ maxWidth: '1200px' }}>
                    <h2
                        className="text-center mb-12 text-[#000] text-[26px] md:text-[44px]"
                        style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
                    >
                        Our CSR Initiatives & Programs
                    </h2>

                    <div className="flex flex-col">
                        {initiatives.map((initiative, index) => (
                            <div key={initiative.title} style={{ borderBottom: index !== initiatives.length - 1 ? '1px solid #E0E0E0' : 'none' }}>
                                <button
                                    onClick={() =>
                                        setOpenInitiative(
                                            openInitiative === initiative.title ? null : initiative.title
                                        )
                                    }
                                    className="w-full py-6 flex items-center gap-6 text-left transition-colors group"
                                >
                                    <motion.div
                                        className="flex items-center justify-center shrink-0"
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            border: '1px solid #BC9C33',
                                            backgroundColor: openInitiative === initiative.title ? '#FFFFFF' : '#BC9C33',
                                            color: openInitiative === initiative.title ? '#BC9C33' : '#FFFFFF'
                                        }}
                                        animate={{ rotate: openInitiative === initiative.title ? 180 : 0 }}
                                        transition={{ duration: 0.4, ease: "backOut" }}
                                    >
                                        {openInitiative === initiative.title ? <Minus size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                                    </motion.div>
                                    <span className="text-[18px] md:text-[24px] text-[#000]" style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>{initiative.title}</span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {openInitiative === initiative.title && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden -mt-2 relative z-0"
                                        >
                                            <div className="pl-8 md:pl-16 pr-0" style={{ paddingTop: '0px', paddingBottom: '22px' }}>
                                                {initiative.content.map((block, index) => (
                                                    <div key={block.subtitle || index} className={index === 0 ? "mt-0" : "mt-8"}>
                                                        {block.subtitle && (
                                                            <h4 className="text-[16px] md:text-[18px] font-bold text-[#555] mb-0 !mt-0 pl-0 leading-[27px]" style={{ fontFamily: 'Lora, serif' }}>
                                                                {block.subtitle}
                                                            </h4>
                                                        )}
                                                        <ul className="list-disc list-outside pl-5 m-0 space-y-0">
                                                            {(() => {
                                                                const groupedItems = [];
                                                                block.items.forEach(item => {
                                                                    if (item.startsWith("- ")) {
                                                                        if (groupedItems.length > 0) {
                                                                            if (!groupedItems[groupedItems.length - 1].sub) groupedItems[groupedItems.length - 1].sub = [];
                                                                            groupedItems[groupedItems.length - 1].sub.push(item);
                                                                        }
                                                                    } else {
                                                                        groupedItems.push({ text: item });
                                                                    }
                                                                });
                                                                return groupedItems.map((group, i) => (
                                                                    <li key={i} className="list-outside text-[16px] md:text-[19px] text-[#555] font-normal leading-[28px]" style={{ fontFamily: "var(--font-sans)" }}>
                                                                        {renderTextWithLinks(group.text)}
                                                                        {group.sub && (
                                                                            <div className="flex flex-col m-0 p-0">
                                                                                {group.sub.map((subItem, j) => (
                                                                                    <span key={j} className="text-[16px] md:text-[19px] text-[#555] font-normal leading-[28px] block m-0 p-0">
                                                                                        {renderTextWithLinks(subItem)}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </li>
                                                                ));
                                                            })()}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= SMOOTH INFINITE SCROLL GALLERY ================= */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="gs-csr-gallery-section py-24 bg-white overflow-hidden"
            >
                <style jsx global>{`
                    .gs-continuous-swiper .swiper-wrapper {
                        transition-timing-function: linear !important;
                    }
                `}</style>
                <div className="relative w-full">
                    <div className="gs-csr-gallery-window flex overflow-hidden relative">
                        <Swiper
                            modules={[Autoplay, FreeMode]}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            spaceBetween={24}
                            breakpoints={{
                                768: { spaceBetween: 40 }
                            }}
                            slidesPerView="auto"
                            loop={true}
                            freeMode={true}
                            speed={6000}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: false
                            }}
                            className="gs-continuous-swiper !px-4 !py-6 md:!py-12"
                        >
                            {[...csrGalleryImages, ...csrGalleryImages].map((src, index) => (
                                <SwiperSlide key={index} className="!w-auto">
                                    <motion.div
                                        className="gs-csr-gallery-card w-[280px] h-[190px] md:w-[450px] md:h-[300px] shrink-0 rounded-[5px] overflow-hidden transition-all duration-700 group relative cursor-pointer"
                                        whileHover={{ y: -10, scale: 1.025 }}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        onMouseEnter={handleGalleryEnter}
                                        onMouseLeave={handleGalleryLeave}
                                        onClick={() => openLightbox(index % csrGalleryImages.length)}
                                    >
                                        <img
                                            src={src}
                                            alt={`CSR Gallery ${index}`}
                                            className="w-full h-full object-cover grayscale-[15%] scale-[1.01] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2200ms] ease-out pointer-events-none"
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#103065]/45 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </motion.section>

            {/* ================= LIGHTBOX ================= */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/95 flex items-center justify-center backdrop-blur-md"
                        style={{ zIndex: 999999 }}
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
                            onClick={closeLightbox}
                        >
                            <X size={36} />
                        </button>

                        <button
                            className="absolute left-1 md:left-10 text-white/50 hover:text-white transition-colors z-50 p-2 md:p-4"
                            onClick={prevLightboxImage}
                        >
                            <ChevronLeft size={48} strokeWidth={1.5} className="w-10 h-10 md:w-12 md:h-12" />
                        </button>

                        <div className="relative w-full max-w-[95vw] h-[80vh] md:max-w-[80vw] md:h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <motion.img
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                src={csrGalleryImages[lightboxIndex]}
                                alt={`Featured Story ${lightboxIndex + 1}`}
                                className="max-w-full max-h-full object-contain shadow-2xl"
                            />

                            <div className="absolute bottom-[-50px] left-0 right-0 text-center pointer-events-none">
                                <p className="text-white/80 text-[16px] md:text-lg m-0" style={{ fontFamily: 'Lora, serif' }}>
                                    Featured Story {lightboxIndex + 1} of {csrGalleryImages.length}
                                </p>
                            </div>
                        </div>

                        <button
                            className="absolute right-1 md:right-10 text-white/50 hover:text-white transition-colors z-50 p-2 md:p-4"
                            onClick={nextLightboxImage}
                        >
                            <ChevronRight size={48} strokeWidth={1.5} className="w-10 h-10 md:w-12 md:h-12" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
