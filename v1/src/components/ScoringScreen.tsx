'use client';

import type { ScoringScreenProps } from '../types';
import { STEP_LABELS } from '../constants';
import { validateAllTrustLevels } from '../lib/validation';
import { StepIndicator } from './StepIndicator';
import { TrustScorer } from './TrustScorer';

export function ScoringScreen({
  relationships,
  trustLevels,
  onSetTrustLevel,
  onNext,
  onBack,
  onOpenDefinitions,
}: ScoringScreenProps) {
  const { isValid: allScored } = validateAllTrustLevels(relationships, trustLevels);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <StepIndicator currentStep={1} totalSteps={3} labels={STEP_LABELS} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-dark">
          Score Trust Levels
        </h1>
        <p className="mt-1 text-sm text-gray-medium">
          For each relationship, select a trust level. Take your time — there are
          no wrong answers.
        </p>
      </div>

      <TrustScorer
        relationships={relationships}
        trustLevels={trustLevels}
        onSetTrustLevel={onSetTrustLevel}
      />

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="rounded-lg border-2 border-primary px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-blue-50"
          >
            Back
          </button>
          <button
            onClick={onOpenDefinitions}
            className="text-sm text-primary underline hover:text-primary-hover"
          >
            What do these mean?
          </button>
        </div>
        <button
          onClick={onNext}
          disabled={!allScored}
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
        >
          View Canvas
        </button>
      </div>
    </div>
  );
}
