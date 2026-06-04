'use client';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "./csr.css";

export default function CSRPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openInitiative, setOpenInitiative] = useState("Healthcare");
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const [isGalleryPaused, setIsGalleryPaused] = useState(false);
    const galleryPauseTimer = useRef(null);

    const handleGalleryEnter = () => {
        galleryPauseTimer.current = setTimeout(() => setIsGalleryPaused(true), 500);
    };
    const handleGalleryLeave = () => {
        clearTimeout(galleryPauseTimer.current);
        setIsGalleryPaused(false);
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
        "/csr/images/csr_slider_1.jpg",
        "/csr/images/HP3A763-scaled.jpg",
        "/csr/images/HP3A783-scaled.jpg",
    ];

    /* ================= GALLERY IMAGES ================= */
    const csrGalleryImages = [
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
            title: "Environment & Cultural Outreach",
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
                        "Distributing ventilators and PPE to 128 Hospitals across in Indonesia",
                        "Distributing food aid to people affected by COVID in 5 provinces in Indonesia"
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
            title: "Environment & Cultural Outreach",
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
                    subtitle: "Cultural Outreach",
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
                        "Providing over 300 university scholarships per year"
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
                                <strong className="font-extrabold">Environment &amp; Cultural Outreach,</strong> and <strong className="font-extrabold">Education.</strong>
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
                                                className="qodef-m-title !text-white"
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
                                                                        {group.text}
                                                                        {group.sub && (
                                                                            <div className="flex flex-col m-0 p-0">
                                                                                {group.sub.map((subItem, j) => (
                                                                                    <span key={j} className="text-[16px] md:text-[19px] text-[#555] font-normal leading-[28px] block m-0 p-0">
                                                                                        {subItem}
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
            <section className="gs-csr-gallery-section py-24 bg-white overflow-hidden">
                <div className="relative w-full">
                    <div className="gs-csr-gallery-window flex overflow-hidden relative">
                        <div
                            className="gs-csr-gallery-track flex gap-6 md:gap-10 px-4 py-6 md:py-12 items-center"
                            style={{
                                width: "fit-content",
                                animationName: csrGalleryImages.length > 0 ? "gs-gallery-scroll" : "none",
                                animationDuration: csrGalleryImages.length > 0 ? `${csrGalleryImages.length * 6}s` : "0s",
                                animationTimingFunction: "linear",
                                animationIterationCount: "infinite",
                                animationPlayState: isGalleryPaused ? "paused" : "running",
                            }}
                        >
                            {[...csrGalleryImages, ...csrGalleryImages].map((src, index) => (
                                <motion.div
                                    key={index}
                                    className="gs-csr-gallery-card w-[280px] h-[190px] md:w-[450px] md:h-[300px] shrink-0 rounded-[5px] overflow-hidden transition-all duration-700 group relative"
                                    whileHover={{ y: -10, scale: 1.025 }}
                                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                    onMouseEnter={handleGalleryEnter}
                                    onMouseLeave={handleGalleryLeave}
                                >
                                    <img
                                        src={src}
                                        alt={`CSR Gallery ${index}`}
                                        className="w-full h-full object-cover grayscale-[15%] scale-[1.01] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2200ms] ease-out"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#103065]/45 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
