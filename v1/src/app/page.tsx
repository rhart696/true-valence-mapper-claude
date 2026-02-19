'use client';

import { SessionProvider, useSession } from '../context/SessionContext';
import { usePDFExport } from '../hooks/usePDFExport';
import { useState } from 'react';
import { LandingScreen } from '../components/LandingScreen';
import { MapScreen } from '../components/MapScreen';
import { ExportSuccessScreen } from '../components/ExportSuccessScreen';
import { TrustDefinitionsModal } from '../components/TrustDefinitionsModal';

function AppContent() {
  const { currentStep, setCurrentStep, clearSession, relationships, coacheeName } = useSession();
  const [showDefinitions, setShowDefinitions] = useState(false);
  const { isExporting, exportPDF } = usePDFExport();

  async function handleExport() {
    await exportPDF('hub-spoke-svg', relationships, coacheeName);
    setCurrentStep('complete');
  }

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {currentStep === 'landing' && (
        <div key="landing" className="screen-enter">
          <LandingScreen
            onStartSession={() => setCurrentStep('map')}
            onOpenDefinitions={() => setShowDefinitions(true)}
          />
        </div>
      )}

      {currentStep === 'map' && (
        <MapScreen isExporting={isExporting} onExport={handleExport} />
      )}

      {currentStep === 'complete' && (
        <div key="complete" className="screen-enter">
          <ExportSuccessScreen onNewSession={clearSession} onBackToMap={() => setCurrentStep('map')} coacheeName={coacheeName} />
        </div>
      )}

      {/* Modal for landing screen */}
      {currentStep === 'landing' && (
        <TrustDefinitionsModal
          isOpen={showDefinitions}
          onClose={() => setShowDefinitions(false)}
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
