// Hand-drawn doodle SVG components for premium feel
// Designed to match the Caveat handwritten font aesthetic

export function DoodleHeart({ size = 24, className = '', animated = false, style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            className={className}
            style={style}
        >
            {/* Hand-drawn heart path with slight imperfections */}
            <path
                d="M50 88 C50 88, 15 55, 15 35 C15 20, 30 12, 50 28 C70 12, 85 20, 85 35 C85 55, 50 88, 50 88 Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={animated ? {
                    strokeDasharray: 200,
                    strokeDashoffset: 200,
                    animation: 'drawPath 1s ease-out forwards'
                } : {}}
            />
            {/* Inner sketch lines for depth */}
            <path
                d="M35 35 C38 42, 42 48, 50 55"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
            />
        </svg>
    );
}

export function DoodleHeartFilled({ size = 24, className = '', color = 'currentColor', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className={className}
            style={style}
        >
            {/* Filled heart with hand-drawn edge */}
            <path
                d="M50 88 C50 88, 12 52, 12 32 C12 18, 28 10, 50 28 C72 10, 88 18, 88 32 C88 52, 50 88, 50 88 Z"
                fill={color}
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            {/* Highlight sketch */}
            <path
                d="M30 30 C32 26, 36 24, 40 26"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
            />
        </svg>
    );
}

export function DoodleEnvelope({ size = 48, className = '', animated = false, style = {} }) {
    return (
        <svg
            width={size}
            height={size * 0.75}
            viewBox="0 0 120 90"
            fill="none"
            className={className}
            style={style}
        >
            {/* Envelope body */}
            <path
                d="M8 20 L8 78 C8 82, 12 85, 16 85 L104 85 C108 85, 112 82, 112 78 L112 20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            {/* Envelope flap */}
            <path
                d="M8 20 C8 18, 10 15, 14 15 L106 15 C110 15, 112 18, 112 20 L60 55 L8 20 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={animated ? {
                    strokeDasharray: 250,
                    strokeDashoffset: 250,
                    animation: 'drawPath 0.8s ease-out forwards'
                } : {}}
            />
            {/* Heart seal on envelope */}
            <path
                d="M60 62 C60 62, 52 56, 52 50 C52 46, 56 44, 60 48 C64 44, 68 46, 68 50 C68 56, 60 62, 60 62 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
            />
        </svg>
    );
}

// Fixed sparkle - looks like actual sparkles/twinkle, not a plus
export function DoodleSparkle({ size = 20, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            className={className}
            style={style}
        >
            {/* Main 4-point star sparkle */}
            <path
                d="M20 2 Q22 18, 38 20 Q22 22, 20 38 Q18 22, 2 20 Q18 18, 20 2"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Small accent dots */}
            <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="32" cy="32" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="32" cy="8" r="1" fill="currentColor" opacity="0.4" />
            <circle cx="8" cy="32" r="1" fill="currentColor" opacity="0.4" />
        </svg>
    );
}

export function DoodleFlower({ size = 28, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 50 50"
            fill="none"
            className={className}
            style={style}
        >
            {/* Petals */}
            <ellipse cx="25" cy="12" rx="6" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <ellipse cx="38" cy="18" rx="6" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60, 38, 18)" />
            <ellipse cx="38" cy="32" rx="6" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120, 38, 32)" />
            <ellipse cx="25" cy="38" rx="6" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(180, 25, 38)" />
            <ellipse cx="12" cy="32" rx="6" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(240, 12, 32)" />
            <ellipse cx="12" cy="18" rx="6" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(300, 12, 18)" />
            {/* Center */}
            <circle cx="25" cy="25" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

// ============= FUN ANIMAL & CUTE DOODLES =============

