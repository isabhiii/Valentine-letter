'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMING } from '@/lib/constants';
import { timerPulseVariants, PREMIUM_EASE } from '@/lib/animations';

// Simplified ember - just CSS animations, no JS tracking
function Ember({ style }) {
    return (
        <div
            className="absolute w-1.5 h-1.5 rounded-full animate-ember"
            style={{
                ...style,
                background: 'radial-gradient(circle, #ffaa00 0%, #ff6600 100%)',
                boxShadow: '0 0 6px #ff6600',
            }}
        />
    );
}

export default function BurnTimer({ isActive, onBurnComplete, onReplay }) {
    const [timeLeft, setTimeLeft] = useState(TIMING.BURN_COUNTDOWN);
    const [isBurning, setIsBurning] = useState(false);
    const [showFinalMessage, setShowFinalMessage] = useState(false);

    // Countdown timer
    useEffect(() => {
        if (!isActive || isBurning) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    startBurn();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive, isBurning]);

    // Start burn effect - simplified, CSS-driven
    const startBurn = useCallback(() => {
        setIsBurning(true);

        // Show final message after burn animation
        setTimeout(() => {
            setShowFinalMessage(true);
            onBurnComplete?.();
        }, 2000);
    }, [onBurnComplete]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const isWarning = timeLeft <= 10;

    const handleReplay = () => {
        setTimeLeft(TIMING.BURN_COUNTDOWN);
        setIsBurning(false);
        setShowFinalMessage(false);
        onReplay?.();
    };

    if (!isActive) return null;

    return (
        <>
            {/* Timer display */}
            <AnimatePresence>
                {!isBurning && !showFinalMessage && (
                    <motion.div
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: PREMIUM_EASE }}
                    >
                        <motion.div
                            className={`px-5 py-2.5 rounded-full font-handwritten text-xl backdrop-blur-sm
                ${isWarning
                                    ? 'bg-[var(--heart-red)]/15 text-[var(--heart-red)]'
                                    : 'bg-[var(--gold-accent)]/15 text-[var(--gold-accent)]'
                                }`}
                            variants={timerPulseVariants}
                            animate={isWarning ? "warning" : "normal"}
                        >
                            <span className="opacity-70">This letter will vanish in </span>
                            <span className="font-bold">{formatTime(timeLeft)}</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Burn overlay - simplified CSS-driven animation */}
            <AnimatePresence>
                {isBurning && !showFinalMessage && (
                    <motion.div
                        className="fixed inset-0 z-50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Vignette burn effect */}
                        <motion.div
                            className="absolute inset-0 burn-vignette"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                        />

                        {/* Center darkening */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.9 }}
                            transition={{ duration: 1.8, delay: 0.5 }}
                            style={{
                                background: 'radial-gradient(ellipse at center, rgba(15,10,5,0.95) 0%, rgba(10,5,0,1) 100%)'
                            }}
                        />

                        {/* CSS-animated embers - no JS state updates */}
                        <div className="ember-container">
                            {[...Array(12)].map((_, i) => (
                                <Ember
                                    key={i}
                                    style={{
                                        left: `${15 + Math.random() * 70}%`,
                                        top: `${30 + Math.random() * 40}%`,
                                        animationDelay: `${i * 0.15}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Final message */}
            <AnimatePresence>
                {showFinalMessage && (
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            background: 'radial-gradient(ellipse at center, #1a1410 0%, #0a0705 100%)'
                        }}
                    >
                        <motion.div
                            className="text-center px-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: PREMIUM_EASE }}
                        >
                            <motion.p
                                className="font-handwritten text-2xl sm:text-3xl text-[#f5e6d3] mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                This moment was ours alone
                            </motion.p>

                            <motion.p
                                className="font-serif text-lg text-[#a09080] italic mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ delay: 0.8 }}
                            >
                                Some words exist only once
                            </motion.p>

                            <motion.div
                                className="text-5xl mb-10"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 1,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15
                                }}
                            >
                                <span className="text-[#c41e3a]">♥</span>
                            </motion.div>

                            <motion.button
                                className="px-10 py-4 rounded-full bg-gradient-to-r from-[#c41e3a] to-[#8b1528] 
                  text-white font-handwritten text-xl shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.3 }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleReplay}
                            >
                                Read Again ✨
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
