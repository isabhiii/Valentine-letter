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

            {/* Signature */}
            <motion.div
                className="mt-10 text-right"
                variants={signatureVariants}
            >
                <p className="signature-text mb-1">
                    {content.signature},
                </p>
                <motion.span
                    className="text-4xl"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                >
                    {content.senderName}
                </motion.span>
            </motion.div>
        </motion.div>
    );
}

