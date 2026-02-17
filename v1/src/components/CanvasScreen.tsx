'use client';

import { DownloadSimple, ArrowLeft } from '@phosphor-icons/react';
import type { CanvasScreenProps } from '../types';
import { STEP_LABELS } from '../constants';
import { StepIndicator } from './StepIndicator';
import { VisualCanvas } from './VisualCanvas';

export function CanvasScreen({
  relationships,
  trustLevels,
  onExport,
  onBack,
}: CanvasScreenProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <StepIndicator currentStep={2} totalSteps={3} labels={STEP_LABELS} />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-dark">
            Your Trust Map
          </h1>
          <p className="mt-1 text-sm text-gray-medium">
            Here&apos;s your coachee&apos;s relationship landscape, grouped by trust level.
          </p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <DownloadSimple size={20} />
          Export PDF
        </button>
      </div>

      <VisualCanvas relationships={relationships} trustLevels={trustLevels} />

      <div className="mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-lg border-2 border-primary px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-blue-50"
        >
          <ArrowLeft size={18} />
          Back to Scoring
        </button>
      </div>
    </div>
  );
}
