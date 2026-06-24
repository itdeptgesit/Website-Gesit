"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const ImageSlideshow = ({ images }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;
        // Preload all images in the slideshow
        images.forEach(src => {
            const img = window.Image ? new Image() : null;
            if (img) img.src = src;
        });

        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images]);

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900">
            <AnimatePresence initial={false}>
                <motion.div
                    key={index}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{
                        duration: 1.2,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <motion.img
                        src={images[index]}
                        initial={{ scale: 1.15, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                        alt="Slideshow"
                    />
                    <div className="absolute inset-0 bg-black/5"></div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const ProjectItem = ({ project, index }) => {
    return (
        <div
            className={`flex flex-col ${project.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-start justify-between max-w-[1240px] mx-auto`}
        >
            {/* Image Section */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-[45%] relative group"
            >
                <div className="relative aspect-[4/5] overflow-hidden shadow-sm bg-slate-200 rounded-[4px]">
                    <ImageSlideshow images={project.images} />
                </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="w-full lg:w-[45%]"
                style={{ maxWidth: '520px' }}
            >
                <h3 className="text-[#1a1a1a] mb-4 text-4xl md:text-[3.2rem]" style={{ fontFamily: 'Georgia, serif', fontWeight: 400, lineHeight: '1.2', maxWidth: '500px' }}>{project.title}</h3>
                {project.subtitle && (
                    <p className="text-[#444] mb-8" style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', fontStyle: 'italic' }}>
                        {project.subtitle}
                    </p>
                )}
                <div className={`text-[#000] ${!project.subtitle ? 'mt-8' : ''} mb-12`} style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.6', fontFamily: "var(--font-sans)", maxWidth: '440px' }}>
                    {project.desc.split('\n\n').map((p, i) => (
                        <p key={i} className="m-0 mb-4">{p}</p>
                    ))}
                </div>

                {/* Location & Links with Gold Bar aligned with paragraph */}
                <div className="mb-12 relative pl-10 text-left">
                    <div className="absolute left-0 top-1 bottom-1 w-[2.5px] bg-[#BC9C33]"></div>
                    <div className="space-y-4">
                        {project.website && (
                            <a
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-10 py-4 border border-[#103065] rounded-full text-[#103065] text-[16px] hover:bg-[#103065] hover:text-white transition-all duration-300 no-underline"
                                style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}
                            >
                                Visit Website
                            </a>
                        )}
                        {project.brochure && (
                            <div className="pt-2">
                                <a
                                    href={project.brochure}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-10 py-4 border border-[#103065] rounded-full text-[#103065] text-[16px] hover:bg-[#103065] hover:text-white transition-all duration-300 no-underline"
                                    style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}
                                >
                                    View Brochure
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ManufacturingClientView = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Correct paths based on public folder mappings
    const heroImages = [
        "/hero/hero_manufacturing.webp",
        "/hero/edit-1-scaled.webp",
        "/business/manufacturing/distillation-column.webp"
    ];

    const projects = [
        {
            title: "Aluminum Metal Fabrication",
            desc: "The Gesit Companies invests and manages its aluminum fabrication company—Alakasa Andalan Mitra Sejati—since its Joint Venture with Alcan Aluminum in 1972. We focus on aluminum fabrication company that specializes in the industrial sector (e.g., train, marine, plantation, other industrial products) to serve the local and international market.\n\nWe have served countries such as Singapore, Malaysia, Philippine, Brunei, Japan, and Hong Kong over the last 40 years, and we plan on continuing our vision to be recognized as a leader in Manufacturing and Fabricating Aluminum.",
            images: [
                "/business/manufacturing/3-e1646232593879.webp",
                "/business/manufacturing/DSCF3418-edi-2-e1646233775296.webp",
                "/business/manufacturing/alu_lr.webp"
            ],
            brochure: "/manufacturing/Company%20Profile%20Alakasa%20Andalan%20Mitra%20Sejati%20(2026).pdf",
            reverse: true
        },
        {
            title: "Steel & Plastic Packaging",
            desc: "The Gesit Companies invests and manages its packaging company—Rheem Indonesia—since it was established by Rheem Australia in 1969. The focus is to build a packaging company that specialises in industrial packaging products, such as steel and plastic drums as well as Jerry cans, for use in industries such as oil, paint, fragrance, chemical, and food processing.\n\nWe ensure that customers obtain the highest standard of quality products and services, using premium materials and operating to international standards (on time and at competitive prices).",
            images: [
                "/business/manufacturing/manufacturing_steel_1.png",
                "/business/manufacturing/manufacturing_steel_2.png",
                "/business/manufacturing/plastic_packaging.webp",
                "/business/manufacturing/steel.webp"
            ],
            website: "https://rheem.co.id/",
            reverse: false
        },
        {
            title: "Alumina Refinery & Aluminum Smelter Development",
            subtitle: "Under Development",
            desc: "We believe the Alumina and Aluminum industries can be domestically developed to service domestic and global clients due to Indonesia’s rich natural resources and logistical advantage.\n\nThe Gesit Companies will develop a 2-million-ton Alumina Refinery and upon completion, develop an Aluminum Smelter which will reach 1 million ton for the next phase.",
            images: ["/business/manufacturing/distillation-column.webp"],
            reverse: true
        }
    ];

    return (
        <div className="bg-white min-h-screen text-navy-deep font-body">
            {/* 1. Cinematic Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Swiper
                        modules={[Autoplay, EffectFade, Navigation]}
                        effect="fade"
                        speed={2000}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        navigation={{
                            prevEl: '.hero-prev',
                            nextEl: '.hero-next',
                        }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        loop={true}
                        className="h-full w-full"
                    >
                        {heroImages.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-full overflow-hidden">
                                    <img
                                        src={img}
                                        alt={`Manufacturing Hero ${index + 1}`}
                                        className="w-full h-full object-cover animate-property-zoom"
                                        style={{ transformOrigin: 'center' }}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        {...(index === 0 ? { fetchPriority: "high" } : {})}
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#103065]/70 via-[#103065]/30 to-transparent" />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

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

                <div className="absolute inset-0 z-20 flex items-center md:items-end justify-center md:justify-start pb-0 md:pb-24">
                    <div className="w-full px-8 md:px-16 lg:px-24">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-8 text-center md:text-left mt-32">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="text-white text-5xl md:text-[65px] leading-tight drop-shadow-md text-center md:text-left"
                                style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontWeight: 400,
                                    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                                }}
                            >
                                Manufacturing
                            </motion.h1>

                            <div className="hidden md:flex gap-4 z-30">
                                <button className="hero-prev w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#BC9C33] hover:border-[#BC9C33] transition-all duration-300 group">
                                    <ChevronLeft size={20} className="md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <button className="hero-next w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#BC9C33] hover:border-[#BC9C33] transition-all duration-300 group">
                                    <ChevronRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex justify-center" style={{ backgroundColor: '#ffffff', padding: '100px 0 80px' }}>
                <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ margin: '0 0 25px', padding: 0 }}>
                            <h2 className="text-[28px] font-normal" style={{
                                color: '#333',
                                fontFamily: 'var(--font-sans)',
                                margin: 0
                            }}>
                                Serving important industrial sectors, delivering high-quality products, and establishing strong long-term partnership.
                            </h2>
                        </div>

                        <div>
                            <p className="text-[20px]" style={{
                                color: '#666',
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 400,
                                margin: 0
                            }}>
                                The Gesit Companies operates aluminum fabrication and packaging company through two business lines: <strong style={{ color: '#333' }}>Alakasa Andalan Mitra Sejati</strong> and <strong style={{ color: '#333' }}>Rheem Indonesia</strong>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="space-y-48">
                        {projects.map((project, index) => (
                            <ProjectItem key={index} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                .animate-property-zoom {
                    animation: propertyZoom 30s linear infinite alternate;
                    will-change: transform;
                }
                @keyframes propertyZoom {
                    0% { transform: scale(1.0); }
                    100% { transform: scale(1.15); }
                }
            `}</style>
        </div >
    );
};

export default ManufacturingClientView;

