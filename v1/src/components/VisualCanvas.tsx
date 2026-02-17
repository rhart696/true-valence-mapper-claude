'use client';

import type { VisualCanvasProps } from '../types';
import { TRUST_DEFINITIONS, TRUST_LEVEL_ORDER, TRUST_COLORS } from '../constants';

export function VisualCanvas({ relationships, trustLevels }: VisualCanvasProps) {
  // Group relationships by trust level
  const groups = TRUST_LEVEL_ORDER.map((level) => ({
    level,
    definition: TRUST_DEFINITIONS.find((d) => d.level === level)!,
    relationships: relationships.filter((r) => trustLevels[r.id] === level),
  }));

  return (
    <div id="trust-canvas" className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-dark">Trust Map</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div
            key={group.level}
            className="rounded-xl border-2 p-4"
            style={{ borderColor: TRUST_COLORS[group.level] }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3
                className="text-sm font-semibold"
                style={{ color: TRUST_COLORS[group.level] }}
              >
                {group.definition.label}
              </h3>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                style={{ backgroundColor: TRUST_COLORS[group.level] }}
              >
                {group.relationships.length}
              </span>
            </div>
            {group.relationships.length === 0 ? (
              <p className="text-xs text-gray-medium italic">No relationships</p>
            ) : (
              <ul className="space-y-1">
                {group.relationships
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((rel) => (
                    <li
                      key={rel.id}
                      className="rounded-md bg-gray-light px-2 py-1 text-sm text-gray-dark"
                    >
                      {rel.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
