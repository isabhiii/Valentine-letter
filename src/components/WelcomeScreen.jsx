'use client';

import { motion } from 'framer-motion';
import { SPRING_GENTLE, PREMIUM_EASE } from '@/lib/animations';

export default function WelcomeScreen({ onWriteOwn, onUseDefault }) {
    return (
        <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="text-center max-w-md"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, ...SPRING_GENTLE }}
            >
                {/* Heart icon */}
                <motion.div
                    className="text-6xl sm:text-7xl mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                        damping: 12
                    }}
                >
                    💌
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="font-serif text-4xl sm:text-5xl text-[var(--ink-deep)] mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    A Digital Love Letter
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="font-handwritten text-2xl sm:text-3xl text-[var(--ink-deep)] opacity-80 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.6 }}
                >
                    Create something beautiful for someone special
                </motion.p>

                {/* Buttons */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.button
                        onClick={onWriteOwn}
                        className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[var(--heart-red)] to-[#e05555]
              text-white font-handwritten text-2xl shadow-lg shadow-red-500/25
              hover:shadow-xl hover:shadow-red-500/35 transition-all"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        ✍️ Write Your Own Letter
                    </motion.button>

                    <motion.button
                        onClick={onUseDefault}
                        className="w-full px-8 py-4 rounded-full border-2 border-[var(--rose-blush)]
              text-[var(--ink-deep)] font-handwritten text-2xl
              hover:bg-[var(--rose-blush)]/10 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        💕 Use Sample Letter
                    </motion.button>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    className="mt-8 font-handwritten text-sm text-[var(--ink-deep)] opacity-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1.2 }}
                >
                    Your letter will self-destruct after 60 seconds 🔥
                </motion.p>
            </motion.div>
        </motion.div>
    );
}
