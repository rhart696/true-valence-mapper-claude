'use client';

import { DecisionDialog } from '../components/DecisionDialog';
import { SessionProvider, useSession } from '../context/SessionContext';
import { usePDFExport } from '../hooks/usePDFExport';
import { useState, useEffect } from 'react';
import { LandingScreen } from '../components/LandingScreen';
import { MapScreen } from '../components/MapScreen';
import { ExportSuccessScreen } from '../components/ExportSuccessScreen';
import { TrustDefinitionsModal } from '../components/TrustDefinitionsModal';
import { WelcomeModal, WELCOME_STORAGE_KEY } from '../components/WelcomeModal';
import { DEMO_RELATIONSHIPS } from '../constants';
import { loadSession } from '../lib/shareSession';
import type { SessionState } from '../types';

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
    <DecisionDialog titleId="resume-title" onCancel={onResume}>
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
    </DecisionDialog>
  );
}

// --- Load Shared Session Prompt ---

interface LoadSharedPromptProps {
  sharedSession: SessionState;
  shareCode: string;
  hasCurrentData: boolean;
  error: string | null;
  onLoad: () => void;
  onDismiss: () => void;
}

function LoadSharedPrompt({ sharedSession, shareCode, hasCurrentData, error, onLoad, onDismiss }: LoadSharedPromptProps) {
  const count = sharedSession.relationships.length;
  const name = sharedSession.coacheeName;
  const label = name
    ? `"${name}" — ${count} relationship${count !== 1 ? 's' : ''}`
    : `${count} relationship${count !== 1 ? 's' : ''}`;

  return (
    <DecisionDialog titleId="load-shared-title" onCancel={onDismiss}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <h2 id="load-shared-title" className="mb-2 text-xl font-bold text-gray-dark">
          Load shared session?
        </h2>
        <p className="mb-1 text-sm text-gray-medium">
          Code <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700, color: '#003087' }}>{shareCode}</span>
        </p>
        <p className="mb-6 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-dark">
          {label}
        </p>

        {hasCurrentData && (
          <p className="mb-4 text-xs text-gray-medium">
            Your current session will be replaced. Export it first if you want to keep it.
          </p>
        )}

        {error && <p role="alert" className="mb-4 text-sm text-gray-dark">{error}</p>}
        <button
          onClick={onLoad}
          autoFocus
          className="mb-3 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-150 hover:bg-primary-hover hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Load session
        </button>

        <button
          onClick={onDismiss}
          className="w-full rounded-lg border-2 border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-dark transition-all duration-150 hover:border-gray-400 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Dismiss
        </button>
      </div>
    </DecisionDialog>
  );
}

// --- App ---

function AppContent() {
  const { currentStep, setCurrentStep, clearSession, relationships, coacheeName, replaceSession, loadDemo, savedSession, storageError, restoreSession } = useSession();
  const [actionError, setActionError] = useState<string | null>(null);
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [pendingShared, setPendingShared] = useState<{ session: SessionState; code: string } | null>(null);
  const { isExporting, exportPDF, exportPNG } = usePDFExport();

  function applySharedSession(session: SessionState) {
    if (!replaceSession({ ...session, currentStep: 'map' })) return;
    setShowResumePrompt(false);
    setPendingShared(null);
    setActionError(null);
  }

  // Check for ?share= param and load session from Supabase
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const shareCode = params.get('share');
    if (!shareCode) return;

    // Remove the param from the URL immediately so refreshing doesn't re-trigger
    const clean = new URL(window.location.href);
    clean.searchParams.delete('share');
    window.history.replaceState({}, '', clean.toString());

    loadSession(shareCode).then((session) => {
      if (!session) { setActionError('The shared map could not be loaded. It may be invalid or expired. Your current map has been kept.'); return; }
      // A saved map may still be awaiting the resume choice. Always ask before
      // applying a fetched map, including when that asynchronous choice is pending.
      setPendingShared({ session, code: shareCode });
    }).catch(() => setActionError('The shared map could not be loaded. Your current map has been kept. Try again or contact the sender.'));
  }, []);

  // Read welcome state after hydration; a restored map arrives asynchronously.
  useEffect(() => {
    queueMicrotask(() => {
      let welcomed = false;
      try { welcomed = !!localStorage.getItem(WELCOME_STORAGE_KEY); } catch { /* persistence banner explains browser restrictions */ }
      setShowWelcome(!welcomed);
      setShowResumePrompt(!!savedSession);
    });
  }, [savedSession]);

  function handleWelcomeComplete() {
    try { localStorage.setItem(WELCOME_STORAGE_KEY, '1'); } catch { /* continue without storage */ }
    setShowWelcome(false);
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
    setActionError(null);
    if (await exportPDF('hub-spoke-svg', relationships, coacheeName)) setCurrentStep('complete');
    else setActionError('The PDF could not be prepared. Your map has been kept. Try again or use your browser Print command and verify the resulting file.');
  }

  async function handleExportPNG() {
    setActionError(null);
    if (!await exportPNG('hub-spoke-svg', coacheeName)) setActionError('The image could not be prepared. Your map has been kept. Try again.');
  }

  function handleLoadDemo() {
    loadDemo(DEMO_RELATIONSHIPS);
  }

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {actionError && <p role="alert" className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-sm text-gray-dark">{actionError}</p>}
      {storageError && !pendingShared && <p role="alert" className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-sm text-gray-dark">{storageError}</p>}
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
          {showWelcome && <WelcomeModal isOpen onComplete={handleWelcomeComplete} />}
          <TrustDefinitionsModal
            isOpen={showDefinitions && !showWelcome}
            onClose={() => setShowDefinitions(false)}
          />
        </>
      )}

      {/* Resume prompt — shown above everything when a saved session is detected */}
      {showResumePrompt && savedSession && !showWelcome && !pendingShared && (
        <ResumePrompt
          coacheeName={savedSession.coacheeName}
          relationshipCount={savedSession.relationships.length}
          onResume={handleResume}
          onStartFresh={handleStartFresh}
        />
      )}

      {/* Load shared session prompt — takes priority over resume prompt */}
      {pendingShared && (
        <LoadSharedPrompt
          sharedSession={pendingShared.session}
          shareCode={pendingShared.code}
          error={storageError}
          hasCurrentData={relationships.length > 0 || coacheeName !== '' || !!savedSession || !!storageError}
          onLoad={() => applySharedSession(pendingShared.session)}
          onDismiss={() => setPendingShared(null)}
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
