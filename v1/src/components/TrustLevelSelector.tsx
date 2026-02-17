'use client';

import type { TrustLevelSelectorProps } from '../types';
import { TRUST_DEFINITIONS } from '../constants';

export function TrustLevelSelector({ relationshipId, selectedLevel, onSelect }: TrustLevelSelectorProps) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Trust level">
      {TRUST_DEFINITIONS.map((def) => {
        const isSelected = selectedLevel === def.level;
        return (
          <button
            key={def.level}
            onClick={() => onSelect(relationshipId, def.level)}
            role="radio"
            aria-checked={isSelected}
            aria-label={def.label}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              isSelected
                ? 'text-white shadow-md ring-2 ring-offset-1'
                : 'border border-border-default bg-white text-gray-medium hover:border-gray-medium'
            }`}
            style={
              isSelected
                ? { backgroundColor: def.color, outlineColor: def.color }
                : undefined
            }
          >
            {def.label.replace(' Trust', '')}
          </button>
        );
      })}
    </div>
  );
}
