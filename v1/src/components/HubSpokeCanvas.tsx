'use client';

import { useState } from 'react';
import { useSession } from '../context/SessionContext';
import { ARROW_SCORE_COLORS, ARROW_SCORE_LABELS, ARROW_SCORE_DASH_PATTERNS, ARROW_SCORE_DEFINITIONS, cycleArrowScore } from '../constants';
import type { ArrowDirection, ArrowScore, Relationship } from '../types';

const HUB_R = 42;
const NODE_R = 28;
const OFFSET = 12; // perpendicular px offset per arrow

function getEllipseRadii(count: number): { rx: number; ry: number } {
  const ry = 200;
  const rx = Math.min(320, 200 + Math.max(0, count - 4) * 10);
  return { rx, ry };
}

/**
 * Word-aware node label: returns 1 or 2 lines that fit inside r=28.
 * - ≤ 8 chars → single line
 * - Has a space in first 9 chars → split at that space, truncate each part at 8 chars
 * - Otherwise → hard-truncate at 7 chars + ellipsis
 */
function nodeLabel(name: string): { lines: string[] } {
  const MAX = 8;
  if (name.length <= MAX) return { lines: [name] };
  const spaceIdx = name.indexOf(' ');
  if (spaceIdx > 0 && spaceIdx <= MAX) {
    const line1 = name.slice(0, spaceIdx);
    const rest = name.slice(spaceIdx + 1);
    const line2 = rest.length > MAX ? rest.slice(0, MAX - 1) + '\u2026' : rest;
    return { lines: [line1, line2] };
  }
  return { lines: [name.slice(0, MAX - 1) + '\u2026'] };
}

/**
 * Split a hub name into 1 or 2 display lines that fit inside r=42.
 * - ≤ 8 chars → single line
 * - Has a space in first 9 chars → split there
 * - Otherwise → hard-split at char 7
 */
function hubLabelLines(name: string): [string] | [string, string] {
  const t = name.trim() || 'Me';
  if (t.length <= 8) return [t];
  const spaceIdx = t.indexOf(' ');
  if (spaceIdx > 0 && spaceIdx <= 9) {
    const rest = t.slice(spaceIdx + 1);
    return [t.slice(0, spaceIdx), rest.length > 8 ? rest.slice(0, 7) + '\u2026' : rest];
  }
  const second = t.slice(7);
  return [t.slice(0, 7), second.length > 8 ? second.slice(0, 7) + '\u2026' : second];
}

// Bezier midpoint at t=0.5: B(0.5) = 0.25*P0 + 0.5*CP + 0.25*P2
function bezierMid(p0x: number, p0y: number, cpx: number, cpy: number, p2x: number, p2y: number) {
  return {
    x: 0.25 * p0x + 0.5 * cpx + 0.25 * p2x,
    y: 0.25 * p0y + 0.5 * cpy + 0.25 * p2y,
  };
}

interface ArrowGroupProps {
  rel: Relationship;
  direction: ArrowDirection;
  sx: number; sy: number;
  ex: number; ey: number;
  cpx: number; cpy: number;
  midX: number; midY: number;
  onCycle: (id: string, dir: ArrowDirection) => void;
}

