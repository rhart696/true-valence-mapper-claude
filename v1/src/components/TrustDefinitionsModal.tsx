'use client';

import { useEffect, useRef } from 'react';
import { XCircle } from '@phosphor-icons/react';
import type { TrustDefinitionsModalProps } from '../types';
import { ARROW_SCORE_DEFINITIONS, ARROW_SCORE_COLORS } from '../constants';

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function TrustDefinitionsModal({ isOpen, onClose }: TrustDefinitionsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

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
      aria-labelledby="definitions-title"
    >
      <div
        ref={modalRef}
        className="screen-enter mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between border-b border-border-subtle pb-4">
          <h2 id="definitions-title" className="text-2xl font-semibold text-gray-dark">
            Confidence Score Definitions
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

        {/* Arrow directions explained */}
        <div className="mb-5 rounded-lg bg-gray-light p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-dark">Two directions, two questions</h3>
          <div className="space-y-2 text-sm text-gray-medium">
            <p>
              <span className="font-semibold text-gray-dark">↗ Outbound</span>{' '}
              — &ldquo;How confident am I that <em>I will go to them</em>?&rdquo;
            </p>
            <p>
              <span className="font-semibold text-gray-dark">↙ Inbound</span>{' '}
              — &ldquo;How confident am I that <em>they will come to me</em>?&rdquo;
            </p>
          </div>
          <p className="mt-2 text-xs text-gray-medium">
            Click an arrow or badge on the map, or the ↗/↙ buttons in the panel, to cycle through scores.
          </p>
        </div>

        {/* Score levels */}
        <div className="space-y-4">
          {ARROW_SCORE_DEFINITIONS.filter((d) => d.score !== 'unscored').map((def) => (
            <div
              key={def.score}
              className="rounded-lg border-l-4 p-4"
              style={{ borderLeftColor: ARROW_SCORE_COLORS[def.score] }}
            >
              <h3
                className="mb-1 font-semibold"
                style={{ color: ARROW_SCORE_COLORS[def.score] }}
              >
                {def.badge} — {def.label}
              </h3>
              <p className="text-sm leading-relaxed text-gray-medium">{def.description}</p>
            </div>
          ))}
          {/* Unscored */}
          <div className="rounded-lg border-l-4 p-4" style={{ borderLeftColor: '#C1C7D0' }}>
            <h3 className="mb-1 font-semibold text-gray-medium">? — Not Yet Scored</h3>
            <p className="text-sm leading-relaxed text-gray-medium">
              The default state. Grey dashed arrows indicate this direction has not been rated yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
