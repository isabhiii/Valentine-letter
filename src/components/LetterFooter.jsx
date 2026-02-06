'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PREMIUM_EASE } from '@/lib/animations';

export default function LetterFooter({ shareUrl, timeLeft }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const isVisible = timeLeft !== null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="mt-12 flex flex-col items-center gap-4 border-t border-[var(--ink-deep)]/10 pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: PREMIUM_EASE }}
                >
                    {/* Timer Text */}
                    <div className="font-handwritten text-xl text-[var(--ink-deep)] opacity-60">
                        This letter will vanish in <span className="font-bold">{formatTime(timeLeft)}</span>
                    </div>

                    {/* Simple Copy Button - less distracting */}
                    {shareUrl && (
                        <motion.button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all
                                ${copied
                                    ? 'bg-green-500/10 border-green-500/50 text-green-700'
                                    : 'border-[var(--ink-deep)]/20 text-[var(--ink-deep)] hover:bg-[var(--ink-deep)]/5'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-base">{copied ? '✓' : '📋'}</span>
                            <span className="font-handwritten text-lg">
                                {copied ? 'Link Copied!' : 'Copy Magical Link'}
                            </span>
                        </motion.button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
