'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { DoodleHeartFilled } from './DoodleIcons';

// Colors for variety
const HEART_COLORS = [
    '#c41e3a', // Heart red
    '#e8a4a4', // Rose blush
    '#d4af37', // Gold
    '#db7093', // Pale violet red
    '#cd5c5c', // Indian red
];

// Individual doodle heart with continuous spawning
function DoodleFloatingHeart({ id, onComplete }) {
    const props = useRef({
        x: 5 + Math.random() * 90,
        size: 18 + Math.random() * 18,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        duration: 7 + Math.random() * 4,
        sway: 25 + Math.random() * 35,
        delay: Math.random() * 0.5,
        rotation: -15 + Math.random() * 30
    }).current;

    return (
        <motion.div
            className="absolute pointer-events-none will-change-transform"
            style={{
                left: `${props.x}%`,
                bottom: 0,
            }}
            initial={{
                opacity: 0,
                y: 0,
                scale: 0.3,
                rotate: props.rotation
            }}
            animate={{
                opacity: [0, 0.7, 0.6, 0.4, 0],
                y: [0, -120, -280, -420, -580],
                scale: [0.3, 1, 0.85, 0.65, 0.3],
                x: [0, props.sway * 0.4, -props.sway * 0.5, props.sway * 0.3, 0],
                rotate: [props.rotation, props.rotation + 10, props.rotation - 5, props.rotation + 8, props.rotation]
            }}
            transition={{
                duration: props.duration,
                delay: props.delay,
                ease: [0.25, 0.1, 0.25, 1],
                times: [0, 0.2, 0.5, 0.8, 1],
            }}
            onAnimationComplete={() => onComplete(id)}
        >
            <DoodleHeartFilled
                size={props.size}
                color={props.color}
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
        </motion.div>
    );
}

export default function FloatingHearts({ isActive }) {
    const [hearts, setHearts] = useState([]);
    const heartIdRef = useRef(0);
    const spawnIntervalRef = useRef(null);

    const handleHeartComplete = useCallback((id) => {
        setHearts(prev => prev.filter(h => h.id !== id));
    }, []);

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
        for (let i = 0; i < 5; i++) {
            setTimeout(() => spawnHeart(), i * 350);
        }

        // Continuous spawning
        spawnIntervalRef.current = setInterval(spawnHeart, 900);

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
                    <DoodleFloatingHeart
                        key={heart.id}
                        id={heart.id}
                        onComplete={handleHeartComplete}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
