'use client';


import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const heroSlides = [
	{ image: '/csr/cover1.webp' },
	{ image: '/csr/cover2.webp' },
	{ image: '/csr/cover3.webp' },
];

export default function CSRPage() {
	const [isMounted, setIsMounted] = useState(false);
	const [activeIdx, setActiveIdx] = useState(0);
	const [prevEl, setPrevEl] = useState(null);
	const [nextEl, setNextEl] = useState(null);

	const circleBtn = {
		width: 60, height: 60, borderRadius: '50%',
		border: '1px solid rgba(255,255,255,0.3)',
		background: 'rgba(255,255,255,0.1)',
		backdropFilter: 'blur(10px)',
		WebkitBackdropFilter: 'blur(10px)',
		display: 'flex', alignItems: 'center', justifyContent: 'center',
		cursor: 'pointer', transition: 'all 0.3s ease',
		color: '#fff',
	};

	useEffect(() => {
		setIsMounted(true);
		document.body.classList.add('elementor-page', 'elementor-page-5490');
		return () => {
			document.body.classList.remove('elementor-page', 'elementor-page-5490');
		};
	}, []);

	// Initialize accordion after mount, once DOM is ready
	useEffect(() => {
		if (!isMounted) return;
		const timer = setTimeout(() => {
			const accordion = document.querySelector('.qodef-accordion');
			if (!accordion) return;
			const titles = accordion.querySelectorAll('.qodef-accordion-title');
			const contents = accordion.querySelectorAll('.qodef-accordion-content');

			// open first by default
			if (titles[0]) titles[0].classList.add('qodef--opened');
			if (contents[0]) contents[0].style.display = 'block';

			titles.forEach((title, i) => {
				title.style.cursor = 'pointer';
				title.addEventListener('click', () => {
					const isOpen = title.classList.contains('qodef--opened');
					titles.forEach((t, j) => {
						t.classList.remove('qodef--opened');
						contents[j].style.display = 'none';
					});
					if (!isOpen) {
						title.classList.add('qodef--opened');
						contents[i].style.display = 'block';
					}
				});
			});
		}, 50);
		return () => clearTimeout(timer);
	}, [isMounted]);

	return (
		<>
			<link rel="stylesheet" media="all" href="/csr/css/style.css" />
			<main id="qodef-page-content" className="qodef-grid qodef-layout--template ">
				<div className="qodef-grid-inner clear">
					<div className="qodef-grid-item qodef-page-content-section qodef-col--12">
						<div data-elementor-type="wp-page" data-elementor-id="5490" className="elementor elementor-5490">

							{/* ── HERO ── */}
							<section className="gs-hero-section" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
								{isMounted && (
									<>
										<Swiper
											modules={[Autoplay, Navigation, EffectFade]}
											effect="fade"
											speed={1500}
											autoplay={{ delay: 5000, disableOnInteraction: false }}
											loop={true}
											navigation={{ prevEl, nextEl }}
											onBeforeInit={(swiper) => {
												swiper.params.navigation.prevEl = prevEl;
												swiper.params.navigation.nextEl = nextEl;
											}}
											onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
											style={{ width: '100%', height: '100%' }}
										>
											{heroSlides.map((slide, idx) => (
												<SwiperSlide key={idx} style={{ position: 'relative', overflow: 'hidden' }}>
													<Image
														src={slide.image}
														alt="CSR Hero"
														fill
														style={{
															objectFit: 'cover',
															transform: idx === activeIdx ? 'scale(1.15)' : 'scale(1.05)',
															transition: 'transform 10000ms ease-out',
														}}
														priority={idx === 0}
													/>
												</SwiperSlide>
											))}
										</Swiper>
										<div className="gesit-hero-overlay" />

										<motion.h1
											className="gs-hero-title"
											initial={{ opacity: 0, y: 25 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
										>
											Corporate Social Responsibility
										</motion.h1>

										<div className="gs-hero-nav hidden md:flex">
											<button
												ref={(node) => setPrevEl(node)}
												className="gs-prev-csr"
												style={circleBtn}
												onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }}
												onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
											>
												<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 5.9 9.092" style={{ transform: 'rotate(180deg)' }}><path d="M5.9 4.546L1.354 9.092 0 7.738l3.192-3.192L0 1.354 1.354 0l3.125 3.125z" fill="currentColor" /></svg>
											</button>
											<button
												ref={(node) => setNextEl(node)}
												className="gs-next-csr"
												style={circleBtn}
												onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }}
												onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
											>
												<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 5.9 9.092"><path d="M5.9 4.546L1.354 9.092 0 7.738l3.192-3.192L0 1.354 1.354 0l3.125 3.125z" fill="currentColor" /></svg>
											</button>
										</div>
									</>
								)}
							</section>

							{/* ── OVERVIEW ── */}
							<section className="elementor-section elementor-top-section elementor-element elementor-element-f7f2714 elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="f7f2714" data-element_type="section" data-e-type="section" data-settings='{"background_background":"classic"}'>
								<div className="elementor-container elementor-column-gap-no">
									<div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-3b9babf" data-id="3b9babf" data-element_type="column" data-e-type="column">
										<div className="elementor-widget-wrap elementor-element-populated">
											<div className="elementor-element elementor-element-4560131 elementor-widget elementor-widget-heading" data-id="4560131" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
												<div className="elementor-widget-container">
													<h3 className="elementor-heading-title elementor-size-default">
														Creating a positive effect on lives and communities by adding the most value and making a significant and lasting impact through Gesit Foundation.
													</h3>
												</div>
											</div>
											<div className="elementor-element elementor-element-2fef7e8 elementor-widget elementor-widget-heading" data-id="2fef7e8" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
												<div className="elementor-widget-container">
													<span className="elementor-heading-title elementor-size-default">Our social investment programs focus on three areas: <strong>Healthcare, Environment &amp; Cultural Outreach,</strong> and <strong>Education.</strong></span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>

							{/* ── FOCUS AREAS ── */}
							<section className="elementor-section elementor-top-section elementor-element elementor-element-861be59 elementor-section-stretched zs-custom-height no-button mobile-justify-center elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="861be59" data-element_type="section" data-e-type="section" data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'>
								<div className="elementor-container elementor-column-gap-no">
									<div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-2f9badc" data-id="2f9badc" data-element_type="column" data-e-type="column">
										<div className="elementor-widget-wrap elementor-element-populated">
											<div className="elementor-element elementor-element-7276c3b p-15 elementor-widget elementor-widget-thetrial_core_location_info" data-id="7276c3b" data-element_type="widget" data-e-type="widget" data-widget_type="thetrial_core_location_info.default">
												<div className="elementor-widget-container">
													<div className="qodef-shortcode qodef-m qodef-location-info qodef-layout--text-below qodef-text-break--disabled" style={{ overflow: 'hidden', height: '100%' }}>
														<div className="qodef-m-image"> <img loading="lazy" decoding="async" width="753" height="597" src="/csr/images/healthcare-scaled-1.jpg" className="attachment-full size-full" alt="" style={{ display: 'block' }} /></div>
														<div className="qodef-m-content" style={{ backgroundColor: "#BC9C33" }}>
															<h5 className="qodef-m-title" style={{ color: "#FFFFFF" }}>Healthcare</h5>
															<p className="qodef-m-text" style={{ color: "#FFFFFF" }}>We provide initiatives that ensure proper medical treatment and aid for the sick and injured. Our focus goes beyond donations; we get involved in the causes that help improve the infrastructures needed to support healthcare.</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-d0ecfb1" data-id="d0ecfb1" data-element_type="column" data-e-type="column">
										<div className="elementor-widget-wrap elementor-element-populated">
											<div className="elementor-element elementor-element-36c4e72 p-15 elementor-widget elementor-widget-thetrial_core_location_info" data-id="36c4e72" data-element_type="widget" data-e-type="widget" data-widget_type="thetrial_core_location_info.default">
												<div className="elementor-widget-container">
													<div className="qodef-shortcode qodef-m qodef-location-info qodef-layout--text-below qodef-text-break--disabled" style={{ overflow: 'hidden', height: '100%' }}>
														<div className="qodef-m-image"> <img loading="lazy" decoding="async" width="469" height="372" src="/csr/images/environment-scaled-1.jpg" className="attachment-full size-full" alt="" style={{ display: 'block' }} /></div>
														<div className="qodef-m-content" style={{ backgroundColor: "#BC9C33" }}>
															<h5 className="qodef-m-title" style={{ color: "#FFFFFF" }}>Environment &amp; Cultural Outreach</h5>
															<p className="qodef-m-text" style={{ color: "#FFFFFF" }}>We provide cultural training, concerts, religious infrastructure, and enforce diversity in our society, but most importantly we prioritize initiatives that improve the environments in which we operate everyday.</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-df100c7" data-id="df100c7" data-element_type="column" data-e-type="column">
										<div className="elementor-widget-wrap elementor-element-populated">
											<div className="elementor-element elementor-element-d719d27 p-15 elementor-widget elementor-widget-thetrial_core_location_info" data-id="d719d27" data-element_type="widget" data-e-type="widget" data-widget_type="thetrial_core_location_info.default">
												<div className="elementor-widget-container">
													<div className="qodef-shortcode qodef-m qodef-location-info qodef-layout--text-below qodef-text-break--disabled" style={{ overflow: 'hidden', height: '100%' }}>
														<div className="qodef-m-image"> <img loading="lazy" decoding="async" width="1707" height="1353" src="/csr/images/education-scaled-1.jpg" className="attachment-full size-full" alt="" style={{ display: 'block' }} /></div>
														<div className="qodef-m-content" style={{ backgroundColor: "#BC9C33" }}>
															<h5 className="qodef-m-title" style={{ color: "#FFFFFF" }}>Education</h5>
															<p className="qodef-m-text" style={{ color: "#FFFFFF" }}>We provide hands-on opportunities for disadvantaged children through various initiatives, such as scholarships. Most notably, we ensure that educational facilities are available to the people that we believe need it most.</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>

							{/* ── INITIATIVES HEADING ── */}
							<section className="elementor-section elementor-top-section elementor-element elementor-element-98a76e5 elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="98a76e5" data-element_type="section" data-e-type="section">
								<div className="elementor-container elementor-column-gap-no">
									<div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-362aa85" data-id="362aa85" data-element_type="column" data-e-type="column">
										<div className="elementor-widget-wrap elementor-element-populated">
											<div className="elementor-element elementor-element-b18024b elementor-widget elementor-widget-heading" data-id="b18024b" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
												<div className="elementor-widget-container">
													<h2 className="elementor-heading-title elementor-size-default">Our CSR Initiatives &amp; Programs</h2>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>

							{/* ── ACCORDION (React state) ── */}
							<CSRAccordion />

						</div>
					</div>
				</div>
			</main>
		</>
	);
}

