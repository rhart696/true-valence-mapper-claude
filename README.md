# Trust Valence Mapper

A visual tool for mapping trust flow in relationship networks. Perfect for coaching sessions, self-reflection, and understanding relationship dynamics.

## Live Demo
🚀 **LIVE NOW**: https://rhart696.github.io/true-value-mapper/

## What It Does
- Visualize up to 8 key relationships
- Score trust bidirectionally (1-3 scale)
- See patterns instantly with color coding
- Save and reload your maps
- Works completely offline

## Quick Start

### Option 1: Direct Browser
Just open `index.html` in your browser!

### Option 2: Local Server
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## How to Use

1. **Add People**: Enter names of people in your relationship network (max 8)
2. **Score Trust**: Click arrows to cycle through trust levels:
   - 🟢 Green (1): High trust - "I'd definitely go to them / they'd come to me"
   - 🟡 Yellow (2): Medium trust - "Maybe, depends on the situation"
   - 🔴 Red (3): Low/No trust - "Unlikely or uncomfortable"
   - ⚪ Gray (0): Not scored yet

3. **Interpret Patterns**:
   - Outward arrows: Your trust in approaching them
   - Inward arrows: Their perceived trust in approaching you
   - Look for asymmetries and red zones

4. **Save Progress**: Use Save/Load buttons to persist your map

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
- Pure HTML/CSS/JavaScript (no dependencies!)
- SVG-based visualization
- localStorage for persistence
- Mobile responsive
- ~500 lines of clean code

## Future Roadmap
- Stage 2: Backend with multiple maps
- Stage 3: Export to PNG/PDF
- Stage 4: AI-assisted insights
- Stage 5: Team/organizational maps

## Accessibility
- Keyboard navigation support
- Clear color contrast
- Alternative to red/green for colorblind users (coming in v2)
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
3. Make your changes
4. Test thoroughly (especially security!)
5. Submit a pull request

## Security

Security is a top priority. This application implements:
- Comprehensive XSS protection
- Input validation and sanitization
- Row Level Security (RLS) with Supabase
- SQL injection prevention
- Secure data handling

**Reporting Security Issues:** Please see our [Security Policy](.github/SECURITY.md) for responsible disclosure procedures. Do not open public issues for security vulnerabilities.

**Security Documentation:** Detailed security implementation docs are available in [docs/security/](docs/security/).

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2025 True Value Mapper Contributors

## Development Workflow

We use **GitHub Flow**:
1. Create feature branch from `main`
2. Make changes and commit
3. Open pull request
4. Pass security checks and review
5. Merge to `main` (auto-deploys via GitHub Actions)

**Branch Protection:** The `main` branch requires:
- Pull request reviews
- Passing status checks (security audit, HTML validation)
- Up-to-date branches before merge

## Project Structure

```
true-value-mapper/
├── index.html                    # Main application
├── styles.css                    # Core styles
├── cloud-storage.js              # Supabase integration
├── input-validation.js           # Security validation
├── toast-notifications.js        # User notifications
├── version-history.js            # Version control
├── accessibility-improvements.js # A11y features
├── .github/                      # GitHub templates & workflows
├── docs/                         # Documentation
│   ├── security/                # Security documentation
│   ├── implementation/          # Feature guides
│   ├── planning/                # Architecture & planning
│   └── reports/                 # Status reports
└── LICENSE                       # MIT license
```

## Created By
Built in 7 days as part of the "ship, don't infrastructure" challenge.

---
*Version 1.0 - Production*
*Ship Date: November 9, 2025* ✅
*Repository configured: January 2025*