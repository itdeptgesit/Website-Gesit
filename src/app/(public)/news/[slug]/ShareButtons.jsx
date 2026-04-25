"use client";

import { FaWhatsapp, FaInstagram, FaXTwitter, FaLink } from 'react-icons/fa6';
import { useState, useEffect } from 'react';

export default function ShareButtons({ title, slug }) {
    const [pageUrl, setPageUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPageUrl(window.location.href);
        }
    }, [slug]);

    const handleShare = (platform) => {
        const text = encodeURIComponent(title);
        const url = encodeURIComponent(pageUrl);

        switch (platform) {
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                break;
            case 'instagram':
                // Instagram doesn't have a direct URL sharer like Twitter/WA, so we copy the link and alert
                navigator.clipboard.writeText(pageUrl);
                alert("Link copied! You can now paste it into Instagram.");
                break;
            case 'link':
                navigator.clipboard.writeText(pageUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                break;
        }
    };

    const shareConfig = [
        { id: 'whatsapp', icon: <FaWhatsapp size={14} />, label: "WhatsApp" },
        { id: 'instagram', icon: <FaInstagram size={14} />, label: "Instagram" },
        { id: 'twitter', icon: <FaXTwitter size={14} />, label: "X / Twitter" },
        { id: 'link', icon: <FaLink size={14} />, label: "Copy Link" }
    ];

    return (
        <div className="flex items-center gap-3">
            <span className="text-[13px] text-slate-500 mr-1 font-medium">Share</span>
            {shareConfig.map((platform) => (
                <button
                    key={platform.id}
                    onClick={() => handleShare(platform.id)}
                    title={platform.label}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${copied && platform.id === 'link'
                            ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                            : 'border-slate-300 text-slate-500 hover:border-navy-deep hover:text-navy-deep'
                        }`}
                >
                    {platform.icon}
                </button>
            ))}
            {copied && <span className="text-[11px] text-green-600 ml-2 font-bold absolute right-0 -top-6">Copied!</span>}
        </div>
    );
}
