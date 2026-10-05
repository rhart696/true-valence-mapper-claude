'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ArrowDirection, ArrowScore, SessionState, Step } from '../types';
import { readStoredSession, writeStoredSession } from '../lib/sessionStorage';

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
  storageError: string | null;
  restoreSession: () => void;
}

const initialState: SessionState = {
  coacheeName: '',
  relationships: [],
  currentStep: 'landing',
};

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
  // Keep the server and initial client render identical. Never write the empty
  // initial state over a saved map while the user is deciding whether to resume.
  const [savedSession, setSavedSession] = useState<SessionState | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [state, setState] = useState<SessionState>(initialState);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const result = readStoredSession(window.localStorage);
        setSavedSession(result.session && (result.session.coacheeName || result.session.relationships.length) ? result.session : null);
        setStorageError(result.error);
      } catch {
        setStorageError('Saved maps are unavailable in this browser. Keep an export before closing this page.');
      }
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!canSave) return;
    queueMicrotask(() => {
      try { setStorageError(writeStoredSession(window.localStorage, state)); }
      catch { setStorageError('Changes could not be saved on this device. Keep an export before closing this page.'); }
    });
  }, [state, canSave]);

  const setCoacheeName = useCallback((name: string) => {
    setCanSave(true);
    setState((prev) => ({ ...prev, coacheeName: name }));
  }, []);

  const addRelationship = useCallback((name: string) => {
    const id = generateId();
    setCanSave(true);
    setState((prev) => ({
      ...prev,
      relationships: [
        ...prev.relationships,
        { id, name: name.trim(), outbound: 'unscored', inbound: 'unscored' },
      ],
    }));
  }, []);

  const removeRelationship = useCallback((id: string) => {
    setCanSave(true);
    setState((prev) => ({
      ...prev,
      relationships: prev.relationships.filter((r) => r.id !== id),
    }));
  }, []);

  const updateRelationship = useCallback((id: string, name: string) => {
    setCanSave(true);
    setState((prev) => ({
      ...prev,
      relationships: prev.relationships.map((r) =>
        r.id === id ? { ...r, name: name.trim() } : r
      ),
    }));
  }, []);

  const setArrowScore = useCallback((id: string, direction: ArrowDirection, score: ArrowScore) => {
    setCanSave(true);
    setState((prev) => ({
      ...prev,
      relationships: prev.relationships.map((r) =>
        r.id === id ? { ...r, [direction]: score } : r
      ),
    }));
  }, []);

  const setRelationshipNote = useCallback((id: string, note: string) => {
    setCanSave(true);
    setState((prev) => ({
      ...prev,
      relationships: prev.relationships.map((r) =>
        r.id === id ? { ...r, note } : r
      ),
    }));
  }, []);

  const setCurrentStep = useCallback((step: Step) => {
    setCanSave(true);
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const clearSession = useCallback(() => {
    nextId = 1;
    setSavedSession(null);
    setCanSave(true);
    setState({ ...initialState, relationships: [] });
  }, []);

  const restoreSession = useCallback(() => {
    if (!savedSession) return;
    nextId = maxIdFrom(savedSession.relationships) + 1;
    setCanSave(true);
    setState({ ...savedSession, currentStep: savedSession.currentStep === 'complete' ? 'map' : savedSession.currentStep });
    setSavedSession(null);
  }, [savedSession]);

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
      setCanSave(true);
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
      storageError,
      restoreSession,
    }),
    [state, setCoacheeName, addRelationship, removeRelationship, updateRelationship, setArrowScore, setRelationshipNote, setCurrentStep, clearSession, loadDemo, savedSession, storageError, restoreSession]
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
