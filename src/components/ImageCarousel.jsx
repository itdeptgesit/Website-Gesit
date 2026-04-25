"use client";

import { useState, useEffect } from 'react';

const ImageCarousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="gesit-carousel" style={{ overflow: 'hidden', width: '100%' }}>
      <div 
        className="gesit-carousel-track" 
        style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease-in-out', display: 'flex' }}
      >
        {images.map((img, i) => (
          <div className="gesit-carousel-slide" key={i} style={{ minWidth: '100%', flex: '0 0 100%' }}>
            <img src={img.src} alt={img.alt} className="manufacturing-img" style={{ width: '100%', display: 'block' }} />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="gesit-carousel-dots" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '15px' }}>
          {images.map((_, i) => (
            <span 
              key={i} 
              className={`gesit-carousel-dot ${i === currentIndex ? 'active' : ''}`}
              style={{
                width: '10px', height: '10px', borderRadius: '50%', backgroundColor: i === currentIndex ? '#BC9C33' : '#ddd', cursor: 'pointer', transition: 'background-color 0.3s'
              }}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
