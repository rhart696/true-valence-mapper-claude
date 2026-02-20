'use client';

import { SessionProvider, useSession } from '../context/SessionContext';
import { usePDFExport } from '../hooks/usePDFExport';
import { useState, useEffect } from 'react';
import { LandingScreen } from '../components/LandingScreen';
import { MapScreen } from '../components/MapScreen';
import { ExportSuccessScreen } from '../components/ExportSuccessScreen';
import { TrustDefinitionsModal } from '../components/TrustDefinitionsModal';
import { WelcomeModal, WELCOME_STORAGE_KEY } from '../components/WelcomeModal';
import { DEMO_RELATIONSHIPS } from '../constants';

// --- Resume Prompt ---

interface ResumePromptProps {
  coacheeName: string;
  relationshipCount: number;
  onResume: () => void;
  onStartFresh: () => void;
}

function ResumePrompt({ coacheeName, relationshipCount, onResume, onStartFresh }: ResumePromptProps) {
  const label = coacheeName
    ? `"${coacheeName}" — ${relationshipCount} relationship${relationshipCount !== 1 ? 's' : ''}`
    : `${relationshipCount} relationship${relationshipCount !== 1 ? 's' : ''} (no name set)`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <h2 id="resume-title" className="mb-2 text-xl font-bold text-gray-dark">
          Resume last session?
        </h2>
        <p className="mb-1 text-sm text-gray-medium">Saved session found:</p>
        <p className="mb-6 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-dark">
          {label}
        </p>

        <button
          onClick={onResume}
          autoFocus
          className="mb-3 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-150 hover:bg-primary-hover hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Resume last session
        </button>

        <button
          onClick={onStartFresh}
          className="w-full rounded-lg border-2 border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-dark transition-all duration-150 hover:border-gray-400 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start fresh
        </button>
      </div>
    </div>
  );
}

// --- App ---

function AppContent() {
  const { currentStep, setCurrentStep, clearSession, relationships, coacheeName, loadDemo, savedSession, restoreSession } = useSession();
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const { isExporting, exportPDF, exportPNG } = usePDFExport();

  // Show welcome modal on first-ever visit (localStorage gate)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(WELCOME_STORAGE_KEY)) {
      setShowWelcome(true);
    } else if (savedSession) {
      // Only offer resume if the user has seen the welcome modal before
      setShowResumePrompt(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleWelcomeComplete() {
    localStorage.setItem(WELCOME_STORAGE_KEY, '1');
    setShowWelcome(false);
    // Don't offer resume on very first visit — the user just onboarded
  }

  function handleResume() {
    restoreSession();
    setShowResumePrompt(false);
  }

  function handleStartFresh() {
    clearSession();
    setShowResumePrompt(false);
  }

  async function handleExport() {
    await exportPDF('hub-spoke-svg', relationships, coacheeName);
    setCurrentStep('complete');
  }

  async function handleExportPNG() {
    await exportPNG('hub-spoke-svg', coacheeName);
  }

  function handleLoadDemo() {
    loadDemo(DEMO_RELATIONSHIPS);
  }

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {currentStep === 'landing' && (
        <div key="landing" className="screen-enter">
          <LandingScreen
            onStartSession={() => setCurrentStep('map')}
            onOpenDefinitions={() => setShowDefinitions(true)}
            onLoadDemo={handleLoadDemo}
          />
        </div>
      )}

      {currentStep === 'map' && (
        <MapScreen isExporting={isExporting} onExport={handleExport} onExportPNG={handleExportPNG} />
      )}

      {currentStep === 'complete' && (
        <div key="complete" className="screen-enter">
          <ExportSuccessScreen onNewSession={clearSession} onBackToMap={() => setCurrentStep('map')} coacheeName={coacheeName} />
        </div>
      )}

      {/* Modals for landing screen */}
      {currentStep === 'landing' && (
        <>
          <WelcomeModal isOpen={showWelcome} onComplete={handleWelcomeComplete} />
          <TrustDefinitionsModal
            isOpen={showDefinitions && !showWelcome}
            onClose={() => setShowDefinitions(false)}
          />
        </>
      )}

      {/* Resume prompt — shown above everything when a saved session is detected */}
      {showResumePrompt && savedSession && !showWelcome && (
        <ResumePrompt
          coacheeName={savedSession.coacheeName}
          relationshipCount={savedSession.relationships.length}
          onResume={handleResume}
          onStartFresh={handleStartFresh}
        />
      )}
    </main>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}
