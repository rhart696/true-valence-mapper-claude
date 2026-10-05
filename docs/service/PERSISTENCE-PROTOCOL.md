# Saved-map handling protocol

Reviewed: 2026-10-05. REQ-0006/8. Local maps are sensitive even when the application never uploads them.

At preparation, agree whether to use pseudonyms, retain the map on this device, export it, or erase it at close. Local storage persists beyond the open tab and may be accessible to another user of the same browser profile. Do not describe localStorage as encrypted secure storage.

On reopening, let the participant choose resume or start fresh before entering new information. A readable previous map should survive that choice point. If a saved map is malformed, the app preserves its bytes and explains the problem; starting a new map may replace it. Future guided recovery/export for malformed data is not implemented. Unknown schema versions are rejected rather than guessed. Large notes beyond 4,000 characters and labels beyond 50 characters are outside the current storage contract; record migration/recovery needs before changing those bounds.

If storage is unavailable or saving fails, use the visible guidance and arrange an appropriate export or alternative record before closing. Never promise an export was created solely because the completion screen appeared; verify the file. Export errors/report fidelity remain a separate remediation item.

At close, confirm the participant's retain/erase choice, demonstrate reload/resume if retaining, or explicitly start fresh if erasing. Browser erasure does not revoke previous shared links or delete server/backup copies. This increment does not alter the live sharing/retention service.
