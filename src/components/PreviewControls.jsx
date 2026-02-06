'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PREMIUM_EASE } from '@/lib/animations';

export default function PreviewControls({ shareUrl }) {
    const [copied, setCopied] = useState(false);

    if (!shareUrl) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    return (
        <motion.div
            className="fixed bottom-24 right-8 z-[60]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5, ease: PREMIUM_EASE }}
        >
            <motion.button
                onClick={handleCopy}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl transition-all
                    ${copied
                        ? 'bg-green-500 text-white'
                        : 'bg-[var(--ink-deep)] text-white hover:bg-[var(--heart-red)]'
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="text-lg">
                    {copied ? '✓' : '📋'}
                </span>
                <span className="font-handwritten text-lg whitespace-nowrap">
                    {copied ? 'Copied!' : 'Copy Magical Link'}
                </span>

                {/* Subtle pulse for orientation */}
                {!copied && (
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
            </motion.button>
        </motion.div>
    );
}
