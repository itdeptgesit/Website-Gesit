'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import './contact.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '', // Honeypot field
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    // Turnstile validation
    if (!turnstileToken) {
      newErrors.turnstile = 'Please verify that you are a human';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          website: formData.website, // Honeypot
          turnstileToken: turnstileToken
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '', website: '' });
        setTurnstileToken('');
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (err) {
      alert("Error submitting form. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict phone input to numbers and +
    if (name === 'phone') {
      const filteredValue = value.replace(/[^0-9+]/g, '');
      setFormData(prev => ({ ...prev, [name]: filteredValue }));
      return;
    }

    // Restrict email input to valid email characters
    if (name === 'email') {
      const filteredValue = value.replace(/[^a-zA-Z0-9@._+-]/g, '');
      setFormData(prev => ({ ...prev, [name]: filteredValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 20, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/hero/contact_us_hero_revise.webp"
              alt="Contact Us Hero"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
            />
          </motion.div>
          <div className="gesit-hero-overlay" />
        </div>

        <motion.h1
          className="gs-hero-title gs-contact-hero-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          Contact Us
        </motion.h1>
      </section>

      <section className="contact-section">
        <div className="editorial-grain" />
        <div className="contact-container">
          <motion.div
            className="contact-image-column relative overflow-hidden"
            aria-label="Contact Gesit Image"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/hero/contact_us_im.webp"
              alt="The Gesit Companies Office"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 550px"
            />
          </motion.div>

          <div className="contact-content-column">
            <motion.h3
              className="contact-heading-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              The Gesit Companies
            </motion.h3>

            <div className="contact-info-row">
              <motion.div
                className="contact-address-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="contact-info-label">Address</p>
                <div className="contact-info-text">
                  <a
                    href="https://www.google.com/maps/place/The+City+Tower/@-6.199216,106.8213135,17z/data=!4m12!1m6!3m5!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!2sThe+City+Tower!8m2!3d-6.1991991!4d106.8235192!3m4!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!8m2!3d-6.1991991!4d106.8235192"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-address-link"
                  >
                    The City Tower, 27<sup>th</sup> Floor<br />
                    Jl. M.H. Thamrin No 81 DKI<br />
                    Jakarta 10310 &ndash; Indonesia
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="contact-details-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="contact-info-label">Contact</p>
                <div className="contact-info-text">
                  <a href="tel:+62213101601">
                    <svg aria-hidden="true" className="contact-icon" width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
                    +62 21 3101601
                  </a>
                  <a href="tel:+622131934797">
                    <svg aria-hidden="true" className="contact-icon" width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M480 160V77.25a32 32 0 0 0-9.38-22.63L425.37 9.37A32 32 0 0 0 402.75 0H160a32 32 0 0 0-32 32v448a32 32 0 0 0 32 32h320a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM288 432a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm0-128a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm128 128a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm0-128a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm0-112H192V64h160v48a16 16 0 0 0 16 16h48zM64 128H32a32 32 0 0 0-32 32v320a32 32 0 0 0 32 32h32a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32z"></path></svg>
                    +62 21 31934797
                  </a>
                  <a href="mailto:contact@gesit.co.id">
                    <svg aria-hidden="true" className="contact-icon" width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
                    contact@gesit.co.id
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="contact-form-wrapper">
              <form className="gesit-contact-form" onSubmit={handleFormSubmit}>
                <motion.div
                  className="gesit-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-100">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      className="wpcf7-form-control"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {errors.name && <span className="gesit-error-message">{errors.name}</span>}
                  </div>
                </motion.div>

                {/* Honeypot field - Invisible to users */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <motion.div
                  className="gesit-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="w-50">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="wpcf7-form-control"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {errors.email && <span className="gesit-error-message">{errors.email}</span>}
                  </div>
                  <div className="w-50">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Whatsapp/Phone Number"
                      required
                      className="wpcf7-form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {errors.phone && <span className="gesit-error-message">{errors.phone}</span>}
                  </div>
                </motion.div>

                <motion.div
                  className="gesit-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="w-100">
                    <p style={{ marginBottom: '10px', color: '#64748b', fontSize: '15px', fontWeight: '500' }}>Message (Optional)</p>
                    <textarea
                      name="message"
                      placeholder="Type here..."
                      className="wpcf7-form-control wpcf7-textarea"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                    ></textarea>
                  </div>
                </motion.div>

                <motion.div
                  className="gesit-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="w-100 turnstile-wrapper">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                      onSuccess={token => setTurnstileToken(token)}
                      onError={() => setTurnstileToken('')}
                      onExpire={() => setTurnstileToken('')}
                    />
                    {errors.turnstile && <span className="gesit-error-message">{errors.turnstile}</span>}
                  </div>
                </motion.div>

                <motion.div
                  className="gesit-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="w-100">
                    <button type="submit" className="wpcf7-submit" disabled={loading}>
                      {loading ? 'Sending...' : 'Submit'}
                    </button>
                  </div>
                </motion.div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {submitted && (
          <div className="modal-overlay" onClick={() => setSubmitted(false)}>
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-icon-wrapper">
                <Check className="w-10 font-bold" />
              </div>
              <h3 className="modal-title">Thank You!</h3>
              <p className="modal-description">
                Your message has been sent successfully. <br />
                Our team will reach out to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="modal-close-btn"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

