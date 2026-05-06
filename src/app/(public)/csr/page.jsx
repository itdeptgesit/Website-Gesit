'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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
                    className="gs-hero-title gs-csr-hero-title"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    style={{ lineHeight: "72px" }}
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
            <section className="flex justify-center bg-[#e3eaf4] py-16 md:py-[60px] lg:py-[150px]">
                <div className="max-w-5xl w-full mx-auto px-6 md:px-[40px] lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:pl-20"
                    >
                        {/* Heading - Forced breaks to match your reference image exactly */}
                        <div className="mb-5">
                            <h3 className="text-[30px] md:text-[36px] lg:text-[36px] font-normal leading-snug md:leading-[50px]" style={{
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
                                fontFamily: "'Source Sans Pro', sans-serif",
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

            <section suppressHydrationWarning className="elementor-section elementor-top-section elementor-element elementor-element-4b82676 elementor-section-stretched elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no bg-[#103065] py-16 md:py-24" data-id="4b82676" data-element_type="section">
                <div className="elementor-container elementor-column-gap-no">
                    <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-365869f" data-id="365869f" data-element_type="column" suppressHydrationWarning>
                        <div className="elementor-widget-wrap elementor-element-populated">
                            <section className="elementor-section elementor-inner-section elementor-element elementor-element-c7c8c1f elementor-section-full_width zs-custom-height no-button elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="c7c8c1f" data-element_type="section">
                                <div className="elementor-container elementor-column-gap-extended flex-col lg:flex-row px-6 lg:px-0" style={{ display: 'flex', alignItems: 'stretch' }}>
                                    {focusAreas.map((val, idx) => (
                                        <div key={val.title} className="elementor-inner-column w-full lg:w-1/3 max-w-[420px] mx-auto lg:max-w-none" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '0 10px' }}>
                                            <motion.div
                                                className="elementor-widget-wrap elementor-element-populated"
                                                variants={staggerContainer}
                                                initial="initial"
                                                whileInView="whileInView"
                                                viewport={{ once: true }}
                                                style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}
                                            >
                                                <div className="elementor-element elementor-element-98ea9bc p-15 text-left elementor-widget elementor-widget-thetrial_core_location_info" style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                    <div className="elementor-widget-container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                        <div className="qodef-shortcode qodef-m qodef-location-info qodef-layout--text-below qodef-text-break--disabled" style={{ borderRadius: '5px', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                            <div className="qodef-m-image">
                                                                <Image src={val.image} alt={val.title} width={400} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                                            </div>
                                                            <div className="qodef-m-content" style={{ backgroundColor: '#BC9C33', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: '200px', padding: '35px 25px' }}>
                                                                <motion.h4 variants={textVariant} className="qodef-m-title" style={{ color: '#FFFFFF', marginBottom: '15px' }}>{val.title}</motion.h4>
                                                                <motion.p variants={textVariant} className="qodef-m-text" style={{ color: '#FFFFFF' }}>{val.desc}</motion.p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>


            {/* ================= INITIATIVES ================= */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2
                        className="text-center mb-12 text-[#000] text-[32px] md:text-[42px]"
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
                                    <span className="text-[20px] md:text-[24px] text-[#000]" style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>{initiative.title}</span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {openInitiative === initiative.title && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-14 md:pl-20 pr-4 md:pr-8 pb-8 pt-2">
                                                {initiative.content.map((block) => (
                                                    <div key={block.subtitle} className="mt-6 first:mt-0">
                                                        {block.subtitle && (
                                                            <h4 className="text-[17px] md:text-[18px] font-bold text-[#444] m-0 mb-2" style={{ fontFamily: "'Source Sans Pro', sans-serif", lineHeight: 1.2 }}>
                                                                {block.subtitle}
                                                            </h4>
                                                        )}
                                                        <ul className="space-y-2 m-0 p-0">
                                                            {block.items.map((item, i) => {
                                                                const isSubItem = item.startsWith("- ");
                                                                return (
                                                                    <li key={i} className={`flex items-start gap-2 text-[16px] md:text-[17px] text-[#666] font-normal leading-normal m-0 p-0 ${isSubItem ? 'pl-8' : ''}`} style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
                                                                        {!isSubItem && (
                                                                            <span className="text-[#888] mt-1 shrink-0">•</span>
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
                            className="flex gap-6 md:gap-12 px-4 py-6 md:py-12 items-center"
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
                                    className="w-[280px] h-[190px] md:w-[450px] md:h-[300px] shrink-0 rounded-xl overflow-hidden transition-all duration-700 group relative"
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