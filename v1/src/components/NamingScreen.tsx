'use client';

import type { NamingScreenProps } from '../types';
import { MIN_RELATIONSHIPS } from '../constants';
import { StepIndicator } from './StepIndicator';
import { RelationshipList } from './RelationshipList';
import { STEP_LABELS } from '../constants';

export function NamingScreen({
  relationships,
  onAdd,
  onRemove,
  onUpdate,
  onNext,
  onOpenDefinitions,
}: NamingScreenProps) {
  const canProceed = relationships.length >= MIN_RELATIONSHIPS;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <StepIndicator currentStep={0} totalSteps={3} labels={STEP_LABELS} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-dark">
          Name Your Relationships
        </h1>
        <p className="mt-1 text-sm text-gray-medium">
          Who are the people in your coachee&apos;s professional network? Add 12-25
          names.
        </p>
      </div>

      <RelationshipList
        relationships={relationships}
        onAdd={onAdd}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onOpenDefinitions}
          className="text-sm text-primary underline hover:text-primary-hover"
        >
          Trust level definitions
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
        >
          Next: Score Trust
        </button>
      </div>
    </div>
  );
}
