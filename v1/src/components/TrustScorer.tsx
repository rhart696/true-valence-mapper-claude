'use client';

import type { TrustScorerProps } from '../types';
import { TRUST_LABELS } from '../constants';
import { TrustLevelSelector } from './TrustLevelSelector';

export function TrustScorer({ relationships, trustLevels, onSetTrustLevel }: TrustScorerProps) {
  const scored = relationships.filter((r) => trustLevels[r.id] !== undefined).length;
  const total = relationships.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-dark">
          Score Trust Levels
        </h2>
        <span
          className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white"
          aria-label={`${scored} of ${total} scored`}
        >
          {scored}/{total}
        </span>
      </div>

      <div className="space-y-3" role="list" aria-label="Relationships to score">
        {relationships.map((rel) => (
          <div
            key={rel.id}
            role="listitem"
            className="flex flex-col gap-2 rounded-lg border border-border-default bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-medium text-gray-dark">{rel.name}</span>
            <div className="flex items-center gap-2">
              {trustLevels[rel.id] && (
                <span className="text-xs text-gray-medium">
                  {TRUST_LABELS[trustLevels[rel.id]]}
                </span>
              )}
              <TrustLevelSelector
                relationshipId={rel.id}
                selectedLevel={trustLevels[rel.id]}
                onSelect={onSetTrustLevel}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
