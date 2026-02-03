// Utility functions for encoding/decoding letter data in URLs

/**
 * Encode letter data to a URL-safe string
 */
export function encodeLetterData(letterData) {
    try {
        const json = JSON.stringify(letterData);
        // Use base64 encoding, then make it URL safe
        const encoded = btoa(unescape(encodeURIComponent(json)));
        return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch (error) {
        console.error('Failed to encode letter:', error);
        return null;
    }
}

/**
 * Decode letter data from a URL-safe string
 */
export function decodeLetterData(encoded) {
    try {
        // Restore base64 padding and characters
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
            base64 += '=';
        }
        const json = decodeURIComponent(escape(atob(base64)));
        return JSON.parse(json);
    } catch (error) {
        console.error('Failed to decode letter:', error);
        return null;
    }
}

/**
 * Generate a shareable URL for a letter
 */
export function generateShareUrl(letterData, senderName = '') {
    const encoded = encodeLetterData(letterData);
    if (!encoded) return null;

    // Get the base URL (works in browser)
    if (typeof window === 'undefined') return null;

    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    params.set('letter', encoded);
    if (senderName) {
        params.set('from', encodeURIComponent(senderName));
    }

    return `${baseUrl}?${params.toString()}`;
}

/**
 * Parse letter data from current URL
 */
export function parseLetterFromUrl() {
    if (typeof window === 'undefined') return null;

    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('letter');
    const from = params.get('from');

    if (!encoded) return null;

    const letterData = decodeLetterData(encoded);
    if (!letterData) return null;

    return {
        letter: letterData,
        from: from ? decodeURIComponent(from) : null
    };
}

/**
 * Check if current URL contains a shared letter
 */
export function hasSharedLetter() {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.has('letter');
}
