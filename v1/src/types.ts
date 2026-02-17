// Core Types — True Valence Mapper v1.0
// Generated from 14-API-CONTRACT.md

export interface Relationship {
  id: string;
  name: string;
}

export type TrustLevel = 'high' | 'moderate' | 'low' | 'none';

export type Step = 'landing' | 'naming' | 'scoring' | 'canvas' | 'complete';

export interface SessionState {
  relationships: Relationship[];
  trustLevels: Record<string, TrustLevel>;
  currentStep: Step;
}

// UI Types

export interface TrustDefinition {
  level: TrustLevel;
  label: string;
  description: string;
  color: string;
  icon: string;
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

// Component Props

export interface LandingScreenProps {
  onStartSession: () => void;
  onOpenDefinitions: () => void;
}

export interface NamingScreenProps {
  relationships: Relationship[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, name: string) => void;
  onNext: () => void;
  onOpenDefinitions: () => void;
}

export interface ScoringScreenProps {
  relationships: Relationship[];
  trustLevels: Record<string, TrustLevel>;
  onSetTrustLevel: (id: string, level: TrustLevel) => void;
  onNext: () => void;
  onBack: () => void;
  onOpenDefinitions: () => void;
}

export interface CanvasScreenProps {
  relationships: Relationship[];
  trustLevels: Record<string, TrustLevel>;
  onExport: () => void;
  onBack: () => void;
}

export interface ExportSuccessScreenProps {
  onNewSession: () => void;
}

export interface RelationshipListProps {
  relationships: Relationship[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, name: string) => void;
}

export interface RelationshipCardProps {
  relationship: Relationship;
  onRemove: (id: string) => void;
  onUpdate: (id: string, name: string) => void;
}

export interface RelationshipFormProps {
  onAdd: (name: string) => void;
  existingNames: string[];
  relationshipCount: number;
}

export interface TrustScorerProps {
  relationships: Relationship[];
  trustLevels: Record<string, TrustLevel>;
  onSetTrustLevel: (id: string, level: TrustLevel) => void;
}

export interface TrustLevelSelectorProps {
  relationshipId: string;
  selectedLevel?: TrustLevel;
  onSelect: (id: string, level: TrustLevel) => void;
}

export interface VisualCanvasProps {
  relationships: Relationship[];
  trustLevels: Record<string, TrustLevel>;
}

export interface TrustDefinitionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}
