'use client';

import { useState } from 'react';
import { useSession } from '../context/SessionContext';
import { ARROW_SCORE_COLORS, ARROW_SCORE_LABELS, cycleArrowScore } from '../constants';
import { RelationshipForm } from './RelationshipForm';
import { TrustDefinitionsModal } from './TrustDefinitionsModal';
import { ShareModal } from './ShareModal';
import { saveSession } from '../lib/shareSession';
import type { ArrowDirection, ArrowScore } from '../types';

interface FloatingPanelProps {
  onExport: () => void;
  onExportPNG?: () => void;
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

// Insights panel — coaching metrics shown when 2+ relationships exist
function InsightsPanel({ relationships }: { relationships: ReturnType<typeof useSession>['relationships'] }) {
  const total = relationships.length;
  const strong = relationships.filter(
    (r) => r.outbound === 'high' && r.inbound === 'high'
  ).length;
  const asymmetric = relationships.filter(
    (r) =>
      r.outbound !== 'unscored' &&
      r.inbound !== 'unscored' &&
      r.outbound !== r.inbound
  ).length;
  const needsAttention = relationships.filter(
    (r) => r.outbound === 'low' || r.inbound === 'low'
  ).length;

  const metrics = [
    { label: 'Mapped', value: total, color: '#003087' },
    { label: 'Strong', value: strong, color: '#7DC242', title: 'Both directions high confidence' },
    { label: 'Asymmetric', value: asymmetric, color: '#00AEEF', title: 'Outbound ≠ inbound, both scored' },
    { label: 'Low', value: needsAttention, color: '#FFD100', title: 'At least one direction is low' },
  ];

  return (
    <div
      style={{
        borderTop: '1px solid #EBECF0',
        padding: '10px 12px 8px',
        flexShrink: 0,
      }}
    >
      <p
        style={{
          fontSize: '10px',
          fontWeight: 600,
          color: '#6B778C',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          margin: '0 0 8px',
        }}
      >
        Insights
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px',
        }}
      >
        {metrics.map((m) => (
          <div
            key={m.label}
            title={m.title}
            style={{
              backgroundColor: '#F4F5F7',
              borderRadius: '6px',
              padding: '6px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
            }}
          >
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: m.color,
                lineHeight: 1.1,
              }}
            >
              {m.value}
            </span>
            <span style={{ fontSize: '10px', color: '#6B778C' }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FloatingPanel({ onExport, onExportPNG }: FloatingPanelProps) {
  const {
    coacheeName,
    setCoacheeName,
    relationships,
    currentStep,
    addRelationship,
    removeRelationship,
    updateRelationship,
    setArrowScore,
    setRelationshipNote,
  } = useSession();

  async function handleSaveAndShare() {
    setIsSaving(true);
    setSaveError(null);
    try {
      const result = await saveSession({ coacheeName, relationships, currentStep });
      setShareResult(result);
    } catch {
      setSaveError('Could not save — check your connection and try again.');
    } finally {
      setIsSaving(false);
    }
  }

  const [showDefinitions, setShowDefinitions] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [shareResult, setShareResult] = useState<{ shareCode: string; shareUrl: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const existingNames = relationships.map((r) => r.name);

  // Scored arrows counter
  const totalArrows = relationships.length * 2;
  const scoredArrows =
    relationships.filter((r) => r.outbound !== 'unscored').length +
    relationships.filter((r) => r.inbound !== 'unscored').length;

  function handleCycleScore(id: string, direction: ArrowDirection) {
    const rel = relationships.find((r) => r.id === id);
    if (!rel) return;
    const current: ArrowScore = direction === 'outbound' ? rel.outbound : rel.inbound;
    setArrowScore(id, direction, cycleArrowScore(current));
  }

  function handleResetScore(id: string, direction: ArrowDirection) {
    setArrowScore(id, direction, 'unscored');
  }

  function startEdit(id: string, currentName: string) {
    setEditingId(id);
    setEditName(currentName);
    setExpandedNoteId(null); // close note if open
  }

  function commitEdit(id: string) {
    const trimmed = editName.trim();
    if (trimmed.length > 0 && trimmed !== relationships.find((r) => r.id === id)?.name) {
      updateRelationship(id, trimmed);
    }
    setEditingId(null);
    setEditName('');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName('');
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

            {/* Relationship count + scored arrows indicator */}
            {relationships.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
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
                <span
                  title={`${scoredArrows} of ${totalArrows} arrows scored`}
                  style={{
                    fontSize: '10px',
                    color: scoredArrows === totalArrows ? '#7DC242' : '#6B778C',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {scoredArrows}/{totalArrows} ↗↙
                </span>
              </div>
            )}
          </div>
          {/* Coachee name — optional, updates hub label */}
          <input
            type="text"
            value={coacheeName}
            onChange={(e) => setCoacheeName(e.target.value)}
            placeholder="Coachee's name (optional)"
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

        {/* Relationship list — relative wrapper for scroll-fade affordance */}
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <div className="panel-scroll" style={{ overflowY: 'auto', height: '100%' }}>
          {relationships.map((rel) => (
            <div
              key={rel.id}
              className="card-enter"
              style={{
                padding: '9px 12px',
                borderBottom: '1px solid #EBECF0',
              }}
            >
              {/* Top row: name/edit + pills + remove */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>

                {editingId === rel.id ? (
                  /* Inline edit mode */
                  <>
                    <input
                      autoFocus
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitEdit(rel.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      maxLength={50}
                      style={{
                        flex: 1,
                        fontSize: '12px',
                        color: '#091E42',
                        border: '1px solid #003087',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        outline: 'none',
                        minWidth: 0,
                      }}
                    />
                    {/* Save */}
                    <button
                      onClick={() => commitEdit(rel.id)}
                      title="Save name"
                      aria-label="Save name"
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: '#7DC242',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '12px',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        padding: 0,
                      }}
                    >
                      ✓
                    </button>
                    {/* Cancel */}
                    <button
                      onClick={cancelEdit}
                      title="Cancel"
                      aria-label="Cancel edit"
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: '#DFE1E6',
                        color: '#6B778C',
                        cursor: 'pointer',
                        fontSize: '14px',
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
                  </>
                ) : (
                  /* Display mode */
                  <>
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

                    {/* Edit name */}
                    <button
                      onClick={() => startEdit(rel.id, rel.name)}
                      title={`Rename ${rel.name}`}
                      aria-label={`Rename ${rel.name}`}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#97A0AF',
                        cursor: 'pointer',
                        fontSize: '12px',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        padding: 0,
                      }}
                    >
                      ✎
                    </button>

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
                  </>
                )}
              </div>

              {/* Note area — only in display mode */}
              {editingId !== rel.id && (
                <>
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
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
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
                </>
              )}
            </div>
          ))}
          </div>
          {/* Fade gradient — visible when list overflows, invisible over empty space */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, white)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Insights panel — shown when 2+ relationships exist */}
        {relationships.length >= 2 && (
          <InsightsPanel relationships={relationships} />
        )}

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
          <div style={{ display: 'flex', gap: '8px' }}>
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
                flex: 1,
              }}
            >
              Export PDF
            </button>
            {onExportPNG && (
              <button
                onClick={onExportPNG}
                title="Save map as PNG image"
                aria-label="Save as PNG"
                style={{
                  backgroundColor: 'white',
                  color: '#003087',
                  border: '2px solid #003087',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                PNG
              </button>
            )}
          </div>
          {relationships.length > 0 && (
            <button
              onClick={handleSaveAndShare}
              disabled={isSaving}
              title="Save this session to the cloud and get a shareable link"
              style={{
                backgroundColor: isSaving ? '#DFE1E6' : 'white',
                color: isSaving ? '#6B778C' : '#003087',
                border: '2px solid',
                borderColor: isSaving ? '#DFE1E6' : '#003087',
                borderRadius: '8px',
                padding: '9px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: isSaving ? 'not-allowed' : 'pointer',
                width: '100%',
                textAlign: 'center',
                transition: 'all 0.15s',
              }}
            >
              {isSaving ? 'Saving…' : '↗ Save & Share'}
            </button>
          )}
          {saveError && (
            <p style={{ fontSize: '11px', color: '#FF5630', margin: 0, textAlign: 'center' }}>
              {saveError}
            </p>
          )}
        </div>
      </div>

      <TrustDefinitionsModal
        isOpen={showDefinitions}
        onClose={() => setShowDefinitions(false)}
      />

      {shareResult && (
        <ShareModal
          shareCode={shareResult.shareCode}
          shareUrl={shareResult.shareUrl}
          onClose={() => setShareResult(null)}
        />
      )}
    </>
  );
}
