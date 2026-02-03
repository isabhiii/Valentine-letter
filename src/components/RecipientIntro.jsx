'use client';

import { motion } from 'framer-motion';
import { SPRING_GENTLE, PREMIUM_EASE, EASE_OUT_EXPO } from '@/lib/animations';

export default function RecipientIntro({ senderName, onOpen }) {
    return (
        <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Animated background hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl sm:text-3xl opacity-20"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.2, 0.1],
                            scale: [0.5, 1, 0.8],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            delay: Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {['💕', '💗', '💖', '✨', '💌'][Math.floor(Math.random() * 5)]}
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="text-center max-w-md relative z-10"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, ...SPRING_GENTLE }}
            >
                {/* Glowing heart */}
                <motion.div
                    className="relative inline-block mb-8"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 150,
                        damping: 12
                    }}
                >
                    <motion.div
                        className="text-7xl sm:text-8xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            filter: [
                                'drop-shadow(0 0 20px rgba(196, 30, 58, 0.3))',
                                'drop-shadow(0 0 40px rgba(196, 30, 58, 0.5))',
                                'drop-shadow(0 0 20px rgba(196, 30, 58, 0.3))'
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        💌
                    </motion.div>
                </motion.div>

                {/* Sender name with special styling */}
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT_EXPO }}
                >
                    <p className="font-handwritten text-xl sm:text-2xl text-[var(--heart-red)] mb-2">
                        {senderName || 'Someone special'}
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl text-[var(--ink-deep)]">
                        has written you
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl text-[var(--ink-deep)]">
                        a love letter
                    </p>
                </motion.div>

                {/* Valentine's message */}
                <motion.p
                    className="font-handwritten text-lg sm:text-xl text-[var(--ink-deep)] opacity-60 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.2 }}
                >
                    This Valentine's Day ❤️
                </motion.p>

                {/* Open button */}
                <motion.button
                    onClick={onOpen}
                    className="px-10 py-4 rounded-full bg-gradient-to-r from-[var(--heart-red)] to-[#e05555]
            text-white font-handwritten text-xl sm:text-2xl shadow-xl shadow-red-500/30
            hover:shadow-2xl hover:shadow-red-500/40 transition-all
            border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.span
                        className="inline-block"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        Open Your Letter ✨
                    </motion.span>
                </motion.button>

                {/* Subtle hint */}
                <motion.p
                    className="mt-8 font-handwritten text-sm text-[var(--ink-deep)] opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 2 }}
                >
                    ⏱️ This letter will self-destruct after reading
                </motion.p>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 2.5 }}
            >
                {['💕', '💗', '💕'].map((heart, i) => (
                    <motion.span
                        key={i}
                        className="text-2xl"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {heart}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
}
