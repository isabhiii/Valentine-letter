'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMING } from '@/lib/constants';
import { PREMIUM_EASE } from '@/lib/animations';
import FireEffect from './FireEffect';

export default function BurnTimer({ isActive, onBurnComplete, onReplay }) {
    const [timeLeft, setTimeLeft] = useState(TIMING.BURN_COUNTDOWN);
    const [isBurning, setIsBurning] = useState(false);
    const [burnPhase, setBurnPhase] = useState(0); // 0 to 1 progression
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

    // Burn phase progression (0 to 1 over 4 seconds)
    useEffect(() => {
        if (!isBurning || showFinalMessage) return;

        const duration = 4000; // 4 second burn
        const startTime = Date.now();

        const updatePhase = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / duration);
            setBurnPhase(progress);

            if (progress < 1) {
                requestAnimationFrame(updatePhase);
            } else {
                // Burn complete
                setTimeout(() => {
                    setShowFinalMessage(true);
                    onBurnComplete?.();
                }, 200);
            }
        };

        requestAnimationFrame(updatePhase);
    }, [isBurning, showFinalMessage, onBurnComplete]);

    const startBurn = useCallback(() => {
        setIsBurning(true);
        setBurnPhase(0);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const isWarning = timeLeft <= 10;

    const handleReplay = () => {
        setTimeLeft(TIMING.BURN_COUNTDOWN);
        setIsBurning(false);
        setBurnPhase(0);
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
                            animate={isWarning ? {
                                scale: [1, 1.05, 1],
                                transition: { duration: 0.8, repeat: Infinity }
                            } : {}}
                        >
                            <span className="opacity-70">This letter will vanish in </span>
                            <span className="font-bold">{formatTime(timeLeft)}</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* REALISTIC BURN EFFECT - overlays the actual letter */}
            <AnimatePresence>
                {isBurning && !showFinalMessage && (
                    <motion.div
                        className="fixed inset-0 z-40 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Fire effects layer - overlays the letter */}
                        <FireEffect intensity={1} burnPhase={burnPhase} />

                        {/* Crackling light flicker overlay */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'radial-gradient(ellipse at 50% 50%, rgba(255,150,50,0.15) 0%, transparent 70%)',
                            }}
                            animate={{
                                opacity: burnPhase > 0 ? [0.3, 0.6, 0.4, 0.7, 0.3] : 0,
                            }}
                            transition={{
                                duration: 0.3,
                                repeat: Infinity,
                                repeatType: 'loop',
                            }}
                        />
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
                        {/* Remaining embers floating */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full"
                                    style={{
                                        left: `${20 + Math.random() * 60}%`,
                                        top: `${60 + Math.random() * 30}%`,
                                        background: 'radial-gradient(circle, #ffaa00 0%, #ff6600 100%)',
                                        boxShadow: '0 0 6px #ff6600',
                                    }}
                                    animate={{
                                        y: [-20, -100, -200],
                                        x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
                                        opacity: [0.8, 0.6, 0],
                                        scale: [1, 0.8, 0.3],
                                    }}
                                    transition={{
                                        duration: 3,
                                        delay: i * 0.4,
                                        repeat: Infinity,
                                        ease: 'easeOut',
                                    }}
                                />
                            ))}
                        </div>

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
