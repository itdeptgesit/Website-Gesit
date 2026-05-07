'use client';

import React from 'react';

const AccordionItem = ({ title, isOpen, onClick, children }) => {
    return (
        <div className="border-b border-gray-200">
            {/* Accordion Header */}
            <button
                type="button"
                className="flex items-center w-full py-6 text-left focus:outline-none"
                onClick={onClick}
            >
                {/* Circle Icon */}
                <span
                    className={`
            flex items-center justify-center w-[34px] h-[34px] min-w-[34px] rounded-full mr-6 
            transition-all duration-300 text-lg font-light
            ${isOpen
                            ? 'bg-transparent border-2 border-gold text-gold'
                            : 'bg-gold border-2 border-gold text-white'
                        }
          `}
                >
                    {isOpen ? '−' : '+'}
                </span>

                {/* Title */}
                <span className="text-[22px] font-semibold text-[#222]" style={{ fontFamily: 'var(--font-serif)' }}>
                    {title}
                </span>
            </button>

            {/* Accordion Content */}
            <div
                className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-[2000px] opacity-100 pb-10' : 'max-h-0 opacity-0'}
        `}
            >
                <div className="pl-[58px] pr-4 text-[#333] leading-[1.8] text-[15px]" style={{ fontFamily: '"Source Sans Pro", Arial, sans-serif' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;

