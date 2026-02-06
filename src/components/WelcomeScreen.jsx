'use client';

import { motion } from 'framer-motion';
import { buttonVariants, envelopeVariants, SPRING_GENTLE, PREMIUM_EASE } from '@/lib/animations';
import { AnimatedEnvelopeSequence, DoodlePen, DoodleDoubleHearts, DoodleFlame, DoodleSparkle } from './DoodleIcons';

export default function WelcomeScreen({ onWriteOwn, onUseDefault }) {
    return (
        <motion.div
            className="fixed inset-0 z-40 flex flex-col w-full h-full px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Top Spacer */}
            <div className="flex-grow min-h-[2rem]" />

            <motion.div
                className="text-center w-full max-w-lg mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, ...SPRING_GENTLE }}
            >
                {/* Animated envelope with seal break and open sequence */}
                <div className="flex justify-center items-center text-[var(--heart-red)] mb-6">
                    <AnimatedEnvelopeSequence size={90} />
                </div>

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
                    className="font-handwritten text-lg sm:text-xl md:text-2xl text-[var(--ink-deep)] opacity-80 mb-10 px-4"
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
                        className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[var(--heart-red)] to-[#ff4b4b]
              text-white font-handwritten text-2xl shadow-lg shadow-red-500/25
              hover:shadow-xl hover:shadow-red-500/35 transition-all"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="inline-flex items-center gap-2">
                            <DoodlePen size={20} className="text-white" />
                            Write Your Own Letter
                        </span>
                    </motion.button>

                    <motion.button
                        onClick={onUseDefault}
                        className="w-full px-8 py-4 rounded-full border-2 border-[var(--rose-blush)]
              text-[var(--ink-deep)] font-handwritten text-2xl
              hover:bg-[var(--rose-blush)]/10 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="inline-flex items-center gap-2">
                            <DoodleDoubleHearts size={20} className="text-[var(--heart-red)]" />
                            Use Sample Letter
                        </span>
                    </motion.button>
                </motion.div>




            </motion.div>

            {/* Bottom Spacer */}
            <div className="flex-grow min-h-[2rem]" />
        </motion.div>
    );
}
