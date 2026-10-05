# True Valence Relationship Mapper (Claude Code Edition)

**Short name:** True Valence Mapper
**Edition owner:** Claude Code agent implementation

A facilitated visual inquiry tool for exploring a leader's current relationship perceptions. This is the canonical production application. Other editions are preserved as research/reference lineage.

Start with [the authoritative project context](docs/START-HERE.md), [current state](docs/CURRENT-STATE.md) and [product–service charter](docs/strategy/PRODUCT-SERVICE-CHARTER.md). Executive pilot status: **NOT READY — security, privacy, persistence and accessibility gates remain open**. See [release gates](docs/quality/RELEASE-GATES.md).

## Live App

**v1 (canonical):** https://v1-rhart696s-projects.vercel.app/

Deployed on Vercel from `v1/` (Next.js + Supabase). No sign-up required.
The previous GitHub Pages deployment (v0 vanilla HTML) is retired — see `docs/archive/v0/`.

## What It Does
- Visualize up to 25 relationships (source limit; pilot guidance starts with 8–12)
- Record directional perceived approach confidence (High/Medium/Low/Unscored)
- View entered categories with color and dash cues
- Optional six-character-code sharing exists; authorization/retention review is pending (see release gates)
- Export to PDF or PNG

## Quick Start

Open the live app above, click **Start Session**, add the people in your work or personal life, and rate your confidence in each relationship.

### Local Development (v1)

```bash
cd v1
npm install
npm run dev
# Visit http://localhost:3000
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `v1/.env.local` for Save & Share to work locally.

## How to Use

1. **Add People**: Enter names of people in your relationship network (current maximum 25)
2. **Record approach confidence**: Click arrows to cycle through trust levels:
   - High confidence: "I'd definitely go to them / they'd come to me"
   - Medium confidence: "Maybe, depends on the situation"
   - Low confidence: "Unlikely or uncomfortable"
   - Not yet scored

3. **Notice patterns in your perceptions**:
   - Outward arrows: Your perceived confidence about approaching them
   - Inward arrows: Your belief about their approach to you
   - Reflect on directional differences; the map does not establish anyone else's actual perspective

4. **Save & Share**: Click "Save & Share" in the panel to generate a 6-char code and shareable link

## The Questions

**Outward Arrow (You → Them):**
"How confident am I that I would go to this person if I had a problem with them?"

**Inward Arrow (Them → You):**
"How confident am I that this person would come to me if they had a problem with me?"

## Use Cases
- Coaching sessions
- Team dynamics assessment
- Family relationship mapping
- Personal reflection
- Conflict resolution planning

## Technical Details

**v1 stack at inspected baseline:** Next.js 16.1.6 / React 19.2.3, TypeScript, Tailwind CSS, Supabase
**v0 stack (archived):** Pure HTML/CSS/JavaScript, localStorage only

## Future Roadmap

See [the evidence-governed roadmap](docs/strategy/ROADMAP.md). Older candidate lists are historical proposals; guided sense-making precedes product generative AI.

## Accessibility
- Keyboard navigation support
- Clear color contrast
- Accessibility features require evaluation against the pilot WCAG 2.2 AA target; conformance has not been verified

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Development workflow (GitHub Flow)
- Coding standards
- Security requirements
- Testing procedures
- How to submit pull requests

**Quick Start for Contributors:**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes in `v1/`
4. Test thoroughly (especially security!)
5. Submit a pull request

## Security

Security is a top priority. Source inspection found material unresolved sharing authorization, retention and dependency issues. Existing security claims are not an audit. See [security baseline](docs/risk/SECURITY.md) and [current dependency report](docs/quality/baseline/npm-audit-2026-10-05.json). The checked-in SQL is not proof of deployed policy.

**Reporting Security Issues:** Please see our [Security Policy](.github/SECURITY.md) for responsible disclosure procedures.

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2025 True Valence Mapper Contributors

## Development Workflow

We use **GitHub Flow**:
1. Create feature branch from `main`
2. Make changes and commit
3. Open pull request
4. Pass security checks and review
5. Merge to `main` (auto-deploys to Vercel)

## Project Structure

```
true-valence-mapper-claude/
├── v1/                           # Current app (Next.js)
│   ├── src/
│   │   ├── app/                  # Next.js app router
│   │   ├── components/           # React components
│   │   ├── hooks/                # Custom hooks
│   │   ├── lib/                  # Supabase, share session logic
│   │   └── types.ts
│   └── package.json
├── docs/
│   ├── archive/v0/               # Retired v0 vanilla HTML files
│   ├── planning/                 # Roadmap and planning docs
│   ├── security/                 # Security documentation
│   └── implementation/           # Feature guides
├── .github/                      # GitHub templates & workflows
└── LICENSE
```

## Created By
Built as part of the "ship, don't infrastructure" challenge.

---
*v1 deployed on Vercel — February 2026*
