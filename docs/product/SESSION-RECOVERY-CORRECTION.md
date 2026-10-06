# Session recovery correction contract

2026-10-06; WP-0002; REQ-0006/7/10; DEC-0009.

Resume and shared replacement choices use a modal decision: background interaction is inert. Escape resumes the saved map (nondestructive); Escape dismisses an incoming map. Ordinary context mutators cannot operate until storage initialization and resolution of a readable saved map. Explicit restore/clear/replacement are distinct actions. Shared payloads reuse the bounded legacy/schema-1 parser and force only the validated result to map. Shared replacement writes before changing visible state; a storage failure retains the original map and decision.

PDF/PNG exporters return success/failure. Completion occurs only after PDF generation/save request succeeds; this cannot prove the browser saved a file on disk. Failure preserves the map and offers recovery guidance. Facilitator must verify the file. Long-note pagination, Unicode fidelity and broader accessibility remain separate open acceptance items. No dependency or sharing authorization change.