// Cute bunny face
export function DoodleBunny({ size = 32, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            style={style}
        >
            {/* Ears */}
            <ellipse cx="20" cy="12" rx="5" ry="14" stroke="currentColor" strokeWidth="2" fill="none" />
            <ellipse cx="40" cy="12" rx="5" ry="14" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Inner ear */}
            <ellipse cx="20" cy="12" rx="2" ry="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
            <ellipse cx="40" cy="12" rx="2" ry="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
            {/* Face */}
            <circle cx="30" cy="38" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Eyes */}
            <circle cx="24" cy="35" r="2" fill="currentColor" />
            <circle cx="36" cy="35" r="2" fill="currentColor" />
            {/* Nose - triangle */}
            <path d="M30 40 L28 44 L32 44 Z" fill="currentColor" />
            {/* Whiskers */}
            <path d="M18 42 L10 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M18 45 L10 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M42 42 L50 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M42 45 L50 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
    );
}

// Cute cat face
export function DoodleCat({ size = 32, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            style={style}
        >
            {/* Face outline with ears integrated */}
            <path
                d="M10 48 C10 30, 15 20, 30 20 C45 20, 50 30, 50 48 C50 55, 40 58, 30 58 C20 58, 10 55, 10 48 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
            {/* Pointy ears */}
            <path d="M12 35 L8 12 L22 28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M48 35 L52 12 L38 28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Eyes */}
            <ellipse cx="22" cy="40" rx="3" ry="4" fill="currentColor" />
            <ellipse cx="38" cy="40" rx="3" ry="4" fill="currentColor" />
            {/* Nose */}
            <path d="M30 46 L28 50 L32 50 Z" fill="currentColor" />
            {/* Mouth */}
            <path d="M30 50 C30 52, 26 54, 24 52" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M30 50 C30 52, 34 54, 36 52" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Whiskers */}
            <path d="M16 47 L4 45" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M16 50 L4 52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M44 47 L56 45" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M44 50 L56 52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
    );
}

// Cute bear face
export function DoodleBear({ size = 32, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            style={style}
        >
            {/* Ears */}
            <circle cx="12" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="48" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Inner ears */}
            <circle cx="12" cy="16" r="4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="48" cy="16" r="4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
            {/* Face */}
            <circle cx="30" cy="34" r="22" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Eyes */}
            <circle cx="22" cy="30" r="2.5" fill="currentColor" />
            <circle cx="38" cy="30" r="2.5" fill="currentColor" />
            {/* Snout */}
            <ellipse cx="30" cy="42" rx="8" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Nose */}
            <ellipse cx="30" cy="40" rx="3" ry="2" fill="currentColor" />
            {/* Mouth */}
            <path d="M30 42 L30 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// Cute butterfly
export function DoodleButterfly({ size = 32, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            style={style}
        >
            {/* Left wings */}
            <ellipse cx="18" cy="22" rx="14" ry="12" stroke="currentColor" strokeWidth="2" fill="none" />
            <ellipse cx="16" cy="42" rx="10" ry="10" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Right wings */}
            <ellipse cx="42" cy="22" rx="14" ry="12" stroke="currentColor" strokeWidth="2" fill="none" />
            <ellipse cx="44" cy="42" rx="10" ry="10" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Body */}
            <ellipse cx="30" cy="32" rx="3" ry="16" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Antennae */}
            <path d="M28 16 C26 10, 22 6, 18 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M32 16 C34 10, 38 6, 42 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Wing patterns */}
            <circle cx="18" cy="22" r="4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="42" cy="22" r="4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
    );
}

// Moon and stars
export function DoodleMoon({ size = 32, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            style={style}
        >
            {/* Crescent moon */}
            <path
                d="M35 8 C20 10, 12 25, 15 42 C18 52, 30 58, 42 52 C30 52, 22 40, 24 26 C26 16, 35 8, 35 8 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />
            {/* Stars */}
            <path d="M48 12 Q49 16, 54 16 Q49 17, 48 22 Q47 17, 42 16 Q47 16, 48 12" fill="currentColor" />
            <path d="M52 30 Q52.5 32, 56 32 Q52.5 33, 52 36 Q51.5 33, 48 32 Q51.5 32, 52 30" fill="currentColor" opacity="0.7" />
            <circle cx="44" cy="24" r="1" fill="currentColor" opacity="0.6" />
        </svg>
    );
}