function ArrowGroup({ rel, direction, sx, sy, ex, ey, cpx, cpy, midX, midY, onCycle }: ArrowGroupProps) {
  const score: ArrowScore = direction === 'outbound' ? rel.outbound : rel.inbound;
  const color = ARROW_SCORE_COLORS[score];
  const badge = ARROW_SCORE_LABELS[score];
  const isUnscored = score === 'unscored';
  const markerId = `arrowhead-${score}`;
  const dirLabel = direction === 'outbound' ? 'I will go to them' : 'They will come to me';
  const dashPattern = ARROW_SCORE_DASH_PATTERNS[score];
  const [isFocused, setIsFocused] = useState(false);

  function handleCycle() {
    onCycle(rel.id, direction);
  }

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${dirLabel} (${rel.name}): ${score}. Click to change.`}
      style={{ cursor: 'pointer' }}
      onClick={handleCycle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCycle();
        }
      }}
    >
      {/* Arrow path — colour + dash pattern per score for WCAG 1.4.1 */}
      <path
        d={`M ${sx},${sy} Q ${cpx},${cpy} ${ex},${ey}`}
        stroke={color}
        strokeWidth={isUnscored ? 1.8 : 2.5}
        strokeDasharray={dashPattern}
        fill="none"
        markerEnd={`url(#${markerId})`}
        strokeLinecap="round"
      />
      {/* Wide transparent hit zone */}
      <path
        d={`M ${sx},${sy} Q ${cpx},${cpy} ${ex},${ey}`}
        stroke="transparent"
        strokeWidth={24}
        fill="none"
      />
      {/* Midpoint badge */}
      <circle
        cx={midX}
        cy={midY}
        r={11}
        fill={isUnscored ? 'white' : color}
        stroke={isUnscored ? '#C1C7D0' : 'none'}
        strokeWidth={1.5}
      />
      <text
        x={midX}
        y={midY}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={9}
        fontWeight="bold"
        fill={isUnscored ? '#6B778C' : '#003087'}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {badge}
      </text>
      {/* Keyboard focus ring — visible when element is focused via keyboard */}
      {isFocused && (
        <circle
          cx={midX}
          cy={midY}
          r={17}
          fill="none"
          stroke="#003087"
          strokeWidth={2}
          strokeDasharray="4 3"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </g>
  );
}

// Persistent legend — always visible in bottom-right corner of SVG
function CanvasLegend() {
  const legendItems = ARROW_SCORE_DEFINITIONS.filter((d) => d.score !== 'unscored');
  const unscoredDef = ARROW_SCORE_DEFINITIONS.find((d) => d.score === 'unscored')!;
  const allItems = [...legendItems, unscoredDef];

  const LX = 200;  // left edge of legend box (SVG coords)
  const LY = 260;  // top edge
  const ROW_H = 18;
  const BOX_W = 160;
  const BOX_H = allItems.length * ROW_H + 20;

  return (
    <g aria-label="Score legend" style={{ pointerEvents: 'none' }}>
      {/* Background */}
      <rect
        x={LX}
        y={LY}
        width={BOX_W}
        height={BOX_H}
        rx={6}
        fill="white"
        fillOpacity={0.88}
        stroke="#DFE1E6"
        strokeWidth={1}
      />
      {allItems.map((def, i) => {
        const rowY = LY + 12 + i * ROW_H;
        const lineX1 = LX + 10;
        const lineX2 = LX + 40;
        const lineY = rowY + 4;
        return (
          <g key={def.score}>
            {/* Sample line showing dash pattern */}
            <line
              x1={lineX1}
              y1={lineY}
              x2={lineX2}
              y2={lineY}
              stroke={def.color}
              strokeWidth={2.5}
              strokeDasharray={ARROW_SCORE_DASH_PATTERNS[def.score]}
              strokeLinecap="round"
            />
            {/* Badge circle */}
            <circle
              cx={lineX2 + 8}
              cy={lineY}
              r={7}
              fill={def.score === 'unscored' ? 'white' : def.color}
              stroke={def.score === 'unscored' ? '#C1C7D0' : 'none'}
              strokeWidth={1.2}
            />
            <text
              x={lineX2 + 8}
              y={lineY}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={7}
              fontWeight="bold"
              fill={def.score === 'unscored' ? '#6B778C' : '#003087'}
            >
              {def.badge}
            </text>
            {/* Label */}
            <text
              x={lineX2 + 20}
              y={lineY}
              dominantBaseline="central"
              fontSize={9}
              fill="#6B778C"
            >
              {def.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

interface HubSpokeCanvasProps {
  id?: string;
}

export function HubSpokeCanvas({ id = 'hub-spoke-svg' }: HubSpokeCanvasProps) {
  const { coacheeName, relationships, setArrowScore } = useSession();
  const hubLines = hubLabelLines(coacheeName.trim() || 'Me');
  const hubFontSize = hubLines.length === 2 ? 10 : hubLines[0].length <= 3 ? 16 : hubLines[0].length <= 5 ? 13 : 11;
  const n = relationships.length;

  function handleCycle(relId: string, direction: ArrowDirection) {
    const rel = relationships.find((r) => r.id === relId);
    if (!rel) return;
    const current = direction === 'outbound' ? rel.outbound : rel.inbound;
    setArrowScore(relId, direction, cycleArrowScore(current));
  }

  return (
    <svg
      id={id}
      viewBox="-450 -350 900 700"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      aria-label="Hub and spoke relationship map"
      style={{ display: 'block' }}
    >
      <defs>
        {(['high', 'medium', 'low', 'unscored'] as ArrowScore[]).map((score) => (
          <marker
            key={score}
            id={`arrowhead-${score}`}
            markerWidth={8}
            markerHeight={6}
            refX={7}
            refY={3}
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={ARROW_SCORE_COLORS[score]} />
          </marker>
        ))}
      </defs>

      {/* Canvas background */}
      <rect x="-450" y="-350" width="900" height="700" fill="#F4F5F7" />

      {/* Hub circle — ProActive PMS 280 navy */}
      <circle cx={0} cy={0} r={HUB_R} fill="#003087" />
      {hubLines.length === 1 ? (
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={hubFontSize}
          fontWeight="bold"
          fill="white"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {hubLines[0]}
        </text>
      ) : (
        <text
          x={0}
          y={-7}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={hubFontSize}
          fontWeight="bold"
          fill="white"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          <tspan x={0}>{hubLines[0]}</tspan>
          <tspan x={0} dy="14">{hubLines[1]}</tspan>
        </text>
      )}

      {/* Empty state hint rendered as HTML overlay in MapScreen */}

      {/* Relationship spokes */}
      {relationships.map((rel, i) => {
        const { rx, ry } = getEllipseRadii(n);
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const nodeX = rx * Math.cos(angle);
        const nodeY = ry * Math.sin(angle);

        // Normalize spoke direction from actual position (not angle) — required for ellipse
        const len = Math.sqrt(nodeX * nodeX + nodeY * nodeY);
        const dx = nodeX / len;
        const dy = nodeY / len;
        const px = -dy; // perpendicular unit vector
        const py = dx;

        // Outbound: hub edge → node edge, offset +OFFSET on perpendicular
        const outSx = HUB_R * dx + OFFSET * px;
        const outSy = HUB_R * dy + OFFSET * py;
        const outEx = nodeX - NODE_R * dx + OFFSET * px;
        const outEy = nodeY - NODE_R * dy + OFFSET * py;
        const outCpx = (outSx + outEx) / 2 + 18 * px;
        const outCpy = (outSy + outEy) / 2 + 18 * py;
        const outMid = bezierMid(outSx, outSy, outCpx, outCpy, outEx, outEy);

        // Inbound: node edge → hub edge, offset -OFFSET on perpendicular
        const inSx = nodeX - NODE_R * dx - OFFSET * px;
        const inSy = nodeY - NODE_R * dy - OFFSET * py;
        const inEx = HUB_R * dx - OFFSET * px;
        const inEy = HUB_R * dy - OFFSET * py;
        const inCpx = (inSx + inEx) / 2 - 18 * px;
        const inCpy = (inSy + inEy) / 2 - 18 * py;
        const inMid = bezierMid(inSx, inSy, inCpx, inCpy, inEx, inEy);

        return (
          <g key={rel.id}>
            {/* Outbound arrow (hub → node) */}
            <ArrowGroup
              rel={rel}
              direction="outbound"
              sx={outSx} sy={outSy}
              ex={outEx} ey={outEy}
              cpx={outCpx} cpy={outCpy}
              midX={outMid.x} midY={outMid.y}
              onCycle={handleCycle}
            />

            {/* Inbound arrow (node → hub) */}
            <ArrowGroup
              rel={rel}
              direction="inbound"
              sx={inSx} sy={inSy}
              ex={inEx} ey={inEy}
              cpx={inCpx} cpy={inCpy}
              midX={inMid.x} midY={inMid.y}
              onCycle={handleCycle}
            />

            {/* Node circle — light navy tint, distinct from arrow colours */}
            <circle
              cx={nodeX}
              cy={nodeY}
              r={NODE_R}
              fill="#EBF0F8"
              stroke="#7A9BC6"
              strokeWidth={2}
            />
            {/* Note indicator — small dot when this relationship has a note */}
            {rel.note?.trim() && (
              <circle
                cx={nodeX + 20}
                cy={nodeY - 20}
                r={5}
                fill="#003087"
                stroke="white"
                strokeWidth={1.5}
                aria-label={`${rel.name} has a note`}
              />
            )}
            {(() => {
              const label = nodeLabel(rel.name);
              return label.lines.length === 1 ? (
                <text
                  x={nodeX}
                  y={nodeY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={11}
                  fontWeight="500"
                  fill="#091E42"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                >
                  {label.lines[0]}
                </text>
              ) : (
                <text
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight="500"
                  fill="#091E42"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                >
                  <tspan x={nodeX} y={nodeY - 7}>{label.lines[0]}</tspan>
                  <tspan x={nodeX} y={nodeY + 7}>{label.lines[1]}</tspan>
                </text>
              );
            })()}
          </g>
        );
      })}

      {/* Persistent legend — always visible, bottom-right */}
      <CanvasLegend />
    </svg>
  );
}
