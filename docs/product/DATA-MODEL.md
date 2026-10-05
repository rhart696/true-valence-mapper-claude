# Pilot data model and migration specification

Currency: authoritative · Owner: Richard Hart / ProActive ReSolutions · Created/reviewed: 2026-10-05
Related: See START-HERE and registry.

Current SessionState: coacheeName, relationships[{id,name,outbound,inbound,note?}], currentStep. Current scores are high/medium/low/unscored. Current browser storage key: tvm_session_v1. Source inspection is not nested validation.

Proposed versioned model: schemaVersion; sessionId; createdAt/updatedAt; purpose/context; questionVersion; executive label; relationship IDs and labels; directional approach categories; optional per-direction confidence in judgment; optional observation, interpretation, alternatives, otherPerspective, desiredShift; selected experiment records {relationshipId,hypothesis,action,expectedResult,surprise,plannedDate,outcome}; provenance of each entry (executive/facilitator/computed). Facilitator notes must be separate from executive reports and explicitly included/excluded in exports/shares. No AI field now.

Decision still open: whether confidence in inference is needed in both directions and which plain-language categories users understand. Do not silently use approach-category values for epistemic confidence. A missing judgment is not low certainty.

Migration: parse and validate the full old schema (bounded strings, array count, unique IDs, score enums and step enum); retain note and original categories without inventing structured evidence; preserve known question wording; initialize new fields absent. Reject malformed payload safely and offer recovery/export when possible; do not erase storage until intentional clear or successful save. Use separate schema version from product version.

Snapshots later need stable engagement/relationship identity, question version, context, date and provenance; compare categories descriptively, not as interval measurements. Research datasets remain separate and restricted; no client records in git. Bounds, export rules and sharing payload schema must be specified before implementation.