const accordionItems = [
	{
		title: 'Healthcare',
		content: (
			<>
				<b>Pandemic</b>
				<ul style={{ listStyle: 'disc', paddingLeft: '1.5em' }}>
					<li>Distributing ventilators and PPE to 128 Hospitals across in Indonesia</li>
					<li>Distributing food aid to people affected by COVID in 5 provinces in Indonesia</li>
				</ul>
				<b>Natural Disaster</b>
				<ul style={{ listStyle: 'disc', paddingLeft: '1.5em' }}>
					<li>Rebuilding healthcare facilities and hospitals</li>
					<li>Donating food and other resources to victims of natural disasters, such as the volcanic eruption at Mount Merapi, Mentawai, the landslide at Puncak and the floods in Jakarta</li>
				</ul>
				<b>Medical Equipment</b>
				<ul style={{ listStyle: 'disc', paddingLeft: '1.5em' }}>
					<li>Donating speedboat ambulances in West Kalimantan</li>
					<li>Providing ambulances for DKI Jakarta Region, in partnership with Red Cross Indonesia</li>
					<li>Contributed in the construction of YPAC (Yayasan Penyandang Anak Cacat) by providing Aluminum Profile</li>
				</ul>
			</>
		),
	},
	{
		title: 'Environment & Cultural Outreach',
		content: (
			<>
				<p><b>Environment</b></p>
				<ul style={{ listStyle: 'disc', paddingLeft: '1.5em' }}>
					<li>Developing water projects and clean water facilities in remote areas</li>
					<li>Creating and maintaining roads and open road access in some districts in Indonesia</li>
					<li>Collaborating with Yayasan Kebun Raya Indonesia in the conservation of endangered and rare botanical species in Kebun Raya Cibodas and Kebun Raya Bedugul, Bali</li>
					<li>Planting 1,000 trees in West Kalimantan Deforestation Areas</li>
				</ul>
				<p><b>Cultural Outreach</b></p>
				<ul style={{ listStyle: 'disc', paddingLeft: '1.5em' }}>
					<li>Holding charitable concerts in partnership with foreign embassies to gather donations for disaster victims</li>
					<li>Contributed to the construction of a mosque in Ciloto-Puncak as well as renovation of local churches and temples</li>
				</ul>
			</>
		),
	},
	{
		title: 'Education',
		content: (
			<ul style={{ listStyle: 'disc', paddingLeft: '1.5em' }}>
				<li>
					Building, renovating, and providing school facilities for:<br />
					- North Sumatera: Sekolah Mitra Inalum<br />
					- Jakarta: Down Syndrome &amp; Deaf School of Cempaka Putih<br />
					- Jakarta: School of Yayasan Penyandang Anak Cacat<br />
					- Fujian: Primary, Secondary School, Sport and Library in Normal University
				</li>
				<li>Providing over 300 university scholarships per year</li>
			</ul>
		),
	},
];

