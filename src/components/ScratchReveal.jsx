'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMING } from '@/lib/constants';
import { scratchOverlayVariants, PREMIUM_EASE } from '@/lib/animations';

export default function ScratchReveal({ onRevealComplete }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isScratching, setIsScratching] = useState(false);
    const [scratchProgress, setScratchProgress] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [canvasReady, setCanvasReady] = useState(false);

    // Initialize canvas
    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const updateDimensions = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            const ctx = canvas.getContext('2d');

            // Create gradient scratch overlay
            const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
            gradient.addColorStop(0, '#f5e6d3');
            gradient.addColorStop(0.5, '#e8d4c4');
            gradient.addColorStop(1, '#f0e0d0');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, rect.width, rect.height);

            // Add subtle pattern
            ctx.globalAlpha = 0.15;
            for (let i = 0; i < 80; i++) {
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;
                const radius = Math.random() * 3 + 1;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = '#c9b8a8';
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            // Add romantic overlay text
            ctx.font = '600 24px Caveat, cursive';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(196, 30, 58, 0.4)';
            ctx.fillText('🌹 Scratch to Reveal 🌹', rect.width / 2, rect.height / 2);

            setCanvasReady(true);
        };

        // Small delay to ensure container is sized
        const timer = setTimeout(updateDimensions, 100);
        window.addEventListener('resize', updateDimensions);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    // Calculate scratch progress
    const calculateProgress = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || canvas.width === 0) return 0;

        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let transparent = 0;
        const total = pixels.length / 4;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) transparent++;
        }

        return transparent / total;
    }, []);

    // Handle scratch
    const scratch = useCallback((x, y) => {
        const canvas = canvasRef.current;
        if (!canvas || isRevealed) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const canvasX = x - rect.left;
        const canvasY = y - rect.top;

        // Erase with circular brush
        ctx.globalCompositeOperation = 'destination-out';

        // Main scratch with gradient edge
        const brushSize = 40;
        const gradient = ctx.createRadialGradient(canvasX, canvasY, 0, canvasX, canvasY, brushSize);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, brushSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = 'source-over';

        // Check progress
        const progress = calculateProgress();
        setScratchProgress(progress);

        if (progress >= TIMING.SCRATCH_THRESHOLD && !isRevealed) {
            setIsRevealed(true);
            onRevealComplete?.();
        }
    }, [calculateProgress, isRevealed, onRevealComplete]);

    // Mouse events
    const handleMouseDown = (e) => {
        setIsScratching(true);
        scratch(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
        if (!isScratching) return;
        scratch(e.clientX, e.clientY);
    };

    const handleMouseUp = () => setIsScratching(false);

    // Touch events
    const handleTouchStart = (e) => {
        e.preventDefault();
        setIsScratching(true);
        const touch = e.touches[0];
        scratch(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (!isScratching) return;
        const touch = e.touches[0];
        scratch(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => setIsScratching(false);

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-[400px] flex items-center justify-center"
        >
            {/* Hint text underneath */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="font-handwritten text-2xl text-[var(--ink-deep)] opacity-30 text-center px-8">
                    A love letter awaits...
                </p>
            </div>

            {/* Scratch canvas overlay */}
            <AnimatePresence>
                {!isRevealed && (
                    <motion.canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full scratch-canvas z-10 rounded-lg"
                        variants={scratchOverlayVariants}
                        initial="visible"
                        exit="hidden"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    />
                )}
            </AnimatePresence>

            {/* Progress indicator */}
            {!isRevealed && scratchProgress > 0.05 && (
                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: PREMIUM_EASE }}
                >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2 text-base font-handwritten text-[var(--ink-deep)] shadow-md">
                        {Math.round(scratchProgress * 100)}% revealed...
                    </div>
                </motion.div>
            )}
        </div>
    );
}
