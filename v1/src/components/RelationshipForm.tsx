'use client';

import { useState } from 'react';
import type { RelationshipFormProps } from '../types';
import { validateRelationshipName, validateRelationshipsCount } from '../lib/validation';

export function RelationshipForm({ onAdd, existingNames, relationshipCount }: RelationshipFormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | undefined>();

  const { canAdd } = validateRelationshipsCount(relationshipCount);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = validateRelationshipName(name, existingNames);
    if (!result.isValid) {
      setError(result.error);
      return;
    }
    onAdd(name.trim());
    setName('');
    setError(undefined);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <label htmlFor="relationship-name" className="sr-only">
          Relationship name
        </label>
        <input
          id="relationship-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(undefined);
          }}
          placeholder="Enter a name..."
          disabled={!canAdd}
          maxLength={50}
          className="w-full rounded-lg border-2 border-border-subtle px-4 py-3 text-base text-gray-dark placeholder:text-gray-medium focus:border-primary focus:outline-none disabled:opacity-50"
          aria-invalid={!!error}
          aria-describedby={error ? 'name-error' : undefined}
        />
        {error && (
          <p id="name-error" role="alert" className="mt-1 text-sm text-error">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={!canAdd || name.trim().length === 0}
        className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}
