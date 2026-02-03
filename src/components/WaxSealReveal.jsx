'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { DoodleHeart } from './DoodleIcons';

// Premium spring configuration (Emil Kowalski inspired)
const SPRING_CONFIG = {
    stiffness: 400,
    damping: 25,
    mass: 0.8
};

// Gentle spring for hover
const HOVER_SPRING = {
    type: "spring",
    stiffness: 300,
    damping: 20
};

export default function WaxSealReveal({ onRevealComplete }) {
    const [isPressed, setIsPressed] = useState(false);
    const [isBreaking, setIsBreaking] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const holdTimer = useRef(null);

    // Handle press start - requires hold
    const handlePressStart = () => {
        if (isBreaking || isRevealed) return;
        setIsPressed(true);

        // Start break after short hold
        holdTimer.current = setTimeout(() => {
            triggerBreak();
        }, 400);
    };

    // Handle press end
    const handlePressEnd = () => {
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
        }
        if (!isBreaking) {
            setIsPressed(false);
        }
    };

    // Trigger the break animation
    const triggerBreak = () => {
        setIsBreaking(true);
        setIsPressed(false);

        // Wait for animation then reveal
        setTimeout(() => {
            setIsRevealed(true);
            onRevealComplete?.();
        }, 900);
    };

    return (
        <div className="relative w-full min-h-[380px] flex flex-col items-center justify-center py-8">
            {/* Instruction text */}
            <AnimatePresence>
                {!isRevealed && (
                    <motion.p
                        className="font-handwritten text-xl sm:text-2xl text-[var(--ink-deep)] mb-10 text-center px-4"
                        style={{ opacity: 0.6 }}
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {isPressed ? "Hold to break..." : "Press & hold the seal"}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Wax Seal Container */}
            <AnimatePresence mode="wait">
                {!isRevealed && (
                    <motion.div
                        className="relative"
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{
                            scale: isBreaking ? [1, 1.15, 0] : 1,
                            rotate: isBreaking ? [0, 8, -180] : 0,
                            opacity: isBreaking ? [1, 1, 0] : 1
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={isBreaking ? {
                            duration: 0.7,
                            ease: [0.36, 0, 0.66, -0.56], // Dramatic ease-in-back
                            times: [0, 0.4, 1]
                        } : {
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1
                        }}
                    >
                        {/* Outer glow ring */}
                        {!isBreaking && (
                            <motion.div
                                className="absolute -inset-4 rounded-full pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle, rgba(196,30,58,0.15) 0%, transparent 70%)',
                                }}
                                animate={isPressed ? {
                                    scale: [1, 1.2, 1.1],
                                    opacity: [0.5, 0.8, 0.6]
                                } : {
                                    scale: [1, 1.15, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: isPressed ? 0.5 : 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        )}

                        {/* Main Seal Button */}
                        <motion.button
                            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full cursor-pointer select-none"
                            onMouseDown={handlePressStart}
                            onMouseUp={handlePressEnd}
                            onMouseLeave={handlePressEnd}
                            onTouchStart={handlePressStart}
                            onTouchEnd={handlePressEnd}
                            animate={isPressed && !isBreaking ? { scale: 0.92 } : { scale: 1 }}
                            whileHover={!isPressed && !isBreaking ? { scale: 1.05 } : {}}
                            transition={HOVER_SPRING}
                            style={{
                                // 3D wax seal gradient
                                background: `
                  radial-gradient(ellipse 60% 40% at 35% 25%, rgba(255,255,255,0.25) 0%, transparent 50%),
                  radial-gradient(ellipse 80% 60% at 50% 50%, #dc3545 0%, #c41e3a 40%, #9b1b30 70%, #6d1321 100%)
                `,
                                boxShadow: isPressed ? `
                  inset 0 3px 8px rgba(0,0,0,0.4),
                  inset 0 -2px 4px rgba(255,255,255,0.1),
                  0 2px 6px rgba(0,0,0,0.3),
                  0 4px 12px rgba(156,27,48,0.3)
                ` : `
                  inset 0 -6px 12px rgba(0,0,0,0.35),
                  inset 0 6px 12px rgba(255,255,255,0.15),
                  0 6px 16px rgba(0,0,0,0.35),
                  0 12px 28px rgba(156,27,48,0.35)
                `
                            }}
                        >
                            {/* Wax texture overlay */}
                            <div
                                className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                    mixBlendMode: 'overlay'
                                }}
                            />

                            {/* Embossed heart */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={isBreaking ? {
                                    scale: [1, 1.5, 0],
                                    rotate: [0, 30, 90],
                                    opacity: [1, 0.5, 0]
                                } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <DoodleHeart
                                    size={44}
                                    className="text-[#f5d0d0]"
                                    style={{
                                        filter: 'drop-shadow(1px 1px 0 rgba(0,0,0,0.3)) drop-shadow(-1px -1px 0 rgba(255,200,200,0.2))'
                                    }}
                                />
                            </motion.div>

                            {/* Press ring indicator */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 pointer-events-none"
                                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                                animate={isPressed ? {
                                    scale: [1, 0.85],
                                    opacity: [0.3, 0.8],
                                    borderWidth: ['2px', '4px']
                                } : {
                                    scale: 1,
                                    opacity: 0.3
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.button>

                        {/* Breaking wax pieces - fly outward */}
                        <AnimatePresence>
                            {isBreaking && (
                                <>
                                    {/* Large dramatic pieces */}
                                    {[...Array(6)].map((_, i) => {
                                        const angle = (i * 60) + Math.random() * 30;
                                        const distance = 100 + Math.random() * 60;
                                        const size = 16 + Math.random() * 12;

                                        return (
                                            <motion.div
                                                key={`piece-${i}`}
                                                className="absolute rounded-sm"
                                                style={{
                                                    width: size,
                                                    height: size * 0.7,
                                                    left: '50%',
                                                    top: '50%',
                                                    marginLeft: -size / 2,
                                                    marginTop: -size / 2,
                                                    background: `linear-gradient(${45 + i * 30}deg, #dc3545 0%, #9b1b30 100%)`,
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                                                }}
                                                initial={{
                                                    x: 0,
                                                    y: 0,
                                                    scale: 0,
                                                    rotate: 0,
                                                    opacity: 1
                                                }}
                                                animate={{
                                                    x: Math.cos(angle * Math.PI / 180) * distance,
                                                    y: Math.sin(angle * Math.PI / 180) * distance + 40,
                                                    scale: [0, 1.2, 0.8, 0],
                                                    rotate: 180 + Math.random() * 360,
                                                    opacity: [0, 1, 1, 0]
                                                }}
                                                transition={{
                                                    duration: 0.9,
                                                    delay: i * 0.03,
                                                    ease: [0.34, 1.56, 0.64, 1], // Spring-like overshoot
                                                    times: [0, 0.2, 0.6, 1]
                                                }}
                                            />
                                        );
                                    })}

                                    {/* Small dust/shatter particles */}
                                    {[...Array(12)].map((_, i) => {
                                        const angle = i * 30 + Math.random() * 20;
                                        const distance = 50 + Math.random() * 80;

                                        return (
                                            <motion.div
                                                key={`dust-${i}`}
                                                className="absolute rounded-full"
                                                style={{
                                                    width: 4 + Math.random() * 4,
                                                    height: 4 + Math.random() * 4,
                                                    left: '50%',
                                                    top: '50%',
                                                    background: '#c41e3a',
                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                                                }}
                                                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                                                animate={{
                                                    x: Math.cos(angle * Math.PI / 180) * distance,
                                                    y: Math.sin(angle * Math.PI / 180) * distance + 20,
                                                    scale: [0, 1, 0],
                                                    opacity: [0, 0.8, 0]
                                                }}
                                                transition={{
                                                    duration: 0.7,
                                                    delay: 0.05 + i * 0.02,
                                                    ease: "easeOut"
                                                }}
                                            />
                                        );
                                    })}

                                    {/* Central flash/burst */}
                                    <motion.div
                                        className="absolute rounded-full pointer-events-none"
                                        style={{
                                            width: 120,
                                            height: 120,
                                            left: '50%',
                                            top: '50%',
                                            marginLeft: -60,
                                            marginTop: -60,
                                            background: 'radial-gradient(circle, rgba(255,200,200,0.6) 0%, transparent 70%)'
                                        }}
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: [0.5, 2, 2.5], opacity: [0, 0.8, 0] }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint text */}
            <AnimatePresence>
                {!isRevealed && !isBreaking && (
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--heart-red)]/10"
                            animate={isPressed ? { scale: 1.05 } : { scale: 1 }}
                        >
                            <motion.span
                                className="w-2 h-2 rounded-full bg-[var(--heart-red)]"
                                animate={{
                                    scale: isPressed ? [1, 1.5, 1] : [1, 1.2, 1],
                                    opacity: isPressed ? 1 : [0.5, 1, 0.5]
                                }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                            />
                            <span className="font-handwritten text-[var(--heart-red)] text-sm">
                                {isPressed ? "Breaking..." : "Hold to break seal"}
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
