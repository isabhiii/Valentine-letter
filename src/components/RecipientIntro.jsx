'use client';

import { motion } from 'framer-motion';
import { SPRING_GENTLE, PREMIUM_EASE, EASE_OUT_EXPO } from '@/lib/animations';
import { DoodleEnvelope, DoodleHeartFilled, DoodleSparkle, DoodleFlower } from './DoodleIcons';

// Background doodle elements with variety
const DOODLE_ELEMENTS = [
    { type: 'heart', size: 24 },
    { type: 'heart', size: 20 },
    { type: 'sparkle', size: 18 },
    { type: 'flower', size: 22 },
    { type: 'heart', size: 28 },
    { type: 'sparkle', size: 16 },
    { type: 'heart', size: 22 },
    { type: 'flower', size: 20 },
    { type: 'sparkle', size: 20 },
    { type: 'heart', size: 26 },
    { type: 'heart', size: 18 },
    { type: 'sparkle', size: 22 },
];

function BackgroundDoodle({ type, size, style }) {
    const color = '#c41e3a';

    switch (type) {
        case 'heart':
            return <DoodleHeartFilled size={size} color={color} style={style} />;
        case 'sparkle':
            return <DoodleSparkle size={size} style={{ ...style, color }} />;
        case 'flower':
            return <DoodleFlower size={size} style={{ ...style, color }} />;
        default:
            return <DoodleHeartFilled size={size} color={color} style={style} />;
    }
}

export default function RecipientIntro({ senderName, onOpen }) {
    return (
        <motion.div
            className="fixed inset-0 z-40 flex flex-col w-full h-full px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Top Spacer */}
            <div className="flex-grow min-h-[2rem]" />

            {/* Animated background doodles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {DOODLE_ELEMENTS.map((doodle, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${8 + (i * 7) % 84}%`,
                            top: `${12 + (i * 11) % 76}%`,
                        }}
                        initial={{ opacity: 0, scale: 0, rotate: -20 }}
                        animate={{
                            opacity: [0, 0.15, 0.1],
                            scale: [0.5, 1, 0.85],
                            y: [0, -25, 0],
                            rotate: [-10, 10, -10]
                        }}
                        transition={{
                            duration: 4.5 + (i % 3),
                            delay: i * 0.15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <BackgroundDoodle
                            type={doodle.type}
                            size={doodle.size}
                            style={{ opacity: 0.2 }}
                        />
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="text-center max-w-md relative z-10"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, ...SPRING_GENTLE }}
            >
                {/* Glowing envelope doodle */}
                <motion.div
                    className="relative inline-block mb-8"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 150,
                        damping: 12
                    }}
                >
                    <motion.div
                        className="text-[var(--heart-red)]"
                        animate={{
                            scale: [1, 1.08, 1],
                            filter: [
                                'drop-shadow(0 0 15px rgba(196, 30, 58, 0.25))',
                                'drop-shadow(0 0 30px rgba(196, 30, 58, 0.4))',
                                'drop-shadow(0 0 15px rgba(196, 30, 58, 0.25))'
                            ]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <DoodleEnvelope size={100} />
                    </motion.div>
                </motion.div>

                {/* Sender name with special styling */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT_EXPO }}
                >
                    <h2 className="font-handwritten text-5xl sm:text-7xl text-[var(--heart-red)] mb-4 drop-shadow-sm">
                        {senderName || 'Someone special'}
                    </h2>
                    <p className="font-serif text-2xl sm:text-3xl text-[var(--ink-deep)] leading-tight">
                        has written you
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl text-[var(--ink-deep)] leading-tight">
                        a love letter
                    </p>
                </motion.div>

                {/* Valentine's message with doodle heart */}
                <motion.div
                    className="flex items-center justify-center gap-2 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 1.2 }}
                >
                    <span className="font-handwritten text-lg sm:text-xl text-[var(--ink-deep)]">
                        This Valentine's Day
                    </span>
                    <DoodleHeartFilled size={18} color="var(--heart-red)" />
                </motion.div>

                {/* Open button with sparkle */}
                <motion.button
                    onClick={onOpen}
                    className="relative px-10 py-4 rounded-full bg-gradient-to-r from-[var(--heart-red)] to-[#e05555]
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
                        className="inline-flex items-center gap-2"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        Open Your Letter
                        <DoodleSparkle size={20} className="text-white" />
                    </motion.span>
                </motion.button>

                {/* Subtle hint */}
                <motion.p
                    className="mt-8 font-handwritten text-sm text-[var(--ink-deep)] opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 2 }}
                >
                    This letter will self-destruct after reading
                </motion.p>
            </motion.div>

            {/* Bottom Spacer */}
            <div className="flex-grow min-h-[2rem]" />

            {/* Bottom decorative doodle hearts */}
            <motion.div
                className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-5 z-20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 2.5 }}
            >
                {[20, 24, 20].map((size, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <DoodleHeartFilled size={size} color="var(--heart-red)" />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
