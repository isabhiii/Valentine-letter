import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateShareUrl, generateShortLink } from '@/lib/shareUtils';
import { SPRING_GENTLE, PREMIUM_EASE, EASE_OUT_EXPO, buttonVariants } from '@/lib/animations';
import { DoodleEnvelope, DoodleSparkle, DoodleEye, DoodleHeartFilled } from './DoodleIcons';

export default function ShareScreen({
    letterData,
    senderName,
    shareUrl: initialShareUrl = '',
    shortenStatus: initialShortenStatus = 'pending',
    onLinkGenerated,
    onBack,
    onPreview
}) {
    const [shareUrl, setShareUrl] = useState(initialShareUrl);
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [shortenStatus, setShortenStatus] = useState(initialShortenStatus);
    const inputRef = useRef(null);

    // Generate URL on mount if not already present
    useEffect(() => {
        if (!shareUrl) {
            handleGenerate();
        }
    }, [letterData, senderName, shareUrl]);

    // Generate the share URL
    const handleGenerate = async () => {
        if (isGenerating) return; // Prevent double trigger
        setIsGenerating(true);
        setShortenStatus('pending');
        console.log('Starting link generation sequence...');

        try {
            // First attempt to generate a premium short link
            const id = await generateShortLink(letterData);
            if (id) {
                console.log('Short link SUCCESS');
                const shortUrl = `${window.location.origin}/l/${id}`;
                setShareUrl(shortUrl);
                setShortenStatus('success');
                onLinkGenerated?.(shortUrl, 'success');
            } else {
                console.warn('Short link FAILED - falling back to long URL');
                const longUrl = generateShareUrl(letterData, senderName);
                if (longUrl) {
                    setShareUrl(longUrl);
                    onLinkGenerated?.(longUrl, 'failed');
                }
                setShortenStatus('failed');
            }
        } catch (error) {
            console.error('HandleGenerate exception:', error);
            const longUrl = generateShareUrl(letterData, senderName);
            if (longUrl) {
                setShareUrl(longUrl);
                onLinkGenerated?.(longUrl, 'failed');
            }
            setShortenStatus('failed');
        } finally {
            setIsGenerating(false);
        }
    };

    // Copy to clipboard
    const handleCopy = async () => {
        if (!shareUrl) return;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            if (inputRef.current) {
                inputRef.current.select();
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    };

    // Share via native share API
    const handleNativeShare = async () => {
        if (!shareUrl || !navigator.share) return;

        try {
            await navigator.share({
                title: 'A Love Letter For You',
                text: `${senderName || 'Someone special'} has written you a Valentine's letter`,
                url: shareUrl
            });
        } catch (err) {
            // User cancelled or error - silently fail
        }
    };

    const hasNativeShare = typeof navigator !== 'undefined' && navigator.share;

    return (
        <motion.div
            className="fixed inset-0 z-40 flex flex-col w-full h-full px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(253,250,243,0.98) 0%, rgba(248,232,232,0.98) 100%)'
            }}
        >
            {/* Top Spacer */}
            <div className="flex-grow min-h-[2rem]" />

            <motion.div
                className="w-full max-w-md paper-texture letter-shadow rounded-2xl p-8 sm:p-10 mx-auto"
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={SPRING_GENTLE}
            >
                {/* Success Icon */}
                <motion.div
                    className="text-center mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 12
                    }}
                >
                    <div className="text-[var(--heart-red)]">
                        <DoodleEnvelope size={80} />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="font-serif text-2xl sm:text-3xl text-[var(--ink-deep)] text-center mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Your Letter is Ready!
                </motion.h1>

                <motion.p
                    className="font-handwritten text-lg text-[var(--ink-deep)] text-center opacity-70 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.4 }}
                >
                    <span className="inline-flex items-center gap-1">
                        Share this magical link with your Valentine
                        <DoodleSparkle size={16} className="text-[var(--heart-red)]" />
                    </span>
                </motion.p>

                {/* URL Display */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {!shareUrl ? (
                        <motion.button
                            onClick={handleGenerate}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--heart-red)] to-[#ff4b4b]
                text-white font-handwritten text-xl shadow-lg shadow-red-500/20"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <DoodleSparkle size={16} className="text-white" />
                                    </motion.span>
                                    Creating Magic...
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1">
                                    <DoodleSparkle size={16} />
                                    Prepare Magical Link
                                </span>
                            )}
                        </motion.button>
                    ) : (
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={shareUrl}
                                    readOnly
                                    className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[var(--rose-blush)]/30 
                    font-mono text-sm text-[var(--ink-deep)] truncate
                    focus:outline-none focus:border-[var(--heart-red)]/50"
                                />
                            </div>

                            {/* Share buttons */}
                            <div className="flex gap-3">
                                {hasNativeShare && (
                                    <motion.button
                                        onClick={handleNativeShare}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E]
                      text-white font-handwritten text-lg shadow-md"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        📤 Share
                                    </motion.button>
                                )}
                                <motion.button
                                    onClick={handleCopy}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[var(--heart-red)] to-[#e05555]
                    text-white font-handwritten text-lg shadow-md shadow-red-500/20"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {copied ? '✓ Copied!' : '📋 Copy Link'}
                                </motion.button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* What recipient will see */}
                {shareUrl && (
                    <motion.div
                        className="mb-6 p-4 rounded-xl bg-[var(--rose-blush)]/10 border border-[var(--rose-blush)]/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <p className="font-handwritten text-sm text-[var(--ink-deep)] text-center">
                            <span className="opacity-60">When they open the link, they'll see:</span>
                            <br />
                            <span className="text-lg font-semibold">
                                "{senderName || 'Someone special'} has written you a love letter..."
                            </span>
                        </p>
                    </motion.div>
                )}

                {/* Action buttons */}
                <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.button
                        onClick={onBack}
                        className="flex-1 py-3 rounded-xl border-2 border-[var(--ink-deep)]/20 
              text-[var(--ink-deep)] font-handwritten text-lg
              hover:bg-[var(--ink-deep)]/5 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        ← Edit Letter
                    </motion.button>
                    <motion.button
                        onClick={onPreview}
                        className="flex-1 py-3 rounded-xl bg-[var(--ink-deep)] 
              text-white font-handwritten text-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="inline-flex items-center gap-1">
                            <DoodleEye size={18} />
                            Preview
                        </span>
                    </motion.button>
                </motion.div>

                {/* Tip */}
                <motion.p
                    className="mt-6 text-center font-handwritten text-sm text-[var(--ink-deep)] opacity-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1 }}
                >
                    💡 This letter exists only for the recipient. It can be burned after reading.
                </motion.p>
            </motion.div>

            {/* Bottom Spacer */}
            <div className="flex-grow min-h-[2rem]" />
        </motion.div>
    );
}
