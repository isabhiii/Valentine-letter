// Premium Easing Curves (Emil Kowalski inspired)
export const PREMIUM_EASE = [0.43, 0.13, 0.23, 0.96];
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT_CIRC = [0.85, 0, 0.15, 1];
export const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1];

// Spring Physics Configurations (Emil Kowalski style)
export const SPRING_GENTLE = {
    type: "spring",
    stiffness: 120,
    damping: 14,
    mass: 1
};

export const SPRING_BOUNCY = {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 0.8
};

export const SPRING_SNAPPY = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.5
};

// Envelope animations (origin-aware)
export const envelopeVariants = {
    initial: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        y: 0
    },
    hover: {
        scale: 1.02,
        y: -5,
        transition: SPRING_GENTLE
    },
    tap: {
        scale: 0.98,
        transition: SPRING_SNAPPY
    },
    exit: {
        opacity: 0,
        scale: 0.92,  // Never scale to 0
        rotateY: -90,
        transition: { duration: 0.6, ease: EASE_OUT_EXPO }
    }
};

// Letter unfold animation
export const letterVariants = {
    hidden: {
        opacity: 0,
        scale: 0.92,
        y: 40,
        rotateX: -8
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        transition: { ...SPRING_GENTLE, delay: 0.2 }
    }
};

// Scratch overlay variants
export const scratchOverlayVariants = {
    visible: {
        opacity: 1,
        scale: 1
    },
    hidden: {
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.8, ease: EASE_OUT_EXPO }
    }
};

// Staggered text container
export const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3
        }
    }
};

// Individual line animation
export const lineVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: PREMIUM_EASE }
    }
};

// Word-level animation within lines
export const wordVariants = {
    hidden: {
        opacity: 0,
        y: 12,
        filter: "blur(3px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.4, ease: PREMIUM_EASE }
    }
};

// Floating heart animation generator
export const createHeartVariants = (index, total) => {
    const xOffset = (Math.random() - 0.5) * 100;
    const duration = 3 + Math.random() * 2;

    return {
        initial: {
            opacity: 0,
            scale: 0.9,
            y: 50,
            x: 0,
            rotate: 0
        },
        animate: {
            opacity: [0, 1, 1, 0.8, 0],
            scale: [0.9, 1.1, 1, 1.05, 0.95],
            y: -250 - Math.random() * 150,
            x: xOffset + Math.sin(index) * 20,
            rotate: Math.random() * 40 - 20,
            transition: {
                duration: duration,
                ease: "easeOut",
                delay: index * 0.12
            }
        }
    };
};

// Burn effect variants
export const burnVariants = {
    initial: {
        opacity: 1,
        filter: "brightness(1) sepia(0)"
    },
    burning: {
        opacity: 0,
        filter: "brightness(1.5) sepia(0.8) contrast(1.2)",
        transition: {
            duration: 2.5,
            ease: EASE_IN_OUT_CIRC
        }
    }
};

// Timer pulse animation
export const timerPulseVariants = {
    normal: { scale: 1, opacity: 0.6 },
    warning: {
        scale: [1, 1.05, 1],
        opacity: [0.6, 1, 0.6],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Signature animation
export const signatureVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 15
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: EASE_OUT_BACK,
            delay: 0.5
        }
    }
};

// Button animation
export const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: PREMIUM_EASE }
    },
    hover: {
        scale: 1.03,
        transition: SPRING_GENTLE
    },
    tap: {
        scale: 0.97,
        transition: SPRING_SNAPPY
    }
};

// Particle animation for scratch effect
export const scratchParticleVariants = {
    initial: { opacity: 1, scale: 1 },
    animate: {
        opacity: 0,
        scale: 0,
        y: [0, -20, -10],
        transition: { duration: 0.4 }
    }
};
