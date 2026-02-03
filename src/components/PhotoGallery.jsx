'use client';

import { motion } from 'framer-motion';
import { SPRING_GENTLE, SPRING_BOUNCY } from '@/lib/animations';
import { DoodleHeartFilled } from './DoodleIcons';

// Premium photo frame component with Emil Kowalski style animations
export default function PhotoGallery({ photos = [] }) {
    if (!photos || photos.length === 0) return null;

    return (
        <motion.div
            className="relative flex justify-center py-6 mt-4 mb-2"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.5
                    }
                }
            }}
        >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {photos.map((photoUrl, index) => {
                    // Calculate random rotation for "scattered" look
                    // We use pseudo-random based on index to keep it consistent during re-renders
                    const rotation = index % 2 === 0 ? -3 - (index * 2) : 2 + (index * 2);
                    const yOffset = index % 3 === 1 ? -10 : 0;

                    return (
                        <motion.div
                            key={index}
                            className="relative group cursor-pointer"
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 40,
                                    scale: 0.8,
                                    rotate: 0
                                },
                                visible: {
                                    opacity: 1,
                                    y: yOffset,
                                    scale: 1,
                                    rotate: rotation,
                                    transition: {
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 18,
                                        mass: 0.9
                                    }
                                }
                            }}
                            whileHover={{
                                scale: 1.05,
                                rotate: 0,
                                zIndex: 10,
                                transition: SPRING_BOUNCY
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Polaroids frame */}
                            <div
                                className="bg-white p-2 pb-8 shadow-md rounded-sm border border-[var(--ink-deep)]/5"
                                style={{
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }}
                            >
                                <div className="relative w-32 h-32 sm:w-40 sm:h-40 overflow-hidden bg-gray-100">
                                    <img
                                        src={photoUrl}
                                        alt="Memory"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                    />

                                    {/* Grain overlay for vintage feel */}
                                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-noise mix-blend-overlay"></div>

                                    {/* Subtle inner shadow */}
                                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]"></div>
                                </div>
                            </div>

                            {/* Decorative tape/sticker - vary by index */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[rgba(255,255,255,0.8)] shadow-sm transform -rotate-1 opacity-80 backdrop-blur-sm"></div>

                            {/* Heart Decoration on some photos */}
                            {index === photos.length - 1 && (
                                <motion.div
                                    className="absolute -bottom-2 -right-2 text-[var(--heart-red)] drop-shadow-sm"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1 + (index * 0.2), ...SPRING_BOUNCY }}
                                >
                                    <DoodleHeartFilled size={24} color="currentColor" />
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
