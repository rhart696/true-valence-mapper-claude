'use client';

import type { LandingScreenProps } from '../types';

export function LandingScreen({ onStartSession, onOpenDefinitions, onLoadDemo }: LandingScreenProps) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* ProActive full logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/ProActive-ReSolutions-full-logo.png"
        alt="ProActive ReSolutions"
        style={{ height: '80px', width: 'auto', marginBottom: '32px' }}
      />

      <h1 className="mb-4 text-4xl font-bold text-gray-dark">
        True Valence Relationship Mapper
      </h1>

      <p className="mb-2 max-w-md text-lg text-gray-medium">
        A relationship trust-mapping tool for<br />ProActive coaching sessions.
      </p>
      <p className="mb-2 max-w-md text-lg text-gray-medium">
        Who would I go to? Who would come to me?
      </p>
      <p className="mb-2 max-w-md text-lg text-gray-medium">
        <span style={{ color: '#003087', fontWeight: 600, whiteSpace: 'nowrap' }}>Work with what you find.</span>
      </p>
      <p className="mb-4 max-w-sm text-sm text-gray-medium">
        Add the key people in your work life and rate your confidence in each relationship — in both directions.
      </p>
      <p className="mb-8 max-w-md text-sm text-gray-medium">
        No sign-up required. No data stored.
      </p>

      <button
        onClick={onStartSession}
        className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white transition-all duration-150 hover:bg-primary-hover hover:shadow-md hover:scale-[1.02] active:scale-[0.99] active:bg-primary-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Start Session
      </button>

      <button
        onClick={onLoadDemo}
        className="mt-3 rounded-lg border-2 border-primary px-8 py-2.5 text-sm font-semibold text-primary transition-all duration-150 hover:bg-blue-50 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Load example map
      </button>

      <button
        onClick={onOpenDefinitions}
        className="mt-4 text-sm text-primary underline underline-offset-2 transition-all duration-150 hover:text-primary-active hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        What do confidence levels mean?
      </button>
    </div>
  );
}
