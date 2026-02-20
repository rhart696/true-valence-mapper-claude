'use client';

import { useState, useEffect } from 'react';
import { ARROW_SCORE_COLORS } from '../constants';

export const WELCOME_STORAGE_KEY = 'tvm-onboarding-v1-complete';

interface Slide {
  title: string;
  body: React.ReactNode;
}

const SLIDES: Slide[] = [
  {
    title: 'Welcome to True Valence',
    body: (
      <div>
        <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#091E42', marginBottom: '16px' }}>
          True Valence maps your <strong>confidence in key workplace relationships</strong> — in both directions.
        </p>
        <div style={{ backgroundColor: '#F4F5F7', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
          <p style={{ fontSize: '14px', color: '#6B778C', margin: '0 0 10px', fontStyle: 'italic', textAlign: 'center' }}>
            The two questions behind every arrow:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '20px', minWidth: '28px', textAlign: 'center' }}>↗</span>
              <p style={{ margin: 0, fontSize: '14px', color: '#091E42', lineHeight: 1.5 }}>
                <strong>Outbound</strong> — &ldquo;How confident am I that <em>I would go to them</em> when I have a problem with them?&rdquo;
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '20px', minWidth: '28px', textAlign: 'center' }}>↙</span>
              <p style={{ margin: 0, fontSize: '14px', color: '#091E42', lineHeight: 1.5 }}>
                <strong>Inbound</strong> — &ldquo;How confident am I that <em>they would come to me</em> when they have a problem with me?&rdquo;
              </p>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: '#6B778C', margin: 0, textAlign: 'center' }}>
          Start with the people who matter most in your work life.
        </p>
      </div>
    ),
  },
  {
    title: 'How to score',
    body: (
      <div>
        <p style={{ fontSize: '14px', color: '#6B778C', marginBottom: '14px' }}>
          Each relationship has two arrows. Click any arrow badge — on the map or in the side panel — to cycle through scores.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {[
            { badge: 'H', label: 'High', color: ARROW_SCORE_COLORS.high, desc: 'Full confidence — no hesitation.' },
            { badge: 'M', label: 'Medium', color: ARROW_SCORE_COLORS.medium, desc: 'Some confidence, but hesitation exists.' },
            { badge: 'L', label: 'Low', color: ARROW_SCORE_COLORS.low, desc: 'Significant barrier or uncertainty.' },
            { badge: '?', label: 'Not yet scored', color: '#C1C7D0', desc: 'Default — leave as-is if unsure.' },
          ].map(({ badge, label, color, desc }) => (
            <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: badge === '?' ? 'white' : color,
                  border: badge === '?' ? '1.5px solid #C1C7D0' : 'none',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: badge === '?' ? '#6B778C' : '#003087',
                  flexShrink: 0,
                }}
              >
                {badge}
              </span>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#091E42' }}>{label}</span>
                <span style={{ fontSize: '13px', color: '#6B778C' }}> — {desc}</span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#97A0AF', margin: 0 }}>
          Tip: right-click a scored badge to reset it to unscored.
        </p>
      </div>
    ),
  },
  {
    title: 'What the map reveals',
    body: (
      <div>
        <p style={{ fontSize: '14px', color: '#6B778C', marginBottom: '14px' }}>
          Once scored, patterns emerge. The map doesn&apos;t judge — it shows what&apos;s there to work with.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {[
            {
              icon: '⟺',
              color: ARROW_SCORE_COLORS.high,
              label: 'Strong — H + H',
              desc: 'Both directions feel safe. These relationships carry real weight.',
            },
            {
              icon: '≠',
              color: ARROW_SCORE_COLORS.medium,
              label: 'Asymmetric — H + L (or vice versa)',
              desc: 'One side feels more exposed. What makes the directions different?',
            },
            {
              icon: '↓',
              color: ARROW_SCORE_COLORS.low,
              label: 'Low confidence — L in either direction',
              desc: 'A barrier may exist. What would need to change for this to shift?',
            },
          ].map(({ icon, color, label, desc }) => (
            <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: color + '22',
                  color: color,
                  fontSize: '16px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {icon}
              </span>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: 600, color: '#091E42' }}>{label}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B778C', lineHeight: 1.4 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#003087', fontWeight: 600, textAlign: 'center', margin: 0 }}>
          Work with what you find.
        </p>
      </div>
    ),
  },
];

interface WelcomeModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function WelcomeModal({ isOpen, onComplete }: WelcomeModalProps) {
  const [slide, setSlide] = useState(0);
  const isLast = slide === SLIDES.length - 1;

  // Reset to slide 0 whenever modal opens
  useEffect(() => {
    if (isOpen) setSlide(0);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => {
        if (e.target === e.currentTarget) onComplete();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome — True Valence Relationship Mapper"
    >
      <div
        className="screen-enter mx-4 w-full max-w-md rounded-2xl bg-white shadow-xl"
        style={{ overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 24px 0',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}
        >
          <div>
            <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#97A0AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {slide + 1} of {SLIDES.length}
            </p>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#003087', lineHeight: 1.2 }}>
              {SLIDES[slide].title}
            </h2>
          </div>
          <button
            onClick={onComplete}
            title="Skip introduction"
            aria-label="Skip introduction"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#97A0AF',
              fontSize: '22px',
              lineHeight: 1,
              padding: '4px',
              borderRadius: '6px',
              flexShrink: 0,
              marginTop: '-2px',
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 24px 20px' }}>
          {SLIDES[slide].body}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '0 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          {/* Dot navigation */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === slide ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: i === slide ? '#003087' : '#DFE1E6',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 150ms ease',
                }}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', width: '100%', gap: '8px' }}>
            {!isLast && (
              <button
                onClick={onComplete}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '13px',
                  color: '#6B778C',
                  background: 'none',
                  border: '1px solid #DFE1E6',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Skip
              </button>
            )}
            <button
              onClick={isLast ? onComplete : () => setSlide((s) => s + 1)}
              style={{
                flex: 2,
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                backgroundColor: '#003087',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {isLast ? 'Get started' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
