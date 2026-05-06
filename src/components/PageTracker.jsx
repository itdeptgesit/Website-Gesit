'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // We only track public pages, ignore admin/dashboard/api
        if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/api')) {
            return;
        }

        const trackView = async () => {
            try {
                // Map paths to friendly names for the dashboard
                const nameMap = {
                    '/': 'Home Page',
                    '/csr': 'CSR Page',
                    '/about-us': 'About Us',
                    '/news': 'News Archive',
                    '/our-business': 'Business Overview',
                    '/our-business/manufacturing': 'Manufacturing',
                    '/our-business/property': 'Property',
                    '/our-business/natural-resources': 'Natural Resources',
                    '/our-business/trading-services': 'Trading & Services',
                    '/contact-us': 'Contact Us',
                    '/career': 'Career Page'
                };

                const friendlyName = nameMap[pathname] || pathname;

                await fetch('/api/analytics/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        path: pathname,
                        name: friendlyName
                    }),
                });
            } catch (err) {
                // Fail silently to not disturb user experience
                console.warn('Analytics failed to log');
            }
        };

        // Delay slightly to ensure page load feels finished
        const timer = setTimeout(trackView, 1500);
        return () => clearTimeout(timer);
    }, [pathname]);

    return null; // This component doesn't render anything
}
