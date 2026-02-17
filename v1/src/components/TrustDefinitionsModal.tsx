'use client';

import { useEffect, useRef } from 'react';
import { XCircle } from '@phosphor-icons/react';
import type { TrustDefinitionsModalProps } from '../types';
import { TRUST_DEFINITIONS, TRUST_COLORS } from '../constants';

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function TrustDefinitionsModal({ isOpen, onClose }: TrustDefinitionsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus close button when opened
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard: Escape to close + Tab focus trap
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
      ).filter((el) => !el.hasAttribute('disabled'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trust-definitions-title"
    >
      <div
        ref={modalRef}
        className="screen-enter mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between border-b border-border-subtle pb-4">
          <h2 id="trust-definitions-title" className="text-2xl font-semibold text-gray-dark">
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