function CSRAccordion() {
	const [openIdx, setOpenIdx] = useState(0);
	return (
		<section className="elementor-section elementor-top-section elementor-element elementor-element-7d3d939 elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="7d3d939" data-element_type="section" data-e-type="section">
			<div className="elementor-container elementor-column-gap-no">
				<div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-913ffdb">
					<div className="elementor-widget-wrap elementor-element-populated">
						<div className="elementor-element elementor-element-45f5edd elementor-widget elementor-widget-thetrial_core_accordion">
							<div className="elementor-widget-container">
								<div className="qodef-shortcode qodef-m qodef-accordion qodef--init clear qodef-behavior--accordion qodef-layout--simple">
									{accordionItems.map((item, i) => (
										<div key={i}>
											<h5
												className={`qodef-accordion-title${openIdx === i ? ' qodef--opened ui-state-active' : ''}`}
												onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
												style={{ cursor: 'pointer' }}
											>
												<span className="qodef-accordion-mark">
													<span className="qodef-icon--plus">+</span>
													<span className="qodef-icon--minus">-</span>
												</span>{' '}
												<span className="qodef-tab-title"> {item.title} </span>
											</h5>
											<div className="qodef-accordion-content" style={{ display: openIdx === i ? 'block' : 'none' }}>
												<div className="qodef-accordion-content-inner">
													{item.content}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

