// Validation — True Valence Mapper v1.0
// Generated from 14-API-CONTRACT.md §5

import type { Relationship, TrustLevel } from '../types';
import { MAX_NAME_LENGTH, MAX_RELATIONSHIPS, MIN_NAME_LENGTH, MIN_RELATIONSHIPS } from '../constants';

export function validateRelationshipName(
  name: string,
  existingNames: string[]
): { isValid: boolean; error?: string } {
  const trimmed = name.trim();

  if (trimmed.length < MIN_NAME_LENGTH) {
    return { isValid: false, error: 'Please enter a relationship name' };
  }

  if (trimmed.length > MAX_NAME_LENGTH) {
    return { isValid: false, error: `Name must be ${MAX_NAME_LENGTH} characters or fewer` };
  }

  const isDuplicate = existingNames.some(
    (existing) => existing.toLowerCase() === trimmed.toLowerCase()
  );
  if (isDuplicate) {
    return { isValid: false, error: 'This relationship name is already in your list' };
  }

  return { isValid: true };
}

export function validateRelationshipsCount(count: number): {
  isValid: boolean;
  canAdd: boolean;
  canProceed: boolean;
  error?: string;
} {
  const canAdd = count < MAX_RELATIONSHIPS;
  const canProceed = count >= MIN_RELATIONSHIPS;

  if (count < MIN_RELATIONSHIPS) {
    return {
      isValid: true,
      canAdd,
      canProceed,
      error: `Add at least ${MIN_RELATIONSHIPS - count} more relationship${MIN_RELATIONSHIPS - count === 1 ? '' : 's'} to continue`,
    };
  }

  if (count >= MAX_RELATIONSHIPS) {
    return {
      isValid: true,
      canAdd: false,
      canProceed: true,
      error: `Maximum ${MAX_RELATIONSHIPS} relationships reached`,
    };
  }

  return { isValid: true, canAdd, canProceed };
}

export function validateTrustLevel(level: unknown): level is TrustLevel {
  return (
    typeof level === 'string' && ['high', 'moderate', 'low', 'none'].includes(level)
  );
}

export function validateAllTrustLevels(
  relationships: Relationship[],
  trustLevels: Record<string, TrustLevel>
): { isValid: boolean; scored: number; total: number; error?: string } {
  const total = relationships.length;
  const scored = relationships.filter((r) => trustLevels[r.id] !== undefined).length;

  if (scored < total) {
    return {
      isValid: false,
      scored,
      total,
      error: `Please score ${total - scored} more relationship${total - scored === 1 ? '' : 's'}`,
    };
  }

  return { isValid: true, scored, total };
}
