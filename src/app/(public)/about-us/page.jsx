'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import './about-us.css';

export default function AboutUs() {
  const [progressKey, setProgressKey] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setProgressKey(prev => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
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

  return (
    <>
      <main id="qodef-page-content">
        <div className="qodef-page-content-inner clear">
          <div className="qodef-grid-item qodef-page-content-section qodef-col--12">
            <div data-elementor-type="wp-page" data-elementor-id={5968} className="elementor elementor-5968" suppressHydrationWarning>

              {/* HERO Section with Background Video */}
              <section suppressHydrationWarning className="elementor-section elementor-top-section elementor-element elementor-element-b817b21 elementor-section-full_width elementor-section-height-min-height elementor-section-height-default elementor-section-items-middle qodef-elementor-content-no" data-id="b817b21" data-element_type="section" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>

                {/* Gold progress bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: 4,
                  background: 'rgba(0,0,0,0.2)', zIndex: 40,
                }}>
                  <motion.div
                    key={progressKey}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: 'linear' }}
                    style={{ originX: 0, height: '100%', background: '#BC9C33' }}
                  />
                </div>

                <div className="elementor-background-video-container" style={{ position: 'absolute', inset: 0 }}>
                  {/* High-priority optimized image that paints instantly as the LCP element */}
                  <img
                    src="/video/video_thumbnail2.webp"
                    alt="About Us Hero"
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', 
                      zIndex: 1 
                    }}
                  />

                  {/* Video mounts immediately after first render, playing seamlessly over the identical image frame */}
                  {isMounted && (
                    <video 
                      suppressHydrationWarning 
                      className="elementor-background-video-hosted elementor-html5-video" 
                      autoPlay 
                      muted 
                      playsInline 
                      loop 
                      preload="metadata"
                      src="/video/about-us-video.mp4" 
                      style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        zIndex: 2
                      }} 
                    />
                  )}
                </div>

                {/* Overlay Gradient */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '60%',
                  background: 'linear-gradient(rgba(16,48,101,0.5) 0%, rgba(16,48,101,0) 100%)',
                  zIndex: 5,
                }} />

                <motion.h1
                  className="gs-hero-title gs-about-hero-title"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >
                  About
                </motion.h1>
              </section>

              {/* Tagline Paragraph Section */}
              <section suppressHydrationWarning className="elementor-section elementor-top-section elementor-element elementor-element-bb5e89a qodef-elementor-content-grid elementor-section-stretched elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="bb5e89a" data-element_type="section">
                <div className="elementor-container elementor-column-gap-no">
                  <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-f0a51c8" data-id="f0a51c8" data-element_type="column">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div className="elementor-element elementor-element-ead908f elementor-widget elementor-widget-heading" data-id="ead908f" data-element_type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <motion.h3
                            variants={textVariant}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true, margin: "-100px" }}
                            className="elementor-heading-title elementor-size-default"
                          >
                            Founded in the 1950s as a small private trading company,
                            Gesit has grown to become a business leader in the fields of
                            Property, Trading &amp; Service, Manufacturing, and Natural
                            Resources.
                          </motion.h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* History & Meaning Section */}
              <section suppressHydrationWarning className="elementor-section elementor-top-section elementor-element elementor-element-f1af337 elementor-section-full_width elementor-reverse-mobile elementor-section-stretched elementor-reverse-tablet elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="f1af337" data-element_type="section">
                <div className="elementor-container elementor-column-gap-no">
                  <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-d68a428" data-id="d68a428" data-element_type="column">
                    <motion.div
                      className="elementor-widget-wrap elementor-element-populated"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <div className="elementor-element elementor-element-cf349da elementor-widget elementor-widget-html" data-id="cf349da" data-element_type="widget" data-widget_type="html.default">
                        <motion.div variants={textVariant} className="elementor-widget-container">
                          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1200 600" style={{ enableBackground: 'new 0 0 1200 600' }} xmlSpace="preserve">
                            <g>
                              <path fill="#BC9C33" d="M416.77,124.05h66.25l27.45-39.99c2.78-3.97,5.37-5.97,7.76-5.97c6.36,0,19.59,8.86,39.69,26.56
  c20.09,17.71,30.14,28.95,30.14,33.72c0,2-3.79,2.98-11.34,2.98H416.77c0,12.74,0.39,25.87,1.19,39.39l1.19,19.7
  c0,1.99-0.4,3.49-1.19,4.48c-0.8,1-3.98,2.69-9.55,5.07c-5.58,2.39-12.83,4.68-21.79,6.86c-8.95,2.19-14.62,3.28-17.01,3.28
  c-2.39,0-3.58-2.78-3.58-8.36v-70.43H235.33v71.03c0,3.58-0.7,6.17-2.09,7.76c-1.4,1.6-7.07,3.68-17.01,6.27
  c-9.95,2.59-20.1,3.88-30.44,3.88c-3.19,0-4.78-2.39-4.78-7.16l1.79-81.77H62.84c-10.35,0-18.71,1.19-25.07,3.58l-14.32-23.87
  c8.36,1.99,18.3,2.98,29.84,2.98h129.51V66.16c0-13.13-0.6-27.65-1.79-43.57c34.22,7.16,55.4,12.24,63.56,15.22
  c8.15,2.98,12.24,5.88,12.24,8.65c0,4.38-7.16,9.55-21.49,15.52v62.07h130.71V73.32c0-19.1-0.8-33.62-2.39-43.57
  c14.72,3.19,29.64,6.77,44.76,10.74c15.12,3.98,24.07,6.77,26.86,8.36c2.78,1.6,4.18,3.38,4.18,5.37c0,3.58-7.56,8.76-22.68,15.52
  V124.05z M342.76,254.76l29.84-23.28c3.58-2.78,7.36-4.18,11.34-4.18c5.17,0,12.03,3.49,20.59,10.44
  c8.55,6.97,18.1,14.13,28.65,21.49c10.54,7.37,15.82,12.53,15.82,15.52c0,2.98-1.3,5.18-3.88,6.56c-2.59,1.4-9.05,2.09-19.4,2.09
  c-10.35,0-18.9,1.89-25.66,5.67c-6.77,3.79-22.18,14.83-46.26,33.12c-24.08,18.31-51.23,40.19-81.47,65.65
  c-30.24,25.47-51.53,43.87-63.86,55.21c-12.34,11.34-19.99,19.7-22.98,25.07c-2.98,5.37-4.48,10.25-4.48,14.62
  c0,9.15,5.27,16.31,15.82,21.49c10.54,5.17,27.16,8.36,49.84,9.55c22.68,1.19,54.11,1.79,94.3,1.79
  c79.17,0,125.64-2.29,139.36-6.86c13.73-4.58,24.17-16.52,31.33-35.81c7.16-19.3,13.33-51.82,18.5-97.58l13.13,1.19
  c0.39,32.23,1.19,55.31,2.39,69.23c1.19,13.93,3.58,24.08,7.16,30.44c3.58,6.37,9.94,13.33,19.1,20.89
  c4.37,3.58,6.57,6.66,6.57,9.25c0,2.58-3.49,8.75-10.44,18.5c-6.97,9.75-16.82,17.8-29.54,24.17
  c-12.74,6.36-28.55,10.44-47.45,12.24c-18.9,1.79-51.53,2.69-97.88,2.69c-46.36,0-89.43-0.6-129.22-1.79
  c-39.79-1.19-66.45-3.09-79.98-5.67c-13.53-2.59-25.37-7.07-35.51-13.43c-10.15-6.37-17.81-13.73-22.98-22.08
  c-5.18-8.36-7.76-16.62-7.76-24.77c0-8.16,1.19-15.61,3.58-22.38c2.39-6.76,5.76-13.22,10.15-19.4
  c4.37-6.16,14.72-16.91,31.04-32.23c16.31-15.31,39.99-36.01,71.03-62.07c31.04-26.06,65.45-54.01,103.25-83.86H121.33
  c-8.36,0-15.13,1-20.29,2.98L89.7,252.37c7.16,1.59,15.12,2.39,23.87,2.39H342.76z" />
                              <path fill="#BC9C33" d="M752.79,158.07h158.76c-3.19-43.36-5.37-87.53-6.56-132.5c15.52,2.39,30.93,5.47,46.26,9.25
  c15.31,3.79,24.67,6.56,28.05,8.36c3.38,1.79,5.07,3.68,5.07,5.67c0,3.98-7.16,9.16-21.49,15.52c0.79,42.97,1.79,74.21,2.98,93.7
  h110.42l20.29-31.63c4.37-7.16,8.15-10.74,11.34-10.74c3.18,0,14.32,8.06,33.42,24.17c19.1,16.11,28.65,26.17,28.65,30.14
  c0,3.98-5.37,5.97-16.11,5.97H967.06c5.57,82.77,16.91,148.22,34.02,196.36c23.07-40.98,42.57-94.3,58.49-159.95
  c43.36,16.71,65.06,27.85,65.06,33.42c0,2.79-3.68,5.18-11.04,7.16c-7.37,2-14.03,10.95-19.99,26.86
  c-23.08,62.47-46.36,110.03-69.83,142.65c14.72,24.68,31.13,42.48,49.24,53.42c18.1,10.94,30.14,16.41,36.11,16.41
  c2.39,0,4.27-1.1,5.67-3.28c1.39-2.19,4.97-10.74,10.74-25.66c5.76-14.92,13.82-38.89,24.17-71.92l11.34,1.79
  c-5.97,37.81-8.95,64.26-8.95,79.38c0,15.12,1.29,27.75,3.88,37.9c2.58,10.15,6.66,20.19,12.23,30.14
  c5.57,9.94,8.36,17.31,8.36,22.08c0,7.55-3.88,11.34-11.64,11.34c-7.76,0-22.29-3.49-43.57-10.44
  c-21.29-6.97-43.37-18.71-66.25-35.21c-22.88-16.52-44.27-38.5-64.16-65.95c-38.6,40.18-103.85,76.4-195.76,108.62l-7.76-7.16
  c80.77-43.78,140.65-90.72,179.65-140.86c-26.66-51.72-44.57-134.08-53.72-247.09H752.19c-0.8,40.99-1.59,72.81-2.39,95.49h72.22
  l14.92-23.87c2.78-4.37,5.76-6.57,8.95-6.57c3.18,0,11.24,3.09,24.17,9.25c12.93,6.17,21.09,10.55,24.47,13.13
  c3.38,2.59,5.07,5.47,5.07,8.66c0,6.37-6.37,13.73-19.1,22.08c-0.4,28.26-1.89,59.19-4.48,92.81c-2.59,33.63-5.37,54.82-8.36,63.56
  c-2.98,8.76-7.76,16.71-14.33,23.87c-6.56,7.16-17.11,14.42-31.63,21.78c-14.53,7.36-23.38,11.04-26.56,11.04
  c-3.19,0-5.97-3.58-8.36-10.74c-3.58-10.74-7.76-18.59-12.53-23.57c-4.77-4.97-14.72-10.04-29.84-15.22l0.6-11.34
  c16.31,1.99,30.04,2.98,41.18,2.98c11.14,0,19.4-1.69,24.77-5.07c5.37-3.38,8.85-8.95,10.44-16.71c1.59-7.76,3.08-25.16,4.48-52.22
  c1.39-27.05,2.48-55.51,3.28-85.35h-79.98l-3.58,73.41c-1.6,30.24-5.67,56.91-12.24,79.98c-6.57,23.08-17.41,44.76-32.53,65.06
  c-15.13,20.29-37.6,42.77-67.44,67.44l-9.55-6.57c34.62-36.61,55.7-75.5,63.27-116.68c7.55-41.18,11.34-114.09,11.34-218.74
  c0-24.27-0.4-58.29-1.19-102.06C717.97,138.18,736.47,146.93,752.79,158.07z M989.14,54.22c23.07,4.77,41.08,9.65,54.01,14.62
  c12.93,4.98,21.98,10.44,27.16,16.41c5.17,5.97,7.76,13.73,7.76,23.28c0,9.55-3.68,19.1-11.04,28.65
  c-7.37,9.55-13.83,14.32-19.4,14.32c-2.39,0-5.37-4.57-8.95-13.73c-6.77-18.7-14.43-33.22-22.98-43.57
  c-8.56-10.34-19.01-20.29-31.33-29.84L989.14,54.22z" />
                            </g>
                          </svg>
                        </motion.div>
                      </div>
                      <div className="elementor-element elementor-element-e911eef elementor-widget elementor-widget-heading" data-id="e911eef" data-element_type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <motion.p variants={textVariant} className="elementor-heading-title elementor-size-default">Based
                            on the Mandarin “<i><b>yi cheng</b></i>” and Hokkien
                            “<i><b>geseng</b></i>”, which means <br className="desktop-br" /> “<i><b>perfection for
                              art</b></i>”</motion.p>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-7a9c5ef elementor-widget elementor-widget-heading" data-id="7a9c5ef" data-element_type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <motion.h4 variants={textVariant} className="elementor-heading-title elementor-size-default">Gesit
                            is a name chosen to represent our vision for strategic
                            resourcefulness and passionate energy in our business
                            endeavors.</motion.h4>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-97290fa elementor-widget elementor-widget-text-editor" data-id="97290fa" data-element_type="widget" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container">
                          <motion.p variants={textVariant}>Over the years, the Gesit Companies continue to capture
                            opportunities to grow its business portfolio amidst changes
                            in economy and increased competition – part of this by
                            being resourceful, agile and competitive.</motion.p>
                          <motion.p variants={textVariant}>Our businesses are managed and operated by a team of
                            professionals, headquartered in Jakarta.​</motion.p>
                          <motion.p variants={textVariant}>As the Gesit Companies continue to grow, we also believe in
                            investing in our human capital and other areas to build
                            competitive advantages. Likewise, we believe in creating
                            positive contributions towards the environment and
                            communities in which we operate in and will continue to
                            invest in these areas. ​</motion.p>
                          <motion.p variants={textVariant}>We are committed to Indonesia.</motion.p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-6f16504 custom-height-mobile" data-id="6f16504" data-element_type="column" suppressHydrationWarning>
                    <div className="elementor-widget-wrap" />
                  </div>
                </div>
              </section>

              {/* Vision & Mission Section with Video */}
              <section suppressHydrationWarning className="elementor-section elementor-top-section elementor-element elementor-element-57a9126 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="57a9126" data-element_type="section">
                <div className="elementor-container elementor-column-gap-no" style={{ alignItems: 'center' }}>
                  <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-f685b7e">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div className="elementor-element elementor-element-65be43a elementor-widget elementor-widget-video" data-id="65be43a" data-element_type="widget">
                        <div className="elementor-widget-container">
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="e-hosted-video elementor-wrapper elementor-open-inline"
                            style={{ borderRadius: 12, overflow: 'hidden' }}
                          >
                            <video suppressHydrationWarning className="elementor-video" src="/video/about-us-video.mp4" autoPlay loop muted playsInline preload="metadata" poster="/video/video_thumbnail2.webp" style={{ width: '100%', borderRadius: 12 }} />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-20288f0">
                    <motion.div
                      className="elementor-widget-wrap elementor-element-populated"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true, margin: "-50px" }}
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '50px' }}
                    >
                      <div className="elementor-element elementor-element-da6b8eb elementor-widget elementor-widget-heading" data-id="da6b8eb" data-element_type="widget" style={{ marginBottom: 0 }}>
                        <div className="elementor-widget-container">
                          <motion.h6 variants={textVariant} className="elementor-heading-title elementor-size-default" style={{ margin: '0 0 10px 0' }}>Our Vision</motion.h6>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-42b3dc3 elementor-widget elementor-widget-heading" data-id="42b3dc3" data-element_type="widget" style={{ marginBottom: 0 }}>
                        <div className="elementor-widget-container">
                          <motion.p variants={textVariant} className="elementor-heading-title elementor-size-default" style={{ margin: 0 }}>To be
                            a Group of Companies that are Recognized by Stakeholders as
                            Strategic First Choice Business Partner</motion.p>
                        </div>
                      </div>
                      <motion.div variants={textVariant} className="elementor-element elementor-element-c47fca5 elementor-widget-divider--view-line elementor-widget elementor-widget-divider" style={{ marginBottom: 0 }}>
                        <div className="elementor-widget-container">
                          <div className="elementor-divider" style={{ borderTop: '1px solid #e5e5e5', margin: '20px 0', width: '100%', display: 'block' }}></div>
                        </div>
                      </motion.div>
                      <div className="elementor-element elementor-element-2cce4eb elementor-widget elementor-widget-heading" data-id="2cce4eb" data-element_type="widget" style={{ marginBottom: 0 }}>
                        <div className="elementor-widget-container">
                          <motion.h6 variants={textVariant} className="elementor-heading-title elementor-size-default" style={{ margin: '0 0 10px 0' }}>Our Mission</motion.h6>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-3c1aa17 elementor-widget elementor-widget-heading" data-id="3c1aa17" data-element_type="widget" style={{ marginBottom: 0 }}>
                        <div className="elementor-widget-container">
                          <motion.p variants={textVariant} className="elementor-heading-title elementor-size-default" style={{ margin: 0 }}>To
                            Establish Resourceful Business Entities that Deliver
                            Sustainable Value to Stakeholders</motion.p>
                        </div>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </section>

              {/* Core Values Section */}
              <section suppressHydrationWarning className="elementor-section elementor-top-section elementor-element elementor-element-4b82676 elementor-section-stretched elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="4b82676" data-element_type="section">
                <div className="elementor-container elementor-column-gap-no">
                  <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-365869f" data-id="365869f" data-element_type="column" suppressHydrationWarning>
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <section className="elementor-section elementor-inner-section elementor-element elementor-element-7521bb1 elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="7521bb1" data-element_type="section">
                        <div className="elementor-container elementor-column-gap-default">
                          <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-75bbd49" data-id="75bbd49" data-element_type="column">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div className="elementor-element elementor-element-c518b5b elementor-widget elementor-widget-heading" data-id="c518b5b" data-element_type="widget">
                                <div className="elementor-widget-container">
                                  <motion.h3
                                    variants={textVariant}
                                    initial="initial"
                                    whileInView="whileInView"
                                    viewport={{ once: true }}
                                    className="elementor-heading-title elementor-size-default"
                                  >
                                    Our Core Values
                                  </motion.h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="elementor-section elementor-inner-section elementor-element elementor-element-c7c8c1f elementor-section-full_width zs-custom-height no-button elementor-section-height-default elementor-section-height-default qodef-elementor-content-no" data-id="c7c8c1f" data-element_type="section">
                        <div className="elementor-container elementor-column-gap-extended" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
                          {[
                            { id: 'fabac30', img: '/about/integrity-scaled-1.webp', title: 'Integrity', desc: 'Think, Talk, Act Honestly and be Ethical​' },
                            { id: 'b940250', img: '/about/respect-scaled-1.webp', title: 'Respect', desc: 'Be Empathetic, Listen to Others and Give an Ethical Response' },
                            { id: '7e17c85', img: '/about/competency-scaled-1.webp', title: 'Competency', desc: 'Knowledgeable, Skillful and Right Attitude' },
                            { id: 'ad7b5aa', img: '/about/passion-scaled-1.webp', title: 'Passion', desc: 'Strongly Engaged and Fully Accountable with Respective Job' }
                          ].map((val, idx) => (
                            <div key={val.id} className={`elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-${val.id} gs-core-value-column`} data-id={val.id} data-element_type="column" style={{ display: 'flex' }}>
                              <motion.div
                                className="elementor-widget-wrap elementor-element-populated"
                                variants={staggerContainer}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{ once: true }}
                                style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                              >
                                <div className="elementor-element elementor-element-98ea9bc p-15 text-center elementor-widget elementor-widget-thetrial_core_location_info">
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m qodef-location-info qodef-layout--text-below qodef-text-break--disabled gs-core-value-card" style={{ borderRadius: '5px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                      <div className="qodef-m-image">
                                        <Image src={val.img} alt={val.title} width={400} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                      </div>
                                      <div className="qodef-m-content gs-core-value-content" style={{ backgroundColor: '#BC9C33', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                        <h4 className="qodef-m-title" style={{ color: '#FFFFFF' }}>{val.title}</h4>
                                        <p className="qodef-m-text" style={{ color: '#FFFFFF' }}>{val.desc}</p>
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

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
