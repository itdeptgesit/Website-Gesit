'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

export default function CSRPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openInitiative, setOpenInitiative] = useState("Healthcare");
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);

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

    if (!isMounted) return null;

    return (
        <div className="bg-white min-h-screen">

            {/* 1. Cinematic Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
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
                                    <img
                                        src={src}
                                        alt={`CSR Hero ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            transformOrigin: 'center',
                                            transform: index === activeIndex ? "scale(1.15)" : "scale(1.05)",
                                            transition: "transform 10000ms ease-out"
                                        }}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        decoding="async"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#103065]/70 via-[#103065]/30 to-transparent" />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

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

                {/* Hero title */}
                <motion.h1
                    className="gs-hero-title"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    style={{ lineHeight: "72px" }}
                >
                    Corporate Social<br className="md:hidden" /> Responsibility
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
            <section className="flex justify-center bg-[#e3eaf4] py-16 md:py-24 lg:py-[150px]">
                <div className="max-w-5xl w-full mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:pl-20"
                    >
                        {/* Heading - Forced breaks to match your reference image exactly */}
                        <div className="mb-5">
                            <h3 className="text-[22px] md:text-[31px] lg:text-[36px] font-normal leading-snug md:leading-[50px]" style={{
                                color: '#103065',
                                fontFamily: 'Lora, serif',
                                margin: 0,
                                textAlign: 'left'
                            }}>
                                Creating a positive effect on lives and communities<br className="hidden lg:block" />
                                by adding the most value and making a significant<br className="hidden lg:block" />
                                and lasting impact through Gesit Foundation.
                            </h3>
                        </div>

                        {/* Description - Bold focus areas */}
                        <div style={{ paddingLeft: '24px', borderLeft: '2px solid #BC9C33' }}>
                            <p className="text-[16px] md:text-[20px] lg:text-[23px] leading-relaxed" style={{
                                color: '#103065',
                                fontFamily: "'Source Sans Pro', sans-serif",
                                fontWeight: 400,
                                margin: 0
                            }}>
                                Our social investment programs focus on three areas: <strong className="font-extrabold">Healthcare,</strong><br className="hidden lg:block" />
                                <strong className="font-extrabold">Environment &amp; Cultural Outreach,</strong> and <strong className="font-extrabold">Education.</strong>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ================= FOCUS AREAS ================= */}
            <section className="py-32 bg-[#103065]">
                <div className="container mx-auto px-8 md:px-16 lg:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 max-w-6xl mx-auto">
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
                                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[4px] shadow-2xl shrink-0">
                                    <img
                                        src={area.image}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                        alt={area.title}
                                    />
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>

                                {/* Connecting Line Spacer & Animated Overlay */}
                                <div className="relative h-10 w-full flex justify-center shrink-0 z-40">
                                    {/* Base subtle line - in front (z-20) */}
                                    <div className="absolute top-[-32px] bottom-[-16px] w-[2.5px] bg-white/40 z-20 pointer-events-none"></div>

                                    {/* Animated active line on hover - clearly in front (z-30) */}
                                    <motion.div
                                        variants={{
                                            hover: { scaleY: 1, opacity: 1 }
                                        }}
                                        initial={{ scaleY: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute top-[-32px] bottom-[-16px] w-[3px] bg-white z-30 pointer-events-none origin-top"
                                    />
                                </div>

                                {/* Bottom Info Box */}
                                <div className="w-full bg-[#BC9C33] p-8 text-left shadow-2xl relative z-10 min-h-[260px] flex flex-col items-start rounded-[4px] flex-1">
                                    <h3 className="text-white text-2xl mb-6 leading-tight h-16 flex items-center" style={{ fontFamily: 'Georgia, serif' }}>{area.title}</h3>
                                    <p className="text-white/95 text-sm font-light leading-relaxed tracking-wide flex-1">
                                        {area.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= INITIATIVES ================= */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center mb-10 text-[#000] text-[30px] md:text-[44px]"
                        style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
                    >
                        Our CSR Initiatives &amp; Programs
                    </motion.h2>

                    <div className="flex flex-col">
                        {initiatives.map((initiative) => (
                                <div key={initiative.title} className="border-b border-slate-300 first:border-t">
                                    <button
                                        onClick={() =>
                                            setOpenInitiative(
                                                openInitiative === initiative.title ? null : initiative.title
                                            )
                                        }
                                        className="w-full py-2 flex items-center gap-4 text-left transition-colors group"
                                    >
                                        <div className={`w-8 h-8 rounded-full border-2 border-[#BC9C33] flex items-center justify-center shrink-0 transition-all ${openInitiative === initiative.title ? 'bg-transparent text-[#BC9C33]' : 'bg-[#BC9C33] text-white'}`}>
                                            {openInitiative === initiative.title ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                                        </div>
                                        <span className="text-[20px] md:text-[24px] text-[#000]" style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>{initiative.title}</span>
                                    </button>

                                    <AnimatePresence>
                                        {openInitiative === initiative.title && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="border-t border-slate-200 w-full" />
                                                <div className="pl-6 md:pl-10 pr-4 md:pr-8 pb-2 pt-1">
                                                    {initiative.content.map((block, idx) => (
                                                        <div key={block.subtitle} className={`mt-2 ${idx !== 0 ? 'pt-1 border-t border-slate-100' : ''}`}>
                                                            {block.subtitle && (
                                                                <h4 className="text-[18px] md:text-[19px] font-bold text-[#444] leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                                                    {block.subtitle}
                                                                </h4>
                                                            )}
                                                            <ul className="mt-0.5 space-y-0">
                                                                {block.items.map((item, i) => {
                                                                    const isSubItem = item.startsWith("- ");
                                                                    return (
                                                                        <li key={i} className={`flex items-start gap-2 text-[16px] md:text-[17px] text-[#555] font-normal leading-tight ${isSubItem ? 'pl-8' : ''}`} style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
                                                                            {!isSubItem && (
                                                                                <span className="text-[#888] font-bold">•</span>
                                                                            )}
                                                                            <span className="flex-1">{item}</span>
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
                                    className="w-[450px] h-[300px] shrink-0 rounded-xl overflow-hidden transition-all duration-700 group relative"
                                >
                                    <img
                                        src={src}
                                        alt={`CSR Gallery ${index}`}
                                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-out"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}