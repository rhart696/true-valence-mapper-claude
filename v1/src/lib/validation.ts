// Validation — True Valence Mapper v2.0

import { MAX_NAME_LENGTH, MAX_RELATIONSHIPS, MIN_NAME_LENGTH } from '../constants';

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
  canAdd: boolean;
  error?: string;
} {
  if (count >= MAX_RELATIONSHIPS) {
    return {
      canAdd: false,
      error: `Maximum ${MAX_RELATIONSHIPS} relationships reached`,
    };
  }

  return { canAdd: true };
}
