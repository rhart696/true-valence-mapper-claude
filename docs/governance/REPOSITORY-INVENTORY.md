# Repository and deployment inventory

Reviewed 2026-10-05. Parent HEAD: 82646a5f6a40a76f9a579f98f2960ebae4372c56. Canonical app HEAD: a460c6f589b712e66a973b123678cec9e68bbc3c.

| Reference path | Intended role | Snapshot commit |
|---|---|---|
| versions/Gemini_3 | reference | `5c7f54b135dd787596d1682138f43c14aaaf27db` |
| versions/bmad | reference | `84f99eda478a5bbecc0f2e9840c3834027ba11ca` |
| versions/claude | canonical | `a460c6f589b712e66a973b123678cec9e68bbc3c` |
| versions/codex | reference | `e420296af6a5601522cd59070c9fbea5f8ce9ee4` |
| versions/magic-path | reference | `50fd4fe52261bb6cd3c3ebb524312b5c216d6cce` |
| versions/openspec | reference | `7d5acb33c0638d6bf504883e97881ecbea0ed907` |
| versions/spec-kit | reference | `90779042d41b2fc62c064f455d78e0d5388b6352` |
| versions/true-valence-mapper-antigravity | reference | `a21fe85af92551ecf1a3374ed7b3cb2b5b93bd53` |

Snapshot pins are copied from parent gitlinks; this is not a code/security audit of every sibling repo. No annotated remote tags, read-only repository settings, history rewrite or deletion performed. `shared/` contains templates and brand assets; no shared npm package was found in its tracked inventory.

Canonical v1 remains in place. Root CLAUDE.md is a symlink to AGENTS.md. Parent template workflow historically overwrites AGENTS.md but preserves AGENTS.local.md. App main push notifies the parent. Parent auto-sync historically advances all named editions. Companion convergence PR retires that prototype advancement and template synchronization; merge is required before operational effect.

Source disables v0 push deployment but retains a manual GitHub Pages workflow. README reports Vercel main auto-deploy; actual account configuration, branch protections and deployed Supabase grants/RLS were not inspected. This branch changes documentation/tooling only, not runtime or database.
