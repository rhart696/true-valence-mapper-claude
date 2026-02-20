'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ArrowDirection, ArrowScore, SessionState, Step } from '../types';
import { SESSION_STORAGE_KEY } from '../types';

interface SessionContextValue extends SessionState {
  setCoacheeName: (name: string) => void;
  addRelationship: (name: string) => void;
  removeRelationship: (id: string) => void;
  updateRelationship: (id: string, name: string) => void;
  setArrowScore: (id: string, direction: ArrowDirection, score: ArrowScore) => void;
  setRelationshipNote: (id: string, note: string) => void;
  setCurrentStep: (step: Step) => void;
  clearSession: () => void;
  loadDemo: (items: Array<{ name: string; outbound: ArrowScore; inbound: ArrowScore; note?: string }>) => void;
  // Persistence
  savedSession: SessionState | null;
  restoreSession: () => void;
}

const initialState: SessionState = {
  coacheeName: '',
  relationships: [],
  currentStep: 'landing',
};

// --- localStorage helpers ---

function readFromStorage(): SessionState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionState;
    if (
      typeof parsed.coacheeName !== 'string' ||
      !Array.isArray(parsed.relationships) ||
      typeof parsed.currentStep !== 'string'
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeToStorage(state: SessionState): void {
  if (typeof window === 'undefined') return;
  const hasData = state.coacheeName !== '' || state.relationships.length > 0;
  if (!hasData) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded — silently ignore
  }
}

// Parse the numeric counter out of a rel-N-timestamp id so we avoid collisions after restore
function maxIdFrom(relationships: SessionState['relationships']): number {
  if (relationships.length === 0) return 0;
  return relationships.reduce((max, r) => {
    const n = parseInt(r.id.split('-')[1] ?? '0', 10);
    return Number.isNaN(n) ? max : Math.max(max, n);
  }, 0);
}

// ---

const SessionContext = createContext<SessionContextValue | null>(null);

let nextId = 1;
function generateId(): string {
  return `rel-${nextId++}-${Date.now()}`;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  // Detect saved session once at mount (before first render via lazy init)
  const [savedSession] = useState<SessionState | null>(() => {
    const saved = readFromStorage();
    if (!saved) return null;
    if (saved.coacheeName === '' && saved.relationships.length === 0) return null;
    return saved;
  });

  const [state, setState] = useState<SessionState>(initialState);

  // Auto-save to localStorage on every state change
  useEffect(() => {
    writeToStorage(state);
  }, [state]);

  const setCoacheeName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, coacheeName: name }));
  }, []);

  const addRelationship = useCallback((name: string) => {
    const id = generateId();
    setState((prev) => ({
      ...prev,
      relationships: [
        ...prev.relationships,
        { id, name: name.trim(), outbound: 'unscored', inbound: 'unscored' },
      ],
    }));
  }, []);

  const removeRelationship = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      relationships: prev.relationships.filter((r) => r.id !== id),
    }));
  }, []);

  const updateRelationship = useCallback((id: string, name: string) => {
    setState((prev) => ({
      ...prev,
      relationships: prev.relationships.map((r) =>
        r.id === id ? { ...r, name: name.trim() } : r
      ),
    }));
  }, []);

  const setArrowScore = useCallback((id: string, direction: ArrowDirection, score: ArrowScore) => {
    setState((prev) => ({
      ...prev,
      relationships: prev.relationships.map((r) =>
        r.id === id ? { ...r, [direction]: score } : r
      ),
    }));
  }, []);

  const setRelationshipNote = useCallback((id: string, note: string) => {
    setState((prev) => ({
      ...prev,
      relationships: prev.relationships.map((r) =>
        r.id === id ? { ...r, note } : r
      ),
    }));
  }, []);

  const setCurrentStep = useCallback((step: Step) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const clearSession = useCallback(() => {
    nextId = 1;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
    setState(initialState);
  }, []);

  const restoreSession = useCallback(() => {
    const saved = readFromStorage();
    if (!saved) return;
    nextId = maxIdFrom(saved.relationships) + 1;
    // Always return to map when resuming — 'complete' is a dead-end step
    setState({ ...saved, currentStep: saved.currentStep === 'complete' ? 'map' : saved.currentStep });
  }, []);

  const loadDemo = useCallback(
    (items: Array<{ name: string; outbound: ArrowScore; inbound: ArrowScore; note?: string }>) => {
      nextId = 1;
      const relationships = items.map((item) => ({
        id: generateId(),
        name: item.name.trim(),
        outbound: item.outbound,
        inbound: item.inbound,
        note: item.note,
      }));
      setState({ coacheeName: '', relationships, currentStep: 'map' });
    },
    []
  );

  const value = useMemo<SessionContextValue>(
    () => ({
      ...state,
      setCoacheeName,
      addRelationship,
      removeRelationship,
      updateRelationship,
      setArrowScore,
      setRelationshipNote,
      setCurrentStep,
      clearSession,
      loadDemo,
      savedSession,
      restoreSession,
    }),
    [state, setCoacheeName, addRelationship, removeRelationship, updateRelationship, setArrowScore, setRelationshipNote, setCurrentStep, clearSession, loadDemo, savedSession, restoreSession]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
