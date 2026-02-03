// Utility functions for encoding/decoding letter data in URLs

/**
 * Minify letter data to save character space
 */
function compressLetter(data) {
    if (!data) return null;
    return {
        r: data.recipient,
        l: data.lines.join('|'), // Join lines with pipe to save space
        s: data.signature,
        n: data.senderName,
        d: data.sticker,
        // Strip the "data:image/webp;base64," prefix from photos to save space
        p: data.photos ? data.photos.map(p => p.split(',')[1]) : []
    };
}

/**
 * Restore minified letter data
 */
function decompressLetter(min) {
    if (!min) return null;
    return {
        recipient: min.r,
        lines: typeof min.l === 'string' ? min.l.split('|') : (min.l || []),
        signature: min.s,
        senderName: min.n,
        sticker: min.d,
        // Add back the WebP prefix
        photos: min.p ? min.p.map(p => `data:image/webp;base64,${p}`) : []
    };
}

/**
 * Encode letter data to a URL-safe string
 */
export function encodeLetterData(letterData) {
    try {
        const compressed = compressLetter(letterData);
        const json = JSON.stringify(compressed);
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
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
            base64 += '=';
        }
        const json = decodeURIComponent(escape(atob(base64)));
        const compressed = JSON.parse(json);
        return decompressLetter(compressed);
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

    if (typeof window === 'undefined') return null;

    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    params.set('l', encoded);
    if (senderName) {
        params.set('f', encodeURIComponent(senderName));
    }

    return `${baseUrl}?${params.toString()}`;
}

/**
 * Parse letter data from current URL
 */
export function parseLetterFromUrl() {
    if (typeof window === 'undefined') return null;

    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('l') || params.get('letter');
    const from = params.get('f') || params.get('from');

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
    return params.has('l') || params.has('letter');
}
