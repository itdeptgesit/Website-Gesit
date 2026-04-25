import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="z-10 bg-white p-10 md:p-16 rounded-2xl shadow-xl max-w-lg w-full mx-4 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-8 shadow-sm">
                    <AlertTriangle className="w-10 h-10 text-[#bc9c33]" />
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-[#103065] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Indonesian Operations Temporarily Deferred
                </h1>

                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                    The Gesit Companies portal is currently undergoing scheduled maintenance to improve our digital services. We anticipate being back online shortly. Thank you for your patience.
                </p>

                <div className="h-1 w-24 bg-[#bc9c33] mx-auto rounded-full"></div>
            </div>
        </div>
    );
}