// Cute cloud
export function DoodleCloud({ size = 32, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 40"
            fill="none"
            className={className}
            style={style}
        >
            <path
                d="M12 30 C6 30, 4 24, 8 20 C4 16, 8 10, 16 12 C18 6, 28 4, 34 10 C40 6, 50 8, 50 16 C56 16, 58 24, 52 28 C54 32, 48 36, 42 34 C38 38, 28 38, 24 34 C20 36, 14 34, 12 30 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// Rainbow
export function DoodleRainbow({ size = 40, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size * 0.6}
            viewBox="0 0 60 36"
            fill="none"
            className={className}
            style={style}
        >
            <path d="M4 34 C4 16, 20 4, 30 4 C40 4, 56 16, 56 34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
            <path d="M10 34 C10 20, 22 10, 30 10 C38 10, 50 20, 50 34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M16 34 C16 24, 24 16, 30 16 C36 16, 44 24, 44 34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
            {/* Clouds at ends */}
            <circle cx="6" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="54" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

// Cute star
export function DoodleStar({ size = 28, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 50 50"
            fill="none"
            className={className}
            style={style}
        >
            <path
                d="M25 4 L30 18 L46 20 L34 30 L38 46 L25 38 L12 46 L16 30 L4 20 L20 18 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Cute face */}
            <circle cx="20" cy="24" r="1.5" fill="currentColor" />
            <circle cx="30" cy="24" r="1.5" fill="currentColor" />
            <path d="M22 30 Q25 33, 28 30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
    );
}

// Cute ladybug/bug
export function DoodleBug({ size = 32, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            style={style}
        >
            {/* Body */}
            <ellipse cx="30" cy="35" rx="18" ry="20" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Head */}
            <circle cx="30" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Middle line on body */}
            <line x1="30" y1="18" x2="30" y2="55" stroke="currentColor" strokeWidth="1.5" />
            {/* Spots on body */}
            <circle cx="22" cy="30" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="38" cy="30" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="22" cy="44" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="38" cy="44" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Antennae */}
            <path d="M25 6 C22 0, 18 0, 14 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M35 6 C38 0, 42 0, 46 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="26" cy="12" r="2" fill="currentColor" />
            <circle cx="34" cy="12" r="2" fill="currentColor" />
            {/* Smile */}
            <path d="M27 16 Q30 19, 33 16" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>
    );
}

// Cute panda face - simple and friendly
export function DoodlePanda({ size = 32, className = '', style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            style={style}
        >
            {/* Round ears */}
            <circle cx="14" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="46" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Face - big and round */}
            <circle cx="30" cy="35" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Simple eye patches - smaller ovals */}
            <ellipse cx="22" cy="32" rx="5" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <ellipse cx="38" cy="32" rx="5" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Cute dot eyes */}
            <circle cx="22" cy="32" r="2" fill="currentColor" />
            <circle cx="38" cy="32" r="2" fill="currentColor" />
            {/* Small oval nose */}
            <ellipse cx="30" cy="40" rx="3" ry="2" fill="currentColor" />
            {/* Cute smile */}
            <path d="M26 44 Q30 47, 34 44" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
    );
}

// Collection of all doodle icons for easy access
export const DOODLE_STICKERS = {
    heart: { component: DoodleHeartFilled, label: 'Heart' },
    bunny: { component: DoodleBunny, label: 'Bunny' },
    cat: { component: DoodleCat, label: 'Cat' },
    bear: { component: DoodleBear, label: 'Bear' },
    panda: { component: DoodlePanda, label: 'Panda' },
    bug: { component: DoodleBug, label: 'Bug' },
    butterfly: { component: DoodleButterfly, label: 'Butterfly' },
    moon: { component: DoodleMoon, label: 'Moon' },
    star: { component: DoodleStar, label: 'Star' },
    cloud: { component: DoodleCloud, label: 'Cloud' },
    rainbow: { component: DoodleRainbow, label: 'Rainbow' },
    flower: { component: DoodleFlower, label: 'Flower' },
    sparkle: { component: DoodleSparkle, label: 'Sparkle' },
};

// CSS keyframe for drawing animation (add to globals.css)
export const drawPathKeyframe = `
@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}
`;
