'use client';

import type { LandingScreenProps } from '../types';

export function LandingScreen({ onStartSession, onOpenDefinitions }: LandingScreenProps) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* ProActive full logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/ProActive-ReSolutions-full-logo.png"
        alt="ProActive ReSolutions"
        style={{ height: '64px', width: 'auto', marginBottom: '32px' }}
      />

      <h1 className="mb-4 text-4xl font-bold text-gray-dark">
        True Valence Relationship Mapper
      </h1>

      <p className="mb-2 max-w-md text-lg text-gray-medium">
        A relationship trust-mapping tool for<br />ProActive coaching sessions.
      </p>
      <p className="mb-2 max-w-md text-lg text-gray-medium">
        Who would you go to? Who would come to you?
      </p>
      <p className="mb-2 max-w-md text-lg text-gray-medium">
        <span style={{ color: '#003087', fontWeight: 600, whiteSpace: 'nowrap' }}>Work with what you find.</span>
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
        What do confidence levels mean?
      </button>
    </div>
  );
}
