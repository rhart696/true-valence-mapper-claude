'use client';

import { useEffect, useRef } from 'react';
import { XCircle } from '@phosphor-icons/react';
import type { TrustDefinitionsModalProps } from '../types';
import { TRUST_DEFINITIONS, TRUST_COLORS } from '../constants';

export function TrustDefinitionsModal({ isOpen, onClose }: TrustDefinitionsModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Trust Level Definitions"
    >
      <div className="mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between border-b border-border-subtle pb-4">
          <h2 className="text-2xl font-semibold text-gray-dark">
            Trust Level Definitions
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="rounded-lg p-1 text-gray-medium hover:bg-gray-light hover:text-gray-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Close definitions"
          >
            <XCircle size={28} />
          </button>
        </div>

        <div className="space-y-4">
          {TRUST_DEFINITIONS.map((def) => (
            <div
              key={def.level}
              className="rounded-lg border-l-4 p-4"
              style={{ borderLeftColor: TRUST_COLORS[def.level] }}
            >
              <h3
                className="mb-1 font-semibold"
                style={{ color: TRUST_COLORS[def.level] }}
              >
                {def.label}
              </h3>
              <p className="text-sm leading-relaxed text-gray-medium">
                {def.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
