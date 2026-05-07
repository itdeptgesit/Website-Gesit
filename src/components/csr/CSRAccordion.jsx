'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CSRAccordion({ data }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="qodef-shortcode qodef-m qodef-accordion clear qodef-behavior--accordion qodef-layout--simple">
            {data.map((item, idx) => (
                <div key={idx} style={{ display: 'contents' }}>
                    <h5 
                        className={`qodef-accordion-title ${openIndex === idx ? 'qodef-is-open qodef--opened' : ''}`} 
                        onClick={() => toggleAccordion(idx)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="qodef-accordion-mark">
                            <span className="qodef-icon--plus">+</span>
                            <span className="qodef-icon--minus">-</span>
                        </span>
                        <span className="qodef-tab-title">{item.title}</span>
                    </h5>
                    <AnimatePresence>
                        {openIndex === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: 'hidden', maxHeight: 'none' }}
                                className="qodef-accordion-content open"
                            >
                                <div className="qodef-accordion-content-inner">
                                    {item.content.map((section, sIdx) => (
                                        <div key={sIdx}>
                                            {section.subtitle && <b data-stringify-type="bold">{section.subtitle}</b>}
                                            <ul>
                                                {section.items.map((li, liIdx) => (
                                                    <li key={liIdx} style={{ whiteSpace: 'pre-line' }}>{li}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
