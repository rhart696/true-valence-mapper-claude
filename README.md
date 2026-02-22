# True Valence Relationship Mapper (Claude Code Edition)

**Short name:** True Valence Mapper
**Edition owner:** Claude Code agent implementation

A visual tool for mapping trust flow in relationship networks. Perfect for coaching sessions, self-reflection, and understanding relationship dynamics. This repository houses the Claude Code-led build; additional orchestrator-led versions live in their own repositories as part of the multi-agent family.

## Live App

**v1 (canonical):** https://v1-rhart696s-projects.vercel.app/

Deployed on Vercel from `v1/` (Next.js + Supabase). No sign-up required.
The previous GitHub Pages deployment (v0 vanilla HTML) is retired — see `docs/archive/v0/`.

## What It Does
- Visualize up to 8 key relationships
- Score trust bidirectionally (1-3 scale)
- See patterns instantly with color coding
- Save and share maps via a 6-character code (30-day expiry)
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

1. **Add People**: Enter names of people in your relationship network (max 8)
2. **Score Trust**: Click arrows to cycle through trust levels:
   - High confidence: "I'd definitely go to them / they'd come to me"
   - Medium confidence: "Maybe, depends on the situation"
   - Low confidence: "Unlikely or uncomfortable"
   - Not yet scored

3. **Interpret Patterns**:
   - Outward arrows: Your trust in approaching them
   - Inward arrows: Their perceived trust in approaching you
   - Look for asymmetries and low-confidence zones

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

**v1 stack:** Next.js 14, TypeScript, React, Tailwind CSS, Supabase
**v0 stack (archived):** Pure HTML/CSS/JavaScript, localStorage only

## Future Roadmap

See [`docs/planning/ROADMAP-V2-CANDIDATES.md`](docs/planning/ROADMAP-V2-CANDIDATES.md) for v2 feature candidates.

## Accessibility
- Keyboard navigation support
- Clear color contrast
- Screen reader friendly labels

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

Security is a top priority. This application implements:
- Comprehensive XSS protection
- Input validation and sanitization
- Row Level Security (RLS) with Supabase
- SQL injection prevention
- Secure data handling

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
