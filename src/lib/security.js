import xss from 'xss';

/**
 * Sanitizes an input string to prevent XSS attacks.
 * @param {string} input - The raw input string.
 * @returns {string} - The sanitized string.
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return xss(input, {
        whiteList: {}, // No tags allowed for plain text inputs
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script']
    });
}

/**
 * Validates if a string is a valid external link.
 * @param {string} url - The URL to validate.
 * @returns {boolean}
 */
export function isValidLink(url) {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch (e) {
        return false;
    }
}

/**
 * Safely stringifies data for JSON-LD to prevent script injection.
 * @param {object} data - The data to stringify.
 * @returns {string} - Safe JSON string.
 */
export function safeJsonLd(data) {
    return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}
