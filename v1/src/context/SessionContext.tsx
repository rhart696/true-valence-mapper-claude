'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { SessionState, Step, TrustLevel } from '../types';

interface SessionContextValue extends SessionState {
  addRelationship: (name: string) => void;
  removeRelationship: (id: string) => void;
  updateRelationship: (id: string, name: string) => void;
  setTrustLevel: (id: string, level: TrustLevel) => void;
  setCurrentStep: (step: Step) => void;
  clearSession: () => void;
}

const initialState: SessionState = {
  relationships: [],
  trustLevels: {},
  currentStep: 'landing',
};

const SessionContext = createContext<SessionContextValue | null>(null);

let nextId = 1;
function generateId(): string {
  return `rel-${nextId++}-${Date.now()}`;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SessionState>(initialState);

  const addRelationship = useCallback((name: string) => {
    const id = generateId();
    setState((prev) => ({
      ...prev,
      relationships: [...prev.relationships, { id, name: name.trim() }],
    }));
  }, []);

  const removeRelationship = useCallback((id: string) => {
    setState((prev) => {
      const remainingTrust = Object.fromEntries(
        Object.entries(prev.trustLevels).filter(([k]) => k !== id)
      ) as typeof prev.trustLevels;
      return {
        ...prev,
        relationships: prev.relationships.filter((r) => r.id !== id),
        trustLevels: remainingTrust,
      };
    });
  }, []);

  const updateRelationship = useCallback((id: string, name: string) => {
    setState((prev) => ({
      ...prev,
      relationships: prev.relationships.map((r) =>
        r.id === id ? { ...r, name: name.trim() } : r
      ),
    }));
  }, []);

  const setTrustLevel = useCallback((id: string, level: TrustLevel) => {
    setState((prev) => ({
      ...prev,
      trustLevels: { ...prev.trustLevels, [id]: level },
    }));
  }, []);

  const setCurrentStep = useCallback((step: Step) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const clearSession = useCallback(() => {
    nextId = 1;
    setState(initialState);
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      ...state,
      addRelationship,
      removeRelationship,
      updateRelationship,
      setTrustLevel,
      setCurrentStep,
      clearSession,
    }),
    [state, addRelationship, removeRelationship, updateRelationship, setTrustLevel, setCurrentStep, clearSession]
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
