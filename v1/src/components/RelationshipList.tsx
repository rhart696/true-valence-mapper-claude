'use client';

import type { RelationshipListProps } from '../types';
import { MIN_RELATIONSHIPS, MAX_RELATIONSHIPS } from '../constants';
import { RelationshipForm } from './RelationshipForm';
import { RelationshipCard } from './RelationshipCard';

export function RelationshipList({ relationships, onAdd, onRemove, onUpdate }: RelationshipListProps) {
  const count = relationships.length;
  const existingNames = relationships.map((r) => r.name);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-dark">
          Relationships
        </h2>
        <span
          className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white"
          aria-label={`${count} of ${MAX_RELATIONSHIPS} relationships`}
        >
          {count}/{MAX_RELATIONSHIPS}
        </span>
      </div>

      <RelationshipForm
        onAdd={onAdd}
        existingNames={existingNames}
        relationshipCount={count}
      />

      {count > 0 && (
        <div className="space-y-2" role="list" aria-label="Relationships">
          {relationships.map((rel) => (
            <div key={rel.id} role="listitem">
              <RelationshipCard
                relationship={rel}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            </div>
          ))}
        </div>
      )}

      {count < MIN_RELATIONSHIPS && (
        <p className="text-sm text-gray-medium">
          Add at least {MIN_RELATIONSHIPS - count} more to continue
        </p>
      )}
    </div>
  );
}
