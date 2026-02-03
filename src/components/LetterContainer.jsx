'use client';

import { motion } from 'framer-motion';
import { letterVariants } from '@/lib/animations';

export default function LetterContainer({ children, className = '' }) {
    return (
        <motion.div
            className={`relative w-full max-w-[600px] mx-auto paper-texture letter-shadow rounded-lg ${className}`}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Inner content with padding */}
            <div className="relative z-10 py-10 px-8 sm:py-14 sm:px-12">
                {children}
            </div>

            {/* Subtle fold line */}
            <div
                className="absolute left-0 right-0 h-[1px] pointer-events-none opacity-10"
                style={{
                    top: '30%',
                    background: 'linear-gradient(90deg, transparent, var(--ink-deep), transparent)'
                }}
            />

            {/* Decorative corner */}
            <div
                className="absolute bottom-4 right-4 opacity-20 pointer-events-none"
            >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                        d="M35 5 C35 5, 30 10, 25 15 C20 20, 15 25, 5 35"
                        stroke="var(--rose-blush)"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />
                    <circle cx="35" cy="5" r="2" fill="var(--heart-red)" />
                    <circle cx="5" cy="35" r="2" fill="var(--heart-red)" />
                </svg>
            </div>
        </motion.div>
    );
}

