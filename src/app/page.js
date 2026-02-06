'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from '@/components/WelcomeScreen';
import LetterEditor from '@/components/LetterEditor';
import ShareScreen from '@/components/ShareScreen';
import RecipientIntro from '@/components/RecipientIntro';
import EnvelopeIntro from '@/components/EnvelopeIntro';
import WaxSealReveal from '@/components/WaxSealReveal';
import LetterContainer from '@/components/LetterContainer';
import HandwrittenText from '@/components/HandwrittenText';
import FloatingHearts from '@/components/FloatingHearts';
import BurnTimer, { FireEffect } from '@/components/BurnTimer';
import LetterFooter from '@/components/LetterFooter';
import { LETTER_CONTENT } from '@/lib/constants';
import { parseLetterFromUrl, hasSharedLetter } from '@/lib/shareUtils';
import { burnVariants } from '@/lib/animations';

// App states
const STATES = {
  LOADING: 'loading',
  WELCOME: 'welcome',
  EDITOR: 'editor',
  SHARE: 'share',
  RECIPIENT_INTRO: 'recipient_intro',
  ENVELOPE: 'envelope',
  SEAL: 'seal',
  REVEAL: 'reveal',
  BURNING: 'burning'
};

export default function Home({ initialLetterData = null }) {
  const [appState, setAppState] = useState(STATES.LOADING);
  const [customLetter, setCustomLetter] = useState(initialLetterData);
  const [senderName, setSenderName] = useState(initialLetterData?.senderName || '');
  const [isRecipientMode, setIsRecipientMode] = useState(!!initialLetterData);
  const [showHearts, setShowHearts] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [burnPhase, setBurnPhase] = useState(0);
  const [shareUrl, setShareUrl] = useState('');
  const [shortenStatus, setShortenStatus] = useState('pending'); // pending, success, failed
  const [timeLeft, setTimeLeft] = useState(null);

  // Check for shared letter on mount
  useEffect(() => {
    if (initialLetterData) {
      setAppState(STATES.RECIPIENT_INTRO);
    } else if (hasSharedLetter()) {
      const parsed = parseLetterFromUrl();
      if (parsed) {
        setCustomLetter(parsed.letter);
        setSenderName(parsed.from || '');
        setIsRecipientMode(true);
        setAppState(STATES.RECIPIENT_INTRO);
      } else {
        setAppState(STATES.WELCOME);
      }
    } else {
      setAppState(STATES.WELCOME);
    }
  }, [initialLetterData]);

  // Get current letter content
  const currentLetter = customLetter || LETTER_CONTENT;

  // Handle welcome screen choices
  const handleWriteOwn = useCallback(() => {
    setAppState(STATES.EDITOR);
  }, []);

  const handleUseDefault = useCallback(() => {
    setCustomLetter(null);
    setAppState(STATES.ENVELOPE);
  }, []);

  // Handle letter editor
  const handleSaveLetter = useCallback((letterData) => {
    setCustomLetter(letterData);
    setSenderName(letterData.senderName || '');
    setAppState(STATES.SHARE);
  }, []);

  const handleCancelEditor = useCallback(() => {
    setAppState(STATES.WELCOME);
  }, []);

  // Handle share screen
  const handleBackToEditor = useCallback(() => {
    setAppState(STATES.EDITOR);
  }, []);

  const handlePreviewLetter = useCallback(() => {
    setAppState(STATES.ENVELOPE);
  }, []);

  // Handle recipient intro
  const handleRecipientOpen = useCallback(() => {
    setAppState(STATES.ENVELOPE);
  }, []);

  // Handle envelope open
  const handleEnvelopeOpen = useCallback(() => {
    setAppState(STATES.SEAL);
  }, []);

  // Handle seal break reveal complete
  const handleSealReveal = useCallback(() => {
    setAppState(STATES.REVEAL);
  }, []);

  // Handle text animation complete
  const handleTextComplete = useCallback(() => {
    setShowHearts(true);
    setTimerActive(true);
  }, []);

  // Handle link generation from ShareScreen
  const handleLinkGenerated = useCallback((url, status) => {
    setShareUrl(url);
    setShortenStatus(status);
  }, []);

  // Handle timer ticks
  const handleTick = useCallback((time) => {
    setTimeLeft(time);
  }, []);

  // Handle burn complete
  const handleBurnComplete = useCallback(() => {
    setIsBurning(true);
    setAppState(STATES.BURNING);
  }, []);

  // Handle burn phase update
  const handleBurnPhaseChange = useCallback((phase) => {
    setBurnPhase(phase);
    if (phase > 0 && !isBurning) {
      setIsBurning(true);
    }
  }, [isBurning]);

  // Handle replay
  const handleReplay = useCallback(() => {
    // If recipient mode, just restart the recipient flow
    if (isRecipientMode) {
      setAppState(STATES.RECIPIENT_INTRO);
    } else {
      // Clear URL params and go to welcome
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', window.location.pathname);
      }
      setAppState(STATES.WELCOME);
      setCustomLetter(null);
      setSenderName('');
      setIsRecipientMode(false);
    }
    setShowHearts(false);
    setTimerActive(false);
    setIsBurning(false);
    setBurnPhase(0);
    setTimeLeft(null);
    // Note: We intentionally don't clear shareUrl/shortenStatus here 
    // because they are specific to the generated letter.
  }, [isRecipientMode]);

  // Loading state
  if (appState === STATES.LOADING) {
    return (
      <main className="min-h-screen min-h-dvh flex items-center justify-center">
        <div className="grain-overlay" />
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💌
          </motion.div>
          <p className="font-handwritten text-xl text-[var(--ink-deep)] opacity-60">
            Loading something special...
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen min-h-dvh flex flex-col items-center justify-start py-8 px-4 overflow-y-auto overflow-x-hidden">
      {/* Grain overlay for premium feel */}
      <div className="grain-overlay" />

      {/* Welcome screen (sender mode) */}
      <AnimatePresence mode="wait">
        {appState === STATES.WELCOME && (
          <WelcomeScreen
            key="welcome"
            onWriteOwn={handleWriteOwn}
            onUseDefault={handleUseDefault}
          />
        )}
      </AnimatePresence>

      {/* Letter editor */}
      <AnimatePresence mode="wait">
        {appState === STATES.EDITOR && (
          <LetterEditor
            key="editor"
            initialData={customLetter}
            onSave={handleSaveLetter}
            onCancel={handleCancelEditor}
          />
        )}
      </AnimatePresence>

      {/* Share screen */}
      <AnimatePresence mode="wait">
        {appState === STATES.SHARE && (
          <ShareScreen
            key="share"
            letterData={customLetter}
            senderName={senderName}
            shareUrl={shareUrl}
            shortenStatus={shortenStatus}
            onLinkGenerated={handleLinkGenerated}
            onBack={handleBackToEditor}
            onPreview={handlePreviewLetter}
          />
        )}
      </AnimatePresence>

      {/* Recipient intro (when opening shared link) */}
      <AnimatePresence mode="wait">
        {appState === STATES.RECIPIENT_INTRO && (
          <RecipientIntro
            key="recipient-intro"
            senderName={senderName}
            onOpen={handleRecipientOpen}
          />
        )}
      </AnimatePresence>

      {/* Envelope intro */}
      <AnimatePresence mode="wait">
        {appState === STATES.ENVELOPE && (
          <EnvelopeIntro key="envelope" onOpen={handleEnvelopeOpen} />
        )}
      </AnimatePresence>

      {/* Scratch to reveal */}
      <AnimatePresence mode="wait">
        {appState === STATES.SEAL && !isBurning && (
          <motion.div
            key="scratch"
            className="w-full max-w-[600px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <LetterContainer>
              <WaxSealReveal onRevealComplete={handleSealReveal} />
            </LetterContainer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter reveal */}
      <AnimatePresence mode="wait">
        {(appState === STATES.REVEAL || (isBurning && appState !== STATES.BURNING)) && (
          <motion.div
            key="letter"
            className="w-full max-w-[600px] relative"
            variants={burnVariants}
            initial="initial"
            animate={isBurning ? "burning" : "initial"}
          >
            <LetterContainer>
              <HandwrittenText
                letterContent={currentLetter}
                onComplete={handleTextComplete}
              />
              {/* Integrated Controls & Timer */}
              {!isBurning && (
                <LetterFooter
                  shareUrl={!isRecipientMode ? shareUrl : ''}
                  timeLeft={timeLeft}
                />
              )}
            </LetterContainer>

            {/* Fire effect INSIDE the letter bounds */}
            {burnPhase > 0 && (
              <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                <FireEffect intensity={1} burnPhase={burnPhase} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hearts */}
      <FloatingHearts isActive={showHearts && !isBurning} />

      {/* Burn timer */}
      <BurnTimer
        isActive={timerActive}
        onBurnComplete={handleBurnComplete}
        onReplay={handleReplay}
        onBurnPhaseChange={handleBurnPhaseChange}
        onTick={handleTick}
        showTimer={false}
      />
    </main>
  );
}
