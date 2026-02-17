'use client';

import { useState } from 'react';
import { Trash, PencilSimple, Check, X } from '@phosphor-icons/react';
import type { RelationshipCardProps } from '../types';

export function RelationshipCard({ relationship, onRemove, onUpdate }: RelationshipCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(relationship.name);

  function handleSave() {
    if (editName.trim().length > 0) {
      onUpdate(relationship.id, editName.trim());
      setIsEditing(false);
    }
  }

  function handleCancel() {
    setEditName(relationship.name);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border-default bg-white p-3 shadow-sm">
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={50}
          className="flex-1 rounded border border-border-subtle px-2 py-1 text-sm focus:border-primary focus:outline-none"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="rounded p-1 text-success hover:bg-gray-light"
          aria-label="Save"
        >
          <Check size={20} />
        </button>
        <button
          onClick={handleCancel}
          className="rounded p-1 text-gray-medium hover:bg-gray-light"
          aria-label="Cancel"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border-default bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      <span className="flex-1 text-sm font-medium text-gray-dark">
        {relationship.name}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        className="rounded p-1 text-gray-medium hover:bg-gray-light hover:text-primary"
        aria-label={`Edit ${relationship.name}`}
      >
        <PencilSimple size={18} />
      </button>
      <button
        onClick={() => onRemove(relationship.id)}
        className="rounded p-1 text-gray-medium hover:bg-gray-light hover:text-error"
        aria-label={`Remove ${relationship.name}`}
      >
        <Trash size={18} />
      </button>
    </div>
  );
}
