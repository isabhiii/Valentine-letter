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

  const [manualBurnActive, setManualBurnActive] = useState(false);

  // Handle manual burn trigger
  const handleManualBurn = useCallback(() => {
    setManualBurnActive(true);
    setTimerActive(true);
  }, []);

  // Handle burn complete
  const handleBurnComplete = useCallback(() => {
    setIsBurning(true);
    setManualBurnActive(false);
  }, []);

  // Handle phase progression for fire effect
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
    setManualBurnActive(false);
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
    <main className="min-h-screen min-h-dvh flex flex-col items-center justify-start relative">
      {/* Grain overlay for premium feel */}
      <div className="grain-overlay" />

      {/* Screen Transitions */}
      <AnimatePresence mode="wait">
        {appState === STATES.WELCOME && (
          <WelcomeScreen
            key="welcome"
            onWriteOwn={handleWriteOwn}
            onUseDefault={handleUseDefault}
          />
        )}

        {appState === STATES.EDITOR && (
          <LetterEditor
            key="editor"
            initialData={customLetter}
            onSave={handleSaveLetter}
            onCancel={handleCancelEditor}
          />
        )}

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

        {appState === STATES.RECIPIENT_INTRO && (
          <RecipientIntro
            key="recipient-intro"
            senderName={senderName}
            onOpen={handleRecipientOpen}
          />
        )}

        {appState === STATES.ENVELOPE && (
          <EnvelopeIntro
            key="envelope"
            onOpen={handleEnvelopeOpen}
          />
        )}

        {appState === STATES.SEAL && !isBurning && (
          <motion.div
            key="seal"
            className="fixed inset-0 z-40 flex flex-col items-center w-full h-full px-6 overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-grow min-h-[4rem]" />
            <div className="w-full max-w-[600px] mx-auto">
              <LetterContainer>
                <WaxSealReveal onRevealComplete={handleSealReveal} />
              </LetterContainer>
            </div>
            <div className="flex-grow min-h-[4rem]" />
          </motion.div>
        )}

        {(appState === STATES.REVEAL || (isBurning && appState !== STATES.BURNING)) && (
          <motion.div
            key="reveal"
            className="fixed inset-0 z-40 flex flex-col items-center w-full h-full px-6 overflow-y-auto overflow-x-hidden"
            variants={burnVariants}
            initial="initial"
            animate={isBurning ? "burning" : "initial"}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex-grow min-h-[4rem]" />
            <div className="w-full max-w-[600px] mx-auto relative group">
              <LetterContainer className="relative">
                <HandwrittenText
                  letterContent={currentLetter}
                  onComplete={handleTextComplete}
                />
                {!isBurning && (
                  <LetterFooter
                    shareUrl={!isRecipientMode ? shareUrl : ''}
                    isRecipientMode={isRecipientMode}
                    onBurn={handleManualBurn}
                  />
                )}

                {burnPhase > 0 && (
                  <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-50">
                    <FireEffect intensity={1} burnPhase={burnPhase} />
                  </div>
                )}
              </LetterContainer>
            </div>
            <div className="flex-grow min-h-[4rem]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hearts */}
      <FloatingHearts isActive={showHearts && !isBurning} />

      {/* Burn animation controller */}
      <BurnTimer
        isActive={manualBurnActive}
        onBurnComplete={handleBurnComplete}
        onReplay={handleReplay}
        onBurnPhaseChange={handleBurnPhaseChange}
      />
    </main>
  );
}
