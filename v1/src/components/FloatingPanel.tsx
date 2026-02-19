'use client';

import { useState } from 'react';
import { useSession } from '../context/SessionContext';
import { ARROW_SCORE_COLORS, ARROW_SCORE_LABELS, cycleArrowScore } from '../constants';
import { RelationshipForm } from './RelationshipForm';
import { TrustDefinitionsModal } from './TrustDefinitionsModal';
import type { ArrowDirection, ArrowScore } from '../types';

interface FloatingPanelProps {
  onExport: () => void;
}

function ScorePill({ score, direction, onClick, onReset }: {
  score: ArrowScore;
  direction: ArrowDirection;
  onClick: () => void;
  onReset: () => void;
}) {
  const color = ARROW_SCORE_COLORS[score];
  const badge = ARROW_SCORE_LABELS[score];
  const isUnscored = score === 'unscored';
  const dirArrow = direction === 'outbound' ? '↗' : '↙';
  const dirLabel = direction === 'outbound' ? 'Outbound (I will go to them)' : 'Inbound (They will come to me)';
  const title = isUnscored
    ? `${dirLabel}: not yet scored — click to set`
    : `${dirLabel}: ${score} — click to change, right-click to reset`;

  return (
    <button
      onClick={onClick}
      onContextMenu={(e) => { e.preventDefault(); if (!isUnscored) onReset(); }}
      title={title}
      aria-label={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        padding: '2px 7px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: 700,
        cursor: 'pointer',
        flexShrink: 0,
        backgroundColor: isUnscored ? 'transparent' : color,
        color: isUnscored ? '#6B778C' : '#003087',
        border: isUnscored ? '1.5px solid #C1C7D0' : 'none',
        lineHeight: 1.4,
        minWidth: '40px',
        justifyContent: 'center',
      }}
    >
      <span>{dirArrow}</span>
      <span>{badge}</span>
    </button>
  );
}

export function FloatingPanel({ onExport }: FloatingPanelProps) {
  const { coacheeName, setCoacheeName, relationships, addRelationship, removeRelationship, setArrowScore, setRelationshipNote } = useSession();
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  const existingNames = relationships.map((r) => r.name);

  function handleCycleScore(id: string, direction: ArrowDirection) {
    const rel = relationships.find((r) => r.id === id);
    if (!rel) return;
    const current: ArrowScore = direction === 'outbound' ? rel.outbound : rel.inbound;
    setArrowScore(id, direction, cycleArrowScore(current));
  }

  function handleResetScore(id: string, direction: ArrowDirection) {
    setArrowScore(id, direction, 'unscored');
  }

  return (
    <>
      <div
        className="floating-panel"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '280px',
          maxHeight: 'calc(100vh - 40px)',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(9,30,66,0.18)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 16px 12px',
            borderBottom: '1px solid #EBECF0',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            {/* Trillium mark + tool name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/ProActive-ReSolutions-Trillium-logo.png"
                alt="ProActive ReSolutions"
                style={{ height: '28px', width: 'auto' }}
              />
              <h2
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#003087',
                  margin: 0,
                  letterSpacing: '0.01em',
                  lineHeight: 1.2,
                }}
              >
                True Valence<br />Relationship Mapper
              </h2>
            </div>
            {relationships.length > 0 && (
              <span
                style={{
                  backgroundColor: '#003087',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                {relationships.length}
              </span>
            )}
          </div>
          {/* Coachee name — optional, updates hub label */}
          <input
            type="text"
            value={coacheeName}
            onChange={(e) => setCoacheeName(e.target.value)}
            placeholder="Your name (optional)"
            maxLength={24}
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              fontSize: '11px',
              color: '#091E42',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #DFE1E6',
              padding: '3px 0 4px',
              marginBottom: '10px',
              outline: 'none',
            }}
          />

          <RelationshipForm
            onAdd={addRelationship}
            existingNames={existingNames}
            relationshipCount={relationships.length}
          />
        </div>

        {/* Relationship list */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {relationships.map((rel) => (
            <div
              key={rel.id}
              className="card-enter"
              style={{
                padding: '9px 12px',
                borderBottom: '1px solid #EBECF0',
              }}
            >
              {/* Top row: name + pills + remove */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {/* Name — click toggles note */}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedNoteId(expandedNoteId === rel.id ? null : rel.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedNoteId(expandedNoteId === rel.id ? null : rel.id);
                    }
                  }}
                  style={{
                    flex: 1,
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#091E42',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    cursor: 'pointer',
                  }}
                >
                  {rel.name}
                </span>

                {/* Outbound score pill */}
                <ScorePill
                  score={rel.outbound}
                  direction="outbound"
                  onClick={() => handleCycleScore(rel.id, 'outbound')}
                  onReset={() => handleResetScore(rel.id, 'outbound')}
                />

                {/* Inbound score pill */}
                <ScorePill
                  score={rel.inbound}
                  direction="inbound"
                  onClick={() => handleCycleScore(rel.id, 'inbound')}
                  onReset={() => handleResetScore(rel.id, 'inbound')}
                />

                {/* Remove */}
                <button
                  onClick={() => removeRelationship(rel.id)}
                  title={`Remove ${rel.name}`}
                  aria-label={`Remove ${rel.name}`}
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#6B778C',
                    cursor: 'pointer',
                    fontSize: '18px',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    padding: 0,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Note area */}
              {expandedNoteId === rel.id ? (
                <textarea
                  autoFocus
                  rows={2}
                  placeholder="Add a note…"
                  value={rel.note ?? ''}
                  onChange={(e) => setRelationshipNote(rel.id, e.target.value)}
                  onBlur={() => setExpandedNoteId(null)}
                  style={{
                    marginTop: '6px',
                    width: '100%',
                    boxSizing: 'border-box',
                    fontSize: '12px',
                    color: '#091E42',
                    border: '1px solid #C1C7D0',
                    borderRadius: '4px',
                    padding: '4px 6px',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              ) : rel.note?.trim() ? (
                /* Note preview */
                <p
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedNoteId(rel.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedNoteId(rel.id);
                    }
                  }}
                  style={{
                    margin: '4px 0 0',
                    fontSize: '11px',
                    fontStyle: 'italic',
                    color: '#6B778C',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  {rel.note}
                </p>
              ) : (
                /* Note affordance */
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedNoteId(rel.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedNoteId(rel.id);
                    }
                  }}
                  style={{
                    display: 'block',
                    marginTop: '3px',
                    fontSize: '11px',
                    color: '#97A0AF',
                    cursor: 'pointer',
                  }}
                >
                  + note
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            borderTop: relationships.length > 0 ? '1px solid #EBECF0' : 'none',
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setShowDefinitions(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#003087',
              fontSize: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            What do confidence levels mean?
          </button>
          <button
            onClick={onExport}
            style={{
              backgroundColor: '#003087',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Export PDF
          </button>
        </div>
      </div>

      <TrustDefinitionsModal
        isOpen={showDefinitions}
        onClose={() => setShowDefinitions(false)}
      />
    </>
  );
}
