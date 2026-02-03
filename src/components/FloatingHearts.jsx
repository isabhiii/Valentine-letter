'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { TIMING } from '@/lib/constants';

const HEART_EMOJIS = ['❤️', '💕', '💗', '💖', '🌸', '✨'];

// Individual heart with staggered continuous spawning
function Heart({ id, onComplete }) {
    // Random properties set once per heart
    const props = useRef({
        x: 5 + Math.random() * 90, // Start position %
        size: 14 + Math.random() * 14, // 14-28px
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        duration: 6 + Math.random() * 4, // 6-10 seconds to float up
        sway: 20 + Math.random() * 30, // Horizontal sway amount
        delay: Math.random() * 0.5
    }).current;

    return (
        <motion.div
            className="absolute pointer-events-none will-change-transform"
            style={{
                left: `${props.x}%`,
                bottom: 0,
                fontSize: props.size,
            }}
            initial={{
                opacity: 0,
                y: 0,
                scale: 0.3,
            }}
            animate={{
                opacity: [0, 0.8, 0.7, 0.5, 0],
                y: [0, -100, -250, -400, -550],
                scale: [0.3, 1, 0.9, 0.7, 0.4],
                x: [0, props.sway * 0.3, -props.sway * 0.5, props.sway * 0.4, 0],
            }}
            transition={{
                duration: props.duration,
                delay: props.delay,
                ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out
                times: [0, 0.2, 0.5, 0.8, 1], // Control keyframe timing
            }}
            onAnimationComplete={() => onComplete(id)}
        >
            {props.emoji}
        </motion.div>
    );
}

export default function FloatingHearts({ isActive }) {
    const [hearts, setHearts] = useState([]);
    const heartIdRef = useRef(0);
    const spawnIntervalRef = useRef(null);

    // Remove heart when animation completes
    const handleHeartComplete = useCallback((id) => {
        setHearts(prev => prev.filter(h => h.id !== id));
    }, []);

    // Spawn a new heart
    const spawnHeart = useCallback(() => {
        const newHeart = { id: heartIdRef.current++ };
        setHearts(prev => [...prev, newHeart]);
    }, []);

    useEffect(() => {
        if (!isActive) {
            setHearts([]);
            if (spawnIntervalRef.current) {
                clearInterval(spawnIntervalRef.current);
                spawnIntervalRef.current = null;
            }
            return;
        }

        // Spawn initial batch with stagger
        for (let i = 0; i < 6; i++) {
            setTimeout(() => spawnHeart(), i * 300);
        }

        // Continuous spawning - one heart every 800ms
        spawnIntervalRef.current = setInterval(spawnHeart, 800);

        return () => {
            if (spawnIntervalRef.current) {
                clearInterval(spawnIntervalRef.current);
            }
        };
    }, [isActive, spawnHeart]);

    if (!isActive && hearts.length === 0) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-20">
            <AnimatePresence>
                {hearts.map((heart) => (
                    <Heart
                        key={heart.id}
                        id={heart.id}
                        onComplete={handleHeartComplete}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
