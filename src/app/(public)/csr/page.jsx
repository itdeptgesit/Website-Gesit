'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const textVariant = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
    initial: {},
    whileInView: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const CSRPage = () => {
    const [openInitiative, setOpenInitiative] = useState("Healthcare");

    /* ================= HERO IMAGES ================= */
    const heroSlides = [
        { image: "/csr/cover1.jpeg", title: "Gesit Foundation" },
        { image: "/csr/cover2.jpeg", title: "Healthcare & Education" },
        { image: "/csr/cover3.jpeg", title: "Community Development" },
    ];

    /* ================= GALLERY IMAGES ================= */
    const csrGalleryImages = [
        "/csr/gallery/gallery1.jpeg",
        "/csr/gallery/gallery2.jpeg",
        "/csr/gallery/gallery3.jpeg",
        "/csr/gallery/gallery4.jpeg",
        "/csr/gallery/gallery5.jpeg",
        "/csr/gallery/gallery6.jpeg",
        "/csr/gallery/gallery7.jpeg",
        "/csr/gallery/gallery8.jpeg",
        "/csr/gallery/gallery9.jpeg",
        "/csr/gallery/gallery10.jpeg",
        "/csr/gallery/gallery11.jpeg",
        "/csr/gallery/gallery12.jpg",
        "/csr/gallery/gallery13.jpg",
        "/csr/gallery/gallery14.jpg",
        "/csr/gallery/gallery15.jpg",
        "/csr/gallery/gallery16.jpg",
        "/csr/gallery/gallery17.jpg",
        "/csr/gallery/gallery18.jpg",
        "/csr/gallery/gallery19.jpg",
        "/csr/gallery/gallery20.jpg",
    ];

    /* ── Swiper refs for nav buttons ── */
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

    const focusAreas = [
        {
            title: "Healthcare",
            desc: "We provide initiatives that ensure proper medical treatment and aid for the sick and injured. Our focus goes beyond donations; we get involved in the causes that help improve the infrastructures needed to support healthcare.",
            image: "/csr/Healthcare.jpeg"
        },
        {
            title: "Environment & Cultural Outreach",
            desc: "We provide cultural training, concerts, religious infrastructure, and enforce diversity in our society, but most importantly we prioritize initiatives that improve the environments in which we operate everyday.",
            image: "/csr/Environment-Cultural-Outreach.jpeg"
        },
        {
            title: "Education",
            desc: "We provide hands-on opportunities for disadvantaged children through various initiatives, such as scholarships. Most notably, we ensure that educational facilities are available to the people that we believe need it most.",
            image: "/csr/Education.jpeg"
        }
    ];

    const initiatives = [
        {
            id: "healthcare",
            title: "Healthcare",
            content: [
                {
                    id: "healthcare-pandemic",
                    subtitle: "Pandemic",
                    items: [
                        "Participating in COVID control and distributing vaccines.",
                        "Distributing food aid to people affected by COVID in 5 provinces in Indonesia"
                    ]
                },
                {
                    id: "healthcare-disaster",
                    subtitle: "Natural Disaster",
                    items: [
                        "Rebuilding healthcare facilities and hospitals",
                        "Donating food and other resources to victims of natural disasters, such as the volcanic eruption at Mount Merapi, Mentawai, the landslide at Puncak and the floods in Jakarta"
                    ]
                },
                {
                    id: "healthcare-equipment",
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
            id: "environment",
            title: "Environment & Cultural Outreach",
            content: [
                {
                    id: "env-water",
                    subtitle: "Environment",
                    items: [
                        "Developing water projects and clean water facilities in remote areas",
                        "Creating and maintaining roads and open road access in some districts in Indonesia",
                        "Collaborating with Yayasan Kebun Raya Indonesia in the conservation of endangered and rare botanical species in Kebun Raya Cibodas and Kebun Raya Bedugul, Bali",
                        "Planting 1,000 trees in West Kalimantan Deforestation Areas"
                    ]
                },
                {
                    id: "env-culture",
                    subtitle: "Cultural Outreach",
                    items: [
                        "Holding charitable concerts in partnership with foreign embassies to gather donations for disaster victims",
                        "Contributed to the construction of a mosque in Ciloto-Puncak as well as renovation of local churches and temples"
                    ]
                }
            ]
        },
        {
            id: "education",
            title: "Education",
            content: [
                {
                    id: "edu-facilities",
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

            <section className="gs-hero-section" style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                {isMounted && (
                    <>
                        <Swiper
                            modules={[Autoplay, Navigation, EffectFade]}
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
                            {heroSlides.map((slide, idx) => (
                                <SwiperSlide key={idx} style={{ position: "relative", overflow: "hidden" }}>
                                    <Image
                                        src={slide.image}
                                        alt="CSR Hero"
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                            transform: idx === activeIdx ? "scale(1.15)" : "scale(1.05)",
                                            transition: "transform 10000ms ease-out"
                                        }}
                                        priority={idx === 0}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="gesit-hero-overlay" />


                        {/* CSR Static Title */}
                        <motion.div
                            className="gs-hero-title"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
                            Corporate Social Responsibility
                        </motion.div>

                        {/* Navigation arrows (hidden on mobile via mobile-hidden) */}
                        <div className="gs-hero-nav hidden md:flex">
                            <button
                                ref={(node) => setPrevEl(node)}
                                className="gs-prev-csr"
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
                                className="gs-next-csr"
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

            {/* ================= OVERVIEW ================= */}
            <section className="py-[50px] md:py-[80px]" style={{ backgroundColor: '#e3eaf4' }}>
                <div className="elementor-container gs-overview-container">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Heading */}
                        <div style={{ margin: '0 0 15px', padding: 0 }}>
                            <motion.h2 variants={textVariant} className="gs-overview-heading" style={{
                                color: '#103065',
                                fontFamily: 'Lora, Georgia, serif',
                                fontWeight: 400,
                                textAlign: 'left',
                                margin: 0
                            }}>
                                Creating a positive effect on lives and communities
                                by adding the most value and making a significant
                                and lasting impact through Gesit Foundation.
                            </motion.h2>
                        </div>

                        {/* Description with Left Border */}
                        <motion.div
                            variants={textVariant}
                            className="gs-overview-border-box"
                            style={{
                                padding: '0 0 0 25px',
                                borderLeft: '2px solid #BC9C33',
                                textAlign: 'left'
                            }}>
                            <p className="gs-overview-body" style={{
                                color: '#103065',
                                fontFamily: "var(--font-source-sans), sans-serif",
                                fontWeight: 400,
                                margin: 0
                            }}>
                                Our social investment programs focus on three areas where we believe Gesit will add the most value and make a significant and lasting impact: <strong className="font-extrabold">Healthcare,</strong> <strong className="font-extrabold">Environment & Cultural Outreach,</strong> and <strong className="font-extrabold">Education.</strong>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ================= FOCUS AREAS ================= */}
            <section className="py-16 md:py-32 bg-navy-deep">
                <div className="container mx-auto px-6 md:px-10 lg:px-12 w-full max-w-[1350px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10 w-full mx-auto">
                        {focusAreas.map((area, index) => (
                            <motion.div
                                key={area.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover="hover"
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="relative group flex flex-col items-center h-full"
                            >
                                {/* Top Image Section */}
                                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[5px] shadow-2xl shrink-0">
                                    <Image
                                        src={area.image}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                        alt={area.title}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>

                                {/* Connecting Line Spacer & Interactive Drop Animation */}
                                <div className="relative h-[45px] w-full flex justify-center shrink-0 z-40">
                                    {/* Base static connecting line - Terhubung sempurna dari gambar ke kotak dan masuk ke p-10 */}
                                    <div className="absolute top-[-25px] h-[110px] w-[1px] bg-white/30 z-20 pointer-events-none overflow-hidden">
                                        {/* Pure CSS Flawless Hover Shimmer */}
                                        <div className="card-hover-line"></div>
                                    </div>
                                </div>

                                {/* Bottom Info Box - Desktop Left Aligned */}
                                <div className="w-full bg-[#BC9C33] pt-10 pb-10 px-8 xl:px-10 text-left shadow-xl relative z-10 min-h-[220px] flex flex-col justify-start items-start rounded-[5px] flex-1">
                                    {/* Title Wrapper to guarantee exact equal height and avoid margin collapse */}
                                    <div className="w-full h-[90px] flex flex-col justify-start">
                                        <h3 className="text-white text-2xl font-serif leading-tight m-0 pb-2" style={{ fontFamily: 'Georgia, serif' }}>{area.title}</h3>
                                    </div>
                                    <p className="text-white text-[15px] font-normal leading-[1.7] m-0 w-full" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
                                        {area.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= INITIATIVES ================= */}
            <section className="pt-4 md:pt-16 pb-24 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.h2
                        variants={textVariant}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="text-center mb-5 md:mb-10 text-[#000] text-[24px] md:text-[36px]"
                        style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
                    >
                        Our CSR Initiatives & Programs
                    </motion.h2>

                    <div className="flex flex-col space-y-0">
                        {initiatives.map((initiative) => (
                            <div key={initiative.title} id={initiative.id} className="w-full border-t border-slate-300 last:border-b scroll-mt-24">
                                <button
                                    onClick={() =>
                                        setOpenInitiative(
                                            openInitiative === initiative.title ? null : initiative.title
                                        )
                                    }
                                    className="w-full pt-8 pb-1 flex items-center gap-6 text-left transition-all bg-transparent hover:bg-slate-50/50 group border-none"
                                >
                                    {/* Icon Container */}
                                    <div className={`w-10 h-10 rounded-full border border-[#BC9C33] flex items-center justify-center shrink-0 transition-all duration-300 ${openInitiative === initiative.title ? 'bg-white text-[#BC9C33]' : 'bg-[#BC9C33] text-white shadow-md'}`}>
                                        {openInitiative === initiative.title ? <Minus size={22} strokeWidth={1.5} /> : <Plus size={22} strokeWidth={1.5} />}
                                    </div>

                                    {/* Title */}
                                    <span className="text-[20px] md:text-[26px] text-[#222]" style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>
                                        {initiative.title}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {openInitiative === initiative.title && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-[4rem] md:pl-[5.5rem] pr-6 md:pr-10 pb-6 pt-0">
                                                {initiative.content.map((block, idx) => (
                                                    <div key={idx} className="mb-5 last:mb-0">
                                                        {block.subtitle && (
                                                            <h4 style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 700, color: '#444', fontSize: '18px', letterSpacing: '0.3px', marginBottom: '8px' }}>
                                                                {block.subtitle}
                                                            </h4>
                                                        )}
                                                        <ul className="space-y-1.5">
                                                            {block.items.map((item, i) => {
                                                                const isSubItem = item.startsWith("- ");
                                                                return (
                                                                    <li key={i} className={`flex items-start gap-2 text-[17px] font-normal leading-relaxed ${isSubItem ? 'pl-8' : ''}`} style={{ fontFamily: "'Source Sans Pro', sans-serif", color: '#444' }}>
                                                                        {!isSubItem ? (
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#444] mt-[10px] shrink-0" />
                                                                        ) : null}
                                                                        <span className="flex-1 text-[#444]" style={{ color: '#444' }}>{item}</span>
                                                                    </li>
                                                                );
                                                            })}
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
            <section className="py-24 bg-white overflow-hidden">
                <div className="relative w-full">
                    <div className="flex overflow-hidden relative">
                        <motion.div
                            className="flex gap-12 px-4 py-12 items-center"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                ease: "linear",
                                duration: 180,
                                repeat: Infinity,
                            }}
                            style={{ width: "fit-content" }}
                        >
                            {[...csrGalleryImages, ...csrGalleryImages].map((src, index) => (
                                <div
                                    key={index}
                                    className="w-[450px] h-[300px] shrink-0 rounded-[5px] overflow-hidden transition-all duration-700 group relative"
                                >
                                    <Image
                                        src={src}
                                        alt={`CSR Gallery ${index}`}
                                        fill
                                        className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-out"
                                        sizes="450px"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
            <style jsx global>{`
                @media (max-width: 1024px) {
                    .gs-hero-title {
                        left: 0 !important;
                        right: 0 !important;
                        bottom: 50% !important;
                        transform: translateY(50%) !important;
                        text-align: center !important;
                        width: 100% !important;
                        font-size: 38px !important;
                        padding: 0 20px !important;
                        box-sizing: border-box !important;
                    }
                    .gs-hero-nav {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CSRPage;

