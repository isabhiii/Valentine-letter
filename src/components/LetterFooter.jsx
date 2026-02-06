'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PREMIUM_EASE } from '@/lib/animations';
import { DoodleFlame, DoodleEnvelope } from './DoodleIcons';

export default function LetterFooter({ shareUrl, isRecipientMode, onBurn }) {
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

    return (
        <motion.div
            className="mt-12 flex flex-col items-center gap-6 border-t border-[var(--ink-deep)]/10 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: PREMIUM_EASE }}
        >
            {isRecipientMode ? (
                <div className="flex flex-col items-center gap-4 w-full">
                    <p className="font-handwritten text-xl text-[var(--ink-deep)] opacity-60 text-center max-w-[280px]">
                        This unique message exists only for you. When you are ready...
                    </p>
                    <motion.button
                        onClick={onBurn}
                        className="flex items-center gap-3 px-8 py-3 rounded-full bg-[var(--heart-red)] text-white shadow-lg shadow-red-500/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: ["0 4px 12px rgba(196, 30, 58, 0.2)", "0 4px 20px rgba(196, 30, 58, 0.4)", "0 4px 12px rgba(196, 30, 58, 0.2)"]
                        }}
                        transition={{
                            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                    >
                        <DoodleFlame size={22} className="text-white" />
                        <span className="font-handwritten text-xl font-bold">Burn After Reading</span>
                    </motion.button>
                </div>
            ) : (
                <>
                    {/* Simple Copy Button for Sender - less distracting */}
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
                            <span className="text-base">{copied ? '✓' : '🔗'}</span>
                            <span className="font-handwritten text-lg">
                                {copied ? 'Link Copied!' : 'Copy Magical Link'}
                            </span>
                        </motion.button>
                    )}
                </>
            )}
        </motion.div>
    );
}
