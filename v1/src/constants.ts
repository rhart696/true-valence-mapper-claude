// Constants — True Valence Mapper v1.0
// Generated from 09-DESIGN-SYSTEM.md and 14-API-CONTRACT.md

import type { TrustDefinition, TrustLevel } from './types';

// Relationship limits
export const MIN_RELATIONSHIPS = 12;
export const MAX_RELATIONSHIPS = 25;
export const MAX_NAME_LENGTH = 50;
export const MIN_NAME_LENGTH = 1;

// Trust level definitions
export const TRUST_DEFINITIONS: TrustDefinition[] = [
  {
    level: 'high',
    label: 'High Trust',
    description:
      'You would trust this person with critical decisions, confidential information, and your reputation. You have complete confidence in their integrity and competence.',
    color: '#00B87C',
    icon: 'ShieldCheck',
  },
  {
    level: 'moderate',
    label: 'Moderate Trust',
    description:
      'You trust this person with routine tasks and standard information, but you\'d hesitate to involve them in critical decisions. You have partial confidence in their abilities and intentions.',
    color: '#0052CC',
    icon: 'Shield',
  },
  {
    level: 'low',
    label: 'Low Trust',
    description:
      'You trust this person with basic information or minor tasks, but you\'d avoid involving them in anything important. You have limited confidence and proceed with caution.',
    color: '#FFAB00',
    icon: 'ShieldWarning',
  },
  {
    level: 'none',
    label: 'No Trust',
    description:
      'You do not trust this person with anything significant. You have no confidence in their integrity, competence, or intentions, and you minimize interactions.',
    color: '#FF5630',
    icon: 'ShieldSlash',
  },
];

// Trust level color map (for quick lookup)
export const TRUST_COLORS: Record<TrustLevel, string> = {
  high: '#00B87C',
  moderate: '#0052CC',
  low: '#FFAB00',
  none: '#FF5630',
};

// Trust level labels (for quick lookup)
export const TRUST_LABELS: Record<TrustLevel, string> = {
  high: 'High Trust',
  moderate: 'Moderate Trust',
  low: 'Low Trust',
  none: 'No Trust',
};

// Trust level order (for canvas grouping)
export const TRUST_LEVEL_ORDER: TrustLevel[] = ['high', 'moderate', 'low', 'none'];

// Design system colors
export const COLORS = {
  primary: '#0052CC',
  primaryHover: '#0047B3',
  primaryActive: '#003A8F',
  secondary: '#00B87C',
  accent: '#FF6B35',
  grayLight: '#F4F5F7',
  grayMedium: '#6B778C',
  grayDark: '#091E42',
  white: '#FFFFFF',
  borderDefault: '#DFE1E6',
  borderSubtle: '#EBECF0',
  borderStrong: '#6B778C',
  success: '#00B87C',
  error: '#FF5630',
  warning: '#FFAB00',
  info: '#0052CC',
} as const;

// Step configuration
export const STEPS = {
  naming: { index: 0, label: 'Name Relationships' },
  scoring: { index: 1, label: 'Score Trust' },
  canvas: { index: 2, label: 'View Canvas' },
} as const;

export const STEP_LABELS = ['Name Relationships', 'Score Trust', 'View Canvas'];
