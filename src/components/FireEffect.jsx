'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Individual flame particle with flicker animation
function FlameParticle({ delay, x, y, size = 'medium' }) {
    const sizes = {
        small: { width: 8, height: 16 },
        medium: { width: 12, height: 24 },
        large: { width: 16, height: 32 }
    };
    const { width, height } = sizes[size];

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width,
                height,
                background: 'linear-gradient(to top, #ff3300 0%, #ff6600 30%, #ffaa00 60%, #ffcc00 100%)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                filter: 'blur(1px)',
                transformOrigin: 'bottom center',
            }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
                opacity: [0, 1, 0.8, 1, 0],
                scale: [0.3, 1, 0.9, 1.1, 0.5],
                y: [0, -20, -30, -50, -80],
                rotate: [0, -5, 5, -3, 0],
            }}
            transition={{
                duration: 1.5,
                delay,
                ease: [0.32, 0.72, 0, 1], // Emil's iOS-like curve
                times: [0, 0.2, 0.5, 0.8, 1],
            }}
        />
    );
}

// Glowing ember that floats upward
function RisingEmber({ delay, startX, startY }) {
    const driftX = useMemo(() => (Math.random() - 0.5) * 60, []);

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: 6,
                height: 6,
                background: 'radial-gradient(circle, #ffcc00 0%, #ff6600 50%, #ff3300 100%)',
                boxShadow: '0 0 8px #ff6600, 0 0 16px #ff330066',
            }}
            initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
            animate={{
                opacity: [0, 1, 1, 0.6, 0],
                scale: [0.5, 1.2, 1, 0.8, 0.3],
                y: [0, -50, -120, -200, -280],
                x: [0, driftX * 0.3, driftX * 0.6, driftX * 0.9, driftX],
            }}
            transition={{
                duration: 2.5,
                delay,
                ease: 'easeOut',
            }}
        />
    );
}

// Burn spot that expands from a point
function BurnSpot({ x, y, delay, size = 80 }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                background: 'radial-gradient(circle, rgba(10,5,0,0.95) 0%, rgba(40,20,5,0.9) 40%, rgba(80,40,10,0.7) 70%, transparent 100%)',
                boxShadow: 'inset 0 0 20px rgba(255,100,0,0.3)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay,
                duration: 0.8,
                type: 'spring',
                stiffness: 200,
                damping: 20,
            }}
        />
    );
}

// Edge flame that creeps inward
function EdgeFlame({ side, progress }) {
    const getStyle = () => {
        const common = {
            position: 'absolute',
            background: 'linear-gradient(var(--direction), rgba(255,100,0,0.9) 0%, rgba(200,50,0,0.6) 30%, transparent 100%)',
        };

        switch (side) {
            case 'top':
                return { ...common, top: 0, left: 0, right: 0, height: '30%', '--direction': 'to bottom' };
            case 'bottom':
                return { ...common, bottom: 0, left: 0, right: 0, height: '30%', '--direction': 'to top' };
            case 'left':
                return { ...common, top: 0, bottom: 0, left: 0, width: '25%', '--direction': 'to right' };
            case 'right':
                return { ...common, top: 0, bottom: 0, right: 0, width: '25%', '--direction': 'to left' };
            default:
                return common;
        }
    };

    return (
        <motion.div
            className="pointer-events-none fire-edge"
            style={getStyle()}
            initial={{ opacity: 0 }}
            animate={{ opacity: progress }}
            transition={{ duration: 0.3 }}
        />
    );
}

// Main fire effect component
export default function FireEffect({ intensity = 1, burnPhase = 0 }) {
    // Generate random positions for burn spots
    const burnSpots = useMemo(() => [
        { x: 20, y: 15, delay: 0.5, size: 100 },
        { x: 75, y: 25, delay: 0.8, size: 80 },
        { x: 45, y: 60, delay: 1.2, size: 120 },
        { x: 85, y: 70, delay: 1.5, size: 90 },
        { x: 15, y: 80, delay: 1.8, size: 70 },
    ], []);

    // Generate flame particles along edges
    const edgeFlames = useMemo(() => {
        const flames = [];
        // Top edge
        for (let i = 0; i < 8; i++) {
            flames.push({ x: 10 + i * 10, y: 5, delay: i * 0.1, size: 'medium' });
        }
        // Bottom edge
        for (let i = 0; i < 8; i++) {
            flames.push({ x: 10 + i * 10, y: 92, delay: 0.3 + i * 0.1, size: 'medium' });
        }
        // Left edge
        for (let i = 0; i < 5; i++) {
            flames.push({ x: 3, y: 15 + i * 15, delay: 0.2 + i * 0.15, size: 'small' });
        }
        // Right edge
        for (let i = 0; i < 5; i++) {
            flames.push({ x: 97, y: 15 + i * 15, delay: 0.4 + i * 0.15, size: 'small' });
        }
        return flames;
    }, []);

    // Generate rising embers
    const embers = useMemo(() => {
        const emberArray = [];
        for (let i = 0; i < 20; i++) {
            emberArray.push({
                startX: 10 + Math.random() * 80,
                startY: 30 + Math.random() * 50,
                delay: 0.5 + i * 0.15,
            });
        }
        return emberArray;
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Edge flames - glow from all sides */}
            <EdgeFlame side="top" progress={burnPhase > 0 ? Math.min(1, burnPhase * 2) : 0} />
            <EdgeFlame side="bottom" progress={burnPhase > 0 ? Math.min(1, burnPhase * 2) : 0} />
            <EdgeFlame side="left" progress={burnPhase > 0.2 ? Math.min(1, (burnPhase - 0.2) * 2) : 0} />
            <EdgeFlame side="right" progress={burnPhase > 0.2 ? Math.min(1, (burnPhase - 0.2) * 2) : 0} />

            {/* Burn spots - random holes that expand */}
            {burnPhase > 0.1 && burnSpots.map((spot, i) => (
                <BurnSpot key={`spot-${i}`} {...spot} />
            ))}

            {/* Flame particles along edges */}
            {burnPhase > 0 && edgeFlames.map((flame, i) => (
                <FlameParticle key={`flame-${i}`} {...flame} />
            ))}

            {/* Rising embers */}
            {burnPhase > 0.3 && embers.map((ember, i) => (
                <RisingEmber key={`ember-${i}`} {...ember} />
            ))}

            {/* Center darkening overlay */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(10,5,0,0.95) 0%, rgba(20,10,5,0.9) 50%, rgba(30,15,5,0.8) 100%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: burnPhase > 0.5 ? Math.min(1, (burnPhase - 0.5) * 2) : 0 }}
                transition={{ duration: 0.5 }}
            />

            {/* Final ash/smoke overlay */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to top, rgba(50,40,30,0.3) 0%, transparent 50%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: burnPhase > 0.7 ? 1 : 0 }}
                transition={{ duration: 0.8 }}
            />
        </div>
    );
}
