'use client';

import { motion } from 'framer-motion';
import { LETTER_CONTENT } from '@/lib/constants';
import {
    textContainerVariants,
    lineVariants,
    wordVariants,
    signatureVariants,
    PREMIUM_EASE
} from '@/lib/animations';
import { DOODLE_STICKERS } from './DoodleIcons';
import PhotoGallery from './PhotoGallery';

function AnimatedWord({ word, index }) {
    return (
        <motion.span
            className="inline-block mr-[0.3em]"
            variants={wordVariants}
            style={{
                // Slight random rotation for natural feel
                '--rotation': `${(Math.random() - 0.5) * 0.5}deg`
            }}
        >
            {word}
        </motion.span>
    );
}

function AnimatedLine({ line, lineIndex }) {
    if (line === '') {
        return <div className="h-4" />;
    }

    const words = line.split(' ');

    return (
        <motion.p
            className="handwritten-text mb-2"
            variants={lineVariants}
        >
            <motion.span
                className="inline"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.04,
                            delayChildren: 0.05
                        }
                    }
                }}
                initial="hidden"
                animate="visible"
            >
                {words.map((word, i) => (
                    <AnimatedWord key={`${lineIndex}-${i}`} word={word} index={i} />
                ))}
            </motion.span>
        </motion.p>
    );
}

export default function HandwrittenText({ letterContent, onComplete }) {
    // Use custom content or fall back to default
    const content = letterContent || LETTER_CONTENT;

    // Debug photos
    console.log('HandwrittenText content:', content);
    console.log('Photos:', content.photos);

    // Get sticker component if custom letter has one
    const stickerKey = content.sticker || 'heart';
    const StickerComponent = DOODLE_STICKERS[stickerKey]?.component;

    return (
        <motion.div
            className="space-y-1"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => onComplete?.()}
        >
            {/* Recipient */}
            <motion.h2
                className="recipient-text mb-8"
                variants={lineVariants}
            >
                {content.recipient},
            </motion.h2>

            {/* Letter lines */}
            {content.lines.map((line, index) => (
                <AnimatedLine
                    key={index}
                    line={line}
                    lineIndex={index}
                />
            ))}

            {/* Photo Gallery */}
            {content.photos && content.photos.length > 0 && (
                <PhotoGallery photos={content.photos} />
            )}

            {/* Signature with sticker */}
            <motion.div
                className="mt-10 text-right"
                variants={signatureVariants}
            >
                <p className="signature-text mb-2">
                    {content.signature},
                </p>
                <div className="flex items-center justify-end gap-3">
                    <span className="font-handwritten text-2xl text-[var(--ink-deep)]">
                        {content.senderName}
                    </span>
                    {StickerComponent && (
                        <motion.div
                            className="text-[var(--heart-red)]"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2
                            }}
                        >
                            <StickerComponent size={36} color="currentColor" />
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
