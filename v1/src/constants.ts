// Constants — True Valence Mapper v2.0

import type { ArrowScoreDefinition, ArrowScore } from './types';

// Relationship limits
export const MAX_RELATIONSHIPS = 25;
export const MAX_NAME_LENGTH = 50;
export const MIN_NAME_LENGTH = 1;

// Arrow score definitions — ProActive ReSolutions brand palette
export const ARROW_SCORE_DEFINITIONS: ArrowScoreDefinition[] = [
  {
    score: 'high',
    label: 'High Confidence',
    description: 'You are highly confident about this direction of approach.',
    color: '#7DC242', // PMS 375 green
    badge: 'H',
  },
  {
    score: 'medium',
    label: 'Medium Confidence',
    description: 'You have moderate confidence about this direction of approach.',
    color: '#00AEEF', // ProActive sky blue
    badge: 'M',
  },
  {
    score: 'low',
    label: 'Low Confidence',
    description: 'You have low confidence about this direction of approach.',
    color: '#FFD100', // PMS 109 yellow
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
  high: '#7DC242',
  medium: '#00AEEF',
  low: '#FFD100',
  unscored: '#C1C7D0',
};

// Arrow score badge labels
export const ARROW_SCORE_LABELS: Record<ArrowScore, string> = {
  high: 'H',
  medium: 'M',
  low: 'L',
  unscored: '?',
};

// Arrow stroke dash patterns — colour + dash pattern for WCAG 1.4.1 (non-colour distinction)
export const ARROW_SCORE_DASH_PATTERNS: Record<ArrowScore, string | undefined> = {
  high: undefined,         // solid
  medium: '8 4',           // dashes
  low: '3 3',              // dots
  unscored: '10 6',        // long dashes
};

// Click-to-cycle order
export const ARROW_SCORE_CYCLE: ArrowScore[] = ['unscored', 'high', 'medium', 'low'];

export function cycleArrowScore(current: ArrowScore): ArrowScore {
  const idx = ARROW_SCORE_CYCLE.indexOf(current);
  return ARROW_SCORE_CYCLE[(idx + 1) % ARROW_SCORE_CYCLE.length];
}

// Demo data — pre-built map showing all score patterns for demos and first-time users
export const DEMO_RELATIONSHIPS: Array<{
  name: string;
  outbound: ArrowScore;
  inbound: ArrowScore;
  note?: string;
}> = [
  { name: 'Kate', outbound: 'high', inbound: 'high', note: 'Trusted ally — go-to for political guidance.' },
  { name: 'James', outbound: 'high', inbound: 'medium' },
  { name: 'Marcus', outbound: 'medium', inbound: 'medium' },
  { name: 'Priya', outbound: 'high', inbound: 'low' },
  { name: 'David', outbound: 'low', inbound: 'medium' },
  { name: 'Amara', outbound: 'medium', inbound: 'high' },
  { name: 'Chen', outbound: 'unscored', inbound: 'unscored' },
];

// Design system colors — ProActive ReSolutions brand
export const COLORS = {
  primary: '#003087',       // PMS 280 navy
  primaryHover: '#002070',
  primaryActive: '#001555',
  secondary: '#7DC242',     // PMS 375 green
  accent: '#FFD100',        // PMS 109 yellow
  brandSky: '#00AEEF',      // ProActive sky blue
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
