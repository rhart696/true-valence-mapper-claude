'use client';

import type { LandingScreenProps } from '../types';

export function LandingScreen({ onStartSession, onOpenDefinitions }: LandingScreenProps) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-dark">
        True Valence Mapper
      </h1>
      <p className="mb-2 max-w-md text-lg text-gray-medium">
        A visual trust mapping tool for coaching sessions. Help your coachee see
        their relationship landscape clearly.
      </p>
      <p className="mb-8 max-w-md text-sm text-gray-medium">
        No sign-up required. No data stored. Session-only.
      </p>
      <button
        onClick={onStartSession}
        className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Start Session
      </button>
      <button
        onClick={onOpenDefinitions}
        className="mt-4 text-sm text-primary underline hover:text-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        What do trust levels mean?
      </button>
    </div>
  );
}
