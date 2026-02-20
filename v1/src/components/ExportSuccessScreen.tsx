'use client';

import { CheckCircle } from '@phosphor-icons/react';
import type { ExportSuccessScreenProps } from '../types';

export function ExportSuccessScreen({ onNewSession, onBackToMap, coacheeName }: ExportSuccessScreenProps) {
  const name = coacheeName?.trim();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <CheckCircle size={64} className="mb-4 text-success" weight="fill" />
      <h1 className="mb-2 text-2xl font-bold text-gray-dark">
        PDF Downloaded
      </h1>
      <p className="mb-2 max-w-md text-gray-medium">
        {name ? `${name}'s` : "Your coachee\u2019s"} trust map has been exported. They can use this artifact to
        reflect on their relationship landscape between sessions.
      </p>
      <p className="mb-8 max-w-md text-sm text-gray-medium">
        Need the map as an image for a slide deck? Use the <strong>PNG</strong> button back on the map.
      </p>
      <button
        onClick={onNewSession}
        className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Start New Session
      </button>
      <button
        onClick={onBackToMap}
        className="mt-4 text-sm text-primary underline hover:text-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Back to map
      </button>
    </div>
  );
}
