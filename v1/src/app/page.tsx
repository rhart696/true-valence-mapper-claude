'use client';

import { SessionProvider, useSession } from '../context/SessionContext';
import { usePDFExport } from '../hooks/usePDFExport';
import { useState } from 'react';
import { LandingScreen } from '../components/LandingScreen';
import { NamingScreen } from '../components/NamingScreen';
import { ScoringScreen } from '../components/ScoringScreen';
import { CanvasScreen } from '../components/CanvasScreen';
import { ExportSuccessScreen } from '../components/ExportSuccessScreen';
import { TrustDefinitionsModal } from '../components/TrustDefinitionsModal';

function AppContent() {
  const {
    relationships,
    trustLevels,
    currentStep,
    addRelationship,
    removeRelationship,
    updateRelationship,
    setTrustLevel,
    setCurrentStep,
    clearSession,
  } = useSession();

  const [showDefinitions, setShowDefinitions] = useState(false);
  const { isExporting, exportPDF } = usePDFExport();

  async function handleExport() {
    await exportPDF('trust-canvas');
    setCurrentStep('complete');
  }

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {currentStep === 'landing' && (
        <div key="landing" className="screen-enter">
          <LandingScreen
            onStartSession={() => setCurrentStep('naming')}
            onOpenDefinitions={() => setShowDefinitions(true)}
          />
        </div>
      )}

      {currentStep === 'naming' && (
        <div key="naming" className="screen-enter">
          <NamingScreen
            relationships={relationships}
            onAdd={addRelationship}
            onRemove={removeRelationship}
            onUpdate={updateRelationship}
            onNext={() => setCurrentStep('scoring')}
            onOpenDefinitions={() => setShowDefinitions(true)}
          />
        </div>
      )}

      {currentStep === 'scoring' && (
        <div key="scoring" className="screen-enter">
          <ScoringScreen
            relationships={relationships}
            trustLevels={trustLevels}
            onSetTrustLevel={setTrustLevel}
            onNext={() => setCurrentStep('canvas')}
            onBack={() => setCurrentStep('naming')}
            onOpenDefinitions={() => setShowDefinitions(true)}
          />
        </div>
      )}

      {currentStep === 'canvas' && (
        <div key="canvas" className="screen-enter">
          <CanvasScreen
            relationships={relationships}
            trustLevels={trustLevels}
            onExport={handleExport}
            onBack={() => setCurrentStep('scoring')}
          />
          {isExporting && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/80"
              role="status"
              aria-label="Generating PDF"
            >
              <div className="flex flex-col items-center gap-3 text-primary">
                <svg
                  className="h-10 w-10 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-sm font-medium text-gray-dark">Generating PDF…</span>
              </div>
            </div>
          )}
        </div>
      )}

      {currentStep === 'complete' && (
        <div key="complete" className="screen-enter">
          <ExportSuccessScreen onNewSession={clearSession} />
        </div>
      )}

      <TrustDefinitionsModal
        isOpen={showDefinitions}
        onClose={() => setShowDefinitions(false)}
      />
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
