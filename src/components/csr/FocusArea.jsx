import React from 'react';
import Image from 'next/image';

const FocusArea = ({ title, image, description }) => {
    return (
        <div className="flex flex-col h-full group">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="bg-gold p-8 flex-grow">
                <h5 className="text-white text-xl font-serif font-semibold mb-4 tracking-wide uppercase">
                    {title}
                </h5>
                <p className="text-white font-sans text-[15px] leading-relaxed opacity-95">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default FocusArea;

