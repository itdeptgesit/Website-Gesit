"use client";

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const totalScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight;

      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    };

    // Initialize on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!mounted) return null;

  const isVisible = scrollProgress > 0.05;

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <div
      className="gesit-btt"
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        width: '50px',
        height: '50px',
        cursor: 'pointer',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        borderRadius: '50%',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      }}
    >
      {/* SVG Container wrapping both circles to rotate starting point to Top */}
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'rotate(-90deg)'
        }}
      >
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="#eef2f6"
          strokeWidth="3"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="#BC9C33"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>

      {/* Up Chevron inside */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#103065"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </div>
  );
}
