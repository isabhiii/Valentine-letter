'use client';

import { motion } from 'framer-motion';
import { envelopeVariants, SPRING_GENTLE } from '@/lib/animations';
import { DoodleSparkle } from './DoodleIcons';

export default function EnvelopeIntro({ onOpen }) {
    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.button
                onClick={onOpen}
                className="relative cursor-pointer focus:outline-none"
                variants={envelopeVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                exit="exit"
            >
                {/* Envelope SVG */}
                <svg
                    width="280"
                    height="200"
                    viewBox="0 0 280 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                >
                    {/* Envelope body */}
                    <rect
                        x="10"
                        y="40"
                        width="260"
                        height="150"
                        rx="8"
                        fill="#fdfaf3"
                        stroke="#e8d4c4"
                        strokeWidth="2"
                    />

                    {/* Inner shadow for depth */}
                    <rect
                        x="15"
                        y="45"
                        width="250"
                        height="140"
                        rx="6"
                        fill="url(#envelopeGradient)"
                    />

                    {/* Envelope flap */}
                    <path
                        d="M10 48 L140 120 L270 48"
                        fill="none"
                        stroke="#d4c4b4"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />

                    {/* Top triangle flap */}
                    <path
                        d="M10 40 L140 110 L270 40 L270 48 L140 118 L10 48 Z"
                        fill="#f8f0e8"
                        stroke="#e8d4c4"
                        strokeWidth="1"
                    />

                    {/* Decorative heart pattern */}
                    <g opacity="0.15">
                        <path d="M60 100 C60 95, 70 95, 70 100 C70 105, 65 110, 60 115 C55 110, 50 105, 50 100 C50 95, 60 95, 60 100" fill="#c41e3a" />
                        <path d="M220 100 C220 95, 230 95, 230 100 C230 105, 225 110, 220 115 C215 110, 210 105, 210 100 C210 95, 220 95, 220 100" fill="#c41e3a" />
                    </g>

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fdfaf3" />
                            <stop offset="100%" stopColor="#f5efe3" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Heart Seal */}
                <motion.div
                    className="absolute top-[100px] left-1/2 -translate-x-1/2 seal-glow"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <circle cx="25" cy="25" r="22" fill="#c41e3a" />
                        <path
                            d="M25 35 C20 30, 12 24, 12 18 C12 13, 17 10, 22 13 C24 14.5, 25 16, 25 16 C25 16, 26 14.5, 28 13 C33 10, 38 13, 38 18 C38 24, 30 30, 25 35Z"
                            fill="#fdfaf3"
                        />
                    </svg>
                </motion.div>

                {/* Tap to Open text */}
                <motion.p
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-handwritten text-xl text-[var(--ink-deep)] whitespace-nowrap opacity-70"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="inline-flex items-center gap-1">
                        Tap to Open
                        <DoodleSparkle size={16} className="text-white" />
                    </span>
                </motion.p>
            </motion.button>
        </motion.div>
    );
}
