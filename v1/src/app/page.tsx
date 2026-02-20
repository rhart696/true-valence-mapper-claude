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

function AppContent() {
  const { currentStep, setCurrentStep, clearSession, relationships, coacheeName, loadDemo } = useSession();
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { isExporting, exportPDF, exportPNG } = usePDFExport();

  // Show welcome modal on first visit (localStorage gate)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(WELCOME_STORAGE_KEY)) {
      setShowWelcome(true);
    }
  }, []);

  function handleWelcomeComplete() {
    localStorage.setItem(WELCOME_STORAGE_KEY, '1');
    setShowWelcome(false);
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
