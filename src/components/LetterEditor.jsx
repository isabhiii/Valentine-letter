'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LETTER_CONTENT } from '@/lib/constants';
import { buttonVariants, PREMIUM_EASE, SPRING_GENTLE } from '@/lib/animations';
import { DOODLE_STICKERS, DoodleSparkle, DoodleHeartFilled } from './DoodleIcons';

// Available stickers for selection
const STICKER_OPTIONS = Object.entries(DOODLE_STICKERS);

export default function LetterEditor({ onSave, onCancel, initialData }) {
    const [recipient, setRecipient] = useState(initialData?.recipient || LETTER_CONTENT.recipient);
    const [letterText, setLetterText] = useState(initialData?.lines?.join('\n') || LETTER_CONTENT.lines.join('\n'));
    const [signature, setSignature] = useState(initialData?.signature || LETTER_CONTENT.signature);
    const [senderName, setSenderName] = useState(initialData?.senderName || '');
    const [selectedSticker, setSelectedSticker] = useState(initialData?.sticker || 'heart');
    const [showStickerPicker, setShowStickerPicker] = useState(false);
    const [photos, setPhotos] = useState(
        initialData?.photos?.map(url => ({ id: Math.random(), dataUrl: url })) || []
    ); // Array of { id, dataUrl }
    const fileInputRef = useRef(null);

    const handleSave = () => {
        const lines = letterText.split('\n').filter(line => line.trim() !== '' || letterText.split('\n').indexOf(line) > 0);
        onSave({
            recipient: recipient || 'My Dearest',
            lines: lines.length > 0 ? lines : LETTER_CONTENT.lines,
            signature: signature || 'Forever Yours',
            senderName: senderName || '♥',
            sticker: selectedSticker,
            photos: photos.map(p => p.dataUrl)
        });
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files || []);
        const remainingSlots = 3 - photos.length;
        const filesToProcess = files.slice(0, remainingSlots);

        filesToProcess.forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxSize = 250;
                    let { width, height } = img;

                    if (width > height) {
                        if (width > maxSize) {
                            height = (height * maxSize) / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width = (width * maxSize) / height;
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/webp', 0.45);
                    setPhotos(prev => [...prev, { id: Date.now() + Math.random(), dataUrl }]);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removePhoto = (id) => {
        setPhotos(prev => prev.filter(p => p.id !== id));
    };

    const SelectedStickerComponent = DOODLE_STICKERS[selectedSticker]?.component;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col w-full h-full p-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(253,250,243,0.98) 0%, rgba(248,232,232,0.98) 100%)'
            }}
        >
            {/* Top Spacer for centering */}
            <div className="flex-grow min-h-[2rem]" />

            <motion.div
                className="w-full max-w-[600px] paper-texture letter-shadow rounded-xl p-6 sm:p-10 mx-auto transition-all relative z-10"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={SPRING_GENTLE}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h1
                        className="font-serif text-2xl sm:text-3xl text-[var(--ink-deep)] mb-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Write Your Letter
                    </motion.h1>
                    <motion.p
                        className="font-handwritten text-lg text-[var(--ink-deep)] opacity-60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.3 }}
                    >
                        Pour your heart onto paper
                    </motion.p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Recipient */}
                    <div>
                        <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                            To whom?
                        </label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="My Dearest"
                            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-[var(--rose-blush)]/30 
                            font-serif text-[var(--ink-deep)] placeholder:text-[var(--ink-deep)]/30
                            focus:outline-none focus:border-[var(--heart-red)]/50 focus:ring-2 focus:ring-[var(--heart-red)]/20
                            transition-all"
                        />
                    </div>

                    {/* Letter body */}
                    <div>
                        <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                            Your message
                        </label>
                        <textarea
                            value={letterText}
                            onChange={(e) => setLetterText(e.target.value)}
                            placeholder="Write from the heart..."
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-[var(--rose-blush)]/30 
                            font-handwritten text-lg text-[var(--ink-deep)] placeholder:text-[var(--ink-deep)]/30
                            focus:outline-none focus:border-[var(--heart-red)]/50 focus:ring-2 focus:ring-[var(--heart-red)]/20
                            transition-all resize-none leading-relaxed"
                        />
                    </div>

                    {/* Photo Upload Section */}
                    <div>
                        <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                            Add photos <span className="opacity-50 text-base">(optional, up to 3)</span>
                        </label>

                        <div className="flex gap-3 mb-3 flex-wrap">
                            {photos.map((photo, index) => (
                                <motion.div
                                    key={photo.id}
                                    className="relative group"
                                    initial={{ scale: 0, rotate: -10 }}
                                    animate={{ scale: 1, rotate: index % 2 === 0 ? -2 : 2 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    <div
                                        className="w-20 h-20 rounded-lg overflow-hidden border-2 border-dashed border-[var(--heart-red)]/40 p-1 bg-white"
                                        style={{ boxShadow: '3px 3px 0 rgba(196, 30, 58, 0.15)' }}
                                    >
                                        <img
                                            src={photo.dataUrl}
                                            alt={`Photo ${index + 1}`}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removePhoto(photo.id)}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--heart-red)] text-white rounded-full 
                                        opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center
                                        text-sm font-bold shadow-md hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                    <div className="absolute -bottom-1 -right-1 text-[var(--heart-red)]">
                                        <DoodleHeartFilled size={14} color="currentColor" />
                                    </div>
                                </motion.div>
                            ))}

                            {photos.length < 3 && (
                                <motion.button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-20 h-20 rounded-lg border-2 border-dashed border-[var(--ink-deep)]/20 
                                    flex flex-col items-center justify-center gap-1 text-[var(--ink-deep)]/40
                                    hover:border-[var(--heart-red)]/40 hover:text-[var(--heart-red)]/60 hover:bg-white/50
                                    transition-all cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="text-2xl">+</span>
                                    <span className="text-xs font-handwritten">Photo</span>
                                </motion.button>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoUpload}
                            className="hidden"
                        />
                    </div>

                    {/* Sticker Selector */}
                    <div>
                        <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                            Add a doodle
                        </label>
                        <div className="relative">
                            <button
                                onClick={() => setShowStickerPicker(!showStickerPicker)}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-white/50 border border-[var(--rose-blush)]/30 
                                font-handwritten text-[var(--ink-deep)] hover:bg-white/70 transition-all text-left"
                            >
                                <span className="text-[var(--heart-red)]">
                                    {SelectedStickerComponent && <SelectedStickerComponent size={28} color="currentColor" />}
                                </span>
                                <span>{DOODLE_STICKERS[selectedSticker]?.label || 'Select a doodle'}</span>
                                <span className="ml-auto text-[var(--ink-deep)]/50">{showStickerPicker ? '▲' : '▼'}</span>
                            </button>

                            <AnimatePresence>
                                {showStickerPicker && (
                                    <motion.div
                                        className="absolute top-full left-0 right-0 mt-2 p-3 rounded-xl bg-white shadow-xl border border-[var(--rose-blush)]/20 z-10"
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                                            {STICKER_OPTIONS.map(([key, { component: StickerComponent, label }]) => (
                                                <motion.button
                                                    key={key}
                                                    onClick={() => {
                                                        setSelectedSticker(key);
                                                        setShowStickerPicker(false);
                                                    }}
                                                    className={`p-2 rounded-lg flex items-center justify-center transition-all
                                                    ${selectedSticker === key
                                                            ? 'bg-[var(--heart-red)]/15 ring-2 ring-[var(--heart-red)]/50'
                                                            : 'hover:bg-[var(--rose-blush)]/20'
                                                        }`}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    title={label}
                                                >
                                                    <span className="text-[var(--heart-red)]">
                                                        <StickerComponent size={24} color="currentColor" />
                                                    </span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Signature */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                                Sign-off
                            </label>
                            <input
                                type="text"
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                placeholder="Forever Yours"
                                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-[var(--rose-blush)]/30 
                                font-handwritten text-[var(--ink-deep)] placeholder:text-[var(--ink-deep)]/30
                                focus:outline-none focus:border-[var(--heart-red)]/50 focus:ring-2 focus:ring-[var(--heart-red)]/20
                                transition-all"
                            />
                        </div>
                        <div>
                            <label className="block font-handwritten text-lg text-[var(--ink-deep)] mb-2">
                                Your name
                            </label>
                            <input
                                type="text"
                                value={senderName}
                                onChange={(e) => setSenderName(e.target.value)}
                                placeholder="Your name"
                                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-[var(--rose-blush)]/30 
                                font-handwritten text-[var(--ink-deep)] placeholder:text-[var(--ink-deep)]/30
                                focus:outline-none focus:border-[var(--heart-red)]/50 focus:ring-2 focus:ring-[var(--heart-red)]/20
                                transition-all"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <motion.button
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 rounded-full border-2 border-[var(--ink-deep)]/20 
                            text-[var(--ink-deep)] font-handwritten text-lg
                            hover:bg-[var(--ink-deep)]/5 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Use Default
                        </motion.button>
                        <motion.button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--heart-red)] to-[#ff4b4b]
                            text-white font-handwritten text-xl shadow-lg shadow-red-500/20
                            hover:shadow-xl hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Create Letter
                            <DoodleSparkle size={18} className="text-white" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Spacer for centering */}
            <div className="flex-grow min-h-[2rem]" />
        </motion.div>
    );
}
