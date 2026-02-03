'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LETTER_CONTENT } from '@/lib/constants';
import { buttonVariants, PREMIUM_EASE, SPRING_GENTLE } from '@/lib/animations';

export default function LetterEditor({ onSave, onCancel }) {
    const [recipient, setRecipient] = useState(LETTER_CONTENT.recipient);
    const [letterText, setLetterText] = useState(LETTER_CONTENT.lines.join('\n'));
    const [signature, setSignature] = useState(LETTER_CONTENT.signature);
    const [senderName, setSenderName] = useState('');

    const handleSave = () => {
        const lines = letterText.split('\n').filter(line => line.trim() !== '' || letterText.split('\n').indexOf(line) > 0);
        onSave({
            recipient: recipient || 'My Dearest',
            lines: lines.length > 0 ? lines : LETTER_CONTENT.lines,
            signature: signature || 'Forever Yours',
            senderName: senderName || '♥'
        });
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(253,250,243,0.98) 0%, rgba(248,232,232,0.98) 100%)'
            }}
        >
            <motion.div
                className="w-full max-w-[600px] paper-texture letter-shadow rounded-xl p-6 sm:p-10 my-8"
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={SPRING_GENTLE}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h1
                        className="font-serif text-2xl sm:text-3xl text-[var(--ink-deep)] mb-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Write Your Letter
                    </motion.h1>
                    <motion.p
                        className="font-handwritten text-lg text-[var(--ink-deep)] opacity-60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.3 }}
                    >
                        Pour your heart onto paper ✨
                    </motion.p>
                </div>

                {/* Form */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* Recipient */}
                    <div>
                        <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                            To whom? 💌
                        </label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="My Dearest"
                            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-[var(--rose-blush)]/30 
                font-serif text-[var(--ink-deep)] placeholder:text-[var(--ink-deep)]/30
                focus:outline-none focus:border-[var(--heart-red)]/50 focus:ring-2 focus:ring-[var(--heart-red)]/20
                transition-all"
                        />
                    </div>

                    {/* Letter body */}
                    <div>
                        <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                            Your message 💕
                        </label>
                        <textarea
                            value={letterText}
                            onChange={(e) => setLetterText(e.target.value)}
                            placeholder="Write from the heart..."
                            rows={10}
                            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-[var(--rose-blush)]/30 
                font-handwritten text-lg text-[var(--ink-deep)] placeholder:text-[var(--ink-deep)]/30
                focus:outline-none focus:border-[var(--heart-red)]/50 focus:ring-2 focus:ring-[var(--heart-red)]/20
                transition-all resize-none leading-relaxed"
                        />
                        <p className="mt-1 text-sm font-handwritten text-[var(--ink-deep)]/50">
                            Each line will appear separately with animation
                        </p>
                    </div>

                    {/* Signature */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                                Sign-off
                            </label>
                            <input
                                type="text"
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                placeholder="Forever Yours"
                                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-[var(--rose-blush)]/30 
                  font-handwritten text-[var(--ink-deep)] placeholder:text-[var(--ink-deep)]/30
                  focus:outline-none focus:border-[var(--heart-red)]/50 focus:ring-2 focus:ring-[var(--heart-red)]/20
                  transition-all"
                            />
                        </div>
                        <div>
                            <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                                Your name
                            </label>
                            <input
                                type="text"
                                value={senderName}
                                onChange={(e) => setSenderName(e.target.value)}
                                placeholder="♥"
                                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-[var(--rose-blush)]/30 
                  font-handwritten text-[var(--ink-deep)] placeholder:text-[var(--ink-deep)]/30
                  focus:outline-none focus:border-[var(--heart-red)]/50 focus:ring-2 focus:ring-[var(--heart-red)]/20
                  transition-all"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <motion.button
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 rounded-full border-2 border-[var(--ink-deep)]/20 
                text-[var(--ink-deep)] font-handwritten text-lg
                hover:bg-[var(--ink-deep)]/5 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Use Default
                        </motion.button>
                        <motion.button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--heart-red)] to-[#e05555]
                text-white font-handwritten text-lg shadow-lg shadow-red-500/20
                hover:shadow-xl hover:shadow-red-500/30 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Create Letter ✨
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
