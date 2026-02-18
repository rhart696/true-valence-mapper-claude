// Constants — True Valence Mapper v2.0

import type { ArrowScoreDefinition, ArrowScore } from './types';

// Relationship limits
export const MAX_RELATIONSHIPS = 25;
export const MAX_NAME_LENGTH = 50;
export const MIN_NAME_LENGTH = 1;

// Arrow score definitions
export const ARROW_SCORE_DEFINITIONS: ArrowScoreDefinition[] = [
  {
    score: 'high',
    label: 'High Confidence',
    description: 'You are highly confident about this direction of approach.',
    color: '#00B87C',
    badge: 'H',
  },
  {
    score: 'medium',
    label: 'Medium Confidence',
    description: 'You have moderate confidence about this direction of approach.',
    color: '#0052CC',
    badge: 'M',
  },
  {
    score: 'low',
    label: 'Low Confidence',
    description: 'You have low confidence about this direction of approach.',
    color: '#FFAB00',
    badge: 'L',
  },
  {
    score: 'unscored',
    label: 'Not Yet Scored',
    description: 'You have not yet rated confidence for this direction.',
    color: '#C1C7D0',
    badge: '?',
  },
];

// Arrow score color map (for quick lookup)
export const ARROW_SCORE_COLORS: Record<ArrowScore, string> = {
  high: '#00B87C',
  medium: '#0052CC',
  low: '#FFAB00',
  unscored: '#C1C7D0',
};

// Arrow score badge labels
export const ARROW_SCORE_LABELS: Record<ArrowScore, string> = {
  high: 'H',
  medium: 'M',
  low: 'L',
  unscored: '?',
};

// Click-to-cycle order
export const ARROW_SCORE_CYCLE: ArrowScore[] = ['unscored', 'high', 'medium', 'low'];

export function cycleArrowScore(current: ArrowScore): ArrowScore {
  const idx = ARROW_SCORE_CYCLE.indexOf(current);
  return ARROW_SCORE_CYCLE[(idx + 1) % ARROW_SCORE_CYCLE.length];
}

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
