'use client';

import { HubSpokeCanvas } from './HubSpokeCanvas';
import { FloatingPanel } from './FloatingPanel';

interface MapScreenProps {
  isExporting: boolean;
  onExport: () => void;
}

export function MapScreen({ isExporting, onExport }: MapScreenProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Full-screen SVG canvas (z-index 0) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HubSpokeCanvas />
      </div>

      {/* Floating panel (z-index 10) */}
      <FloatingPanel onExport={onExport} />

      {/* PDF export loading overlay */}
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
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-dark">Generating PDF…</span>
          </div>
        </div>
      )}
    </div>
  );
}
