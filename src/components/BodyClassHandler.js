'use client';

import { useEffect } from 'react';

const LEGACY_CLASSES = "home wp-singular page-template page-template-page-full-width page-template-page-full-width-php page page-id-215 wp-theme-thetrial wp-child-theme-thetrial-child qode-framework-1.1.2 qodef-qi--no-touch qi-addons-for-elementor-1.9.5 qodef-back-to-top--enabled qodef-content-behind-header qodef-header--standard qodef-header-appearance--fixed qodef-header--transparent qodef-content--behind-header qodef-mobile-header--minimal qodef-mobile-header-appearance--fixed qodef-drop-down-second--full-width qodef-drop-down-second--default thetrial-core-1.0.1 thetrial-child-child-1.0.0 thetrial-1.1 qodef-content-grid-1100 qodef-header-standard--right qodef-search--covers-header elementor-default elementor-kit-5 elementor-page elementor-page-215";

export default function BodyClassHandler() {
    useEffect(() => {
        const body = document.body;
        const classes = LEGACY_CLASSES.split(' ');

        // Add classes
        classes.forEach(c => {
            if (c) body.classList.add(c);
        });

        return () => {
            // Remove classes on unmount
            classes.forEach(c => {
                if (c) body.classList.remove(c);
            });
        };
    }, []);

    return null;
}

