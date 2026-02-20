// Core Types — True Valence Mapper v2.0

export type ArrowScore = 'high' | 'medium' | 'low' | 'unscored';
export type ArrowDirection = 'outbound' | 'inbound';

export interface Relationship {
  id: string;
  name: string;
  outbound: ArrowScore; // hub→node: "I will go to them"
  inbound: ArrowScore;  // node→hub: "They will come to me"
  note?: string;
}

export type Step = 'landing' | 'map' | 'complete';

export interface SessionState {
  coacheeName: string;
  relationships: Relationship[];
  currentStep: Step;
}

// UI Types

export interface ArrowScoreDefinition {
  score: ArrowScore;
  label: string;
  description: string;
  color: string;
  badge: string;
}

export interface FormError {
  field: string;
  message: string;
}

// Export Types

export interface ExportOptions {
  scale?: number;
  filename?: string;
}

export interface ExportResult {
  success: boolean;
  filename?: string;
  error?: string;
}

// Persistence

export const SESSION_STORAGE_KEY = 'tvm_session_v1';

// Component Props

export interface LandingScreenProps {
  onStartSession: () => void;
  onOpenDefinitions: () => void;
  onLoadDemo: () => void;
}

export interface ExportSuccessScreenProps {
  onNewSession: () => void;
  onBackToMap: () => void;
  coacheeName?: string;
}

export interface RelationshipFormProps {
  onAdd: (name: string) => void;
  existingNames: string[];
  relationshipCount: number;
}

export interface TrustDefinitionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
