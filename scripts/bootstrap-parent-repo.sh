#!/usr/bin/env bash

set -euo pipefail

# Configuration
PARENT_DIR="${PARENT_DIR:-../true-valence-mapper}"
DRY_RUN="${DRY_RUN:-false}"
LOG_FILE="${LOG_FILE:-bootstrap-parent-repo.log}"

# Logging function
log() {
  local level="$1"
  shift
  local message="$*"
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  echo "[${timestamp}] [${level}] ${message}" | tee -a "${LOG_FILE}"
}

# Create directory function
create_dir() {
  local dir_path="$1"
  local description="$2"

  if [[ "${DRY_RUN}" == "true" ]]; then
    log "DRY-RUN" "Would create directory: ${dir_path} (${description})"
    return 0
  fi

  if [[ -d "${dir_path}" ]]; then
    log "INFO" "Directory already exists: ${dir_path}"
    return 0
  fi

  log "INFO" "Creating directory: ${dir_path}"
  mkdir -p "${dir_path}"
  log "SUCCESS" "Created: ${dir_path}"
}

# Create file function
create_file() {
  local file_path="$1"
  local content="$2"

  if [[ "${DRY_RUN}" == "true" ]]; then
    log "DRY-RUN" "Would create file: ${file_path}"
    return 0
  fi

  if [[ -f "${file_path}" ]]; then
    log "INFO" "File already exists: ${file_path}"
    return 0
  fi

  log "INFO" "Creating file: ${file_path}"
  echo "${content}" > "${file_path}"
  log "SUCCESS" "Created: ${file_path}"
}

log "INFO" "==============================================="
log "INFO" "Parent Repository Bootstrap"
log "INFO" "DRY_RUN: ${DRY_RUN}"
log "INFO" "PARENT_DIR: ${PARENT_DIR}"
log "INFO" "==============================================="

if [[ "${DRY_RUN}" == "true" ]]; then
  log "DRY-RUN" "Running in dry-run mode - no files will be created"
fi

# Create main directories
log "INFO" "Creating directory structure"
create_dir "${PARENT_DIR}" "Parent repository root"
create_dir "${PARENT_DIR}/docs" "Documentation"
create_dir "${PARENT_DIR}/shared" "Shared assets across all editions"
create_dir "${PARENT_DIR}/versions" "Submodule directory for editions"
create_dir "${PARENT_DIR}/ops" "Operational tools and monitoring"
create_dir "${PARENT_DIR}/shared/styles" "Shared CSS"
create_dir "${PARENT_DIR}/shared/components" "Shared JavaScript modules"
create_dir "${PARENT_DIR}/shared/schemas" "Supabase schemas"
create_dir "${PARENT_DIR}/shared/security" "Security validation logic"
create_dir "${PARENT_DIR}/shared/tests" "Common test fixtures"
create_dir "${PARENT_DIR}/.github/workflows" "GitHub Actions"

# Create README.md
log "INFO" "Creating README.md"
create_file "${PARENT_DIR}/README.md" "$(cat <<'EOF'
# True Valence Relationship Mapper

**Parent repository coordinating all True Valence Mapper agent editions**

## Overview

This repository serves as the governance and coordination hub for the True Valence Mapper multi-agent development architecture. Different AI orchestrators (Claude Code, GitHub Copilot/Codex, Gemini, etc.) lead development of parallel editions to explore diverse implementation approaches.

## Editions

| Edition | Repository | Status | Lead Agent | Focus |
|---------|-----------|--------|------------|-------|
| Claude Code | [true-valence-mapper-claude](https://github.com/rhart696/true-valence-mapper-claude) | ✅ Active | Claude Code | Reference build, security-first |
| Codex | [true-valence-mapper-codex](https://github.com/rhart696/true-valence-mapper-codex) | 🚧 In Progress | GitHub Copilot/Codex | Engineering workflow optimization |
| Multi Path | [true-valence-mapper-multipath](https://github.com/rhart696/true-valence-mapper-multipath) | 📅 Planned | Multi Path | Orchestration experiments |
| Gemini | [true-valence-mapper-gemini](https://github.com/rhart696/true-valence-mapper-gemini) | 📅 Planned | Gemini AI Studio | AI-powered insights |
| BMAD Method | [true-valence-mapper-bmad-method](https://github.com/rhart696/true-valence-mapper-bmad-method) | 📅 Planned | TBD | Coaching methodology |
| Stitch | [true-valence-mapper-stitch](https://github.com/rhart696/true-valence-mapper-stitch) | 📅 Planned | TBD | Automation platform |
| Speckit | [true-valence-mapper-speckit](https://github.com/rhart696/true-valence-mapper-speckit) | 📅 Planned | TBD | Enablement focus |

Legend: ✅ Shipped | 🚧 In Progress | 📅 Planned | ⏸️ Paused | 🗄️ Archived

## Repository Structure

```
true-valence-mapper/
├── docs/              # Cross-edition documentation
│   ├── GOVERNANCE.md  # Workflow and decision processes
│   ├── ARCHITECTURE.md # Multi-agent architecture rationale
│   └── DECISION-LOG.md # Edition comparison tracking
├── shared/            # Common assets used by all editions
│   ├── styles/        # Shared CSS
│   ├── components/    # Reusable JavaScript modules
│   ├── schemas/       # Supabase database schemas
│   ├── security/      # Input validation and XSS protection
│   └── tests/         # Common test fixtures
├── versions/          # Edition repositories (submodules)
│   ├── claude/        # → true-valence-mapper-claude
│   └── codex/         # → true-valence-mapper-codex
└── ops/               # Monitoring and status tracking
```

## Quick Start

### Clone with Submodules

```bash
git clone --recursive git@github.com:rhart696/true-valence-mapper.git
cd true-valence-mapper
```

### Update All Editions

```bash
git submodule update --remote --merge
```

### Check Edition Status

```bash
# View comparison dashboard
open ops/status-dashboard.html

# Check specific edition
cd versions/claude && git status
```

## Governance

See [GOVERNANCE.md](docs/GOVERNANCE.md) for:
- Weekly sync meeting schedule
- Feature promotion workflow (edition → shared)
- Cross-edition issue coordination
- Decision criteria for archiving editions

## Feature Comparison

| Feature | Claude | Codex | Gemini | Notes |
|---------|--------|-------|--------|-------|
| Core visualization | ✅ v1.0 | 🚧 | 📅 | Claude baseline complete |
| Cloud storage (anon) | ✅ v1.0 | 🚧 | 📅 | Supabase RLS implemented |
| Toast notifications | ✅ v1.0 | 🚧 | 📅 | Comprehensive UX feedback |
| Version history | ✅ v1.0 | 🚧 | 📅 | Cloud-synced history |
| Input validation | ✅ v1.0 | 🚧 | 📅 | XSS + injection protection |
| AI-powered insights | 📅 | 📅 | 🚧 | Gemini experiment |
| Coach sharing | 📅 | 📅 | 📅 | Planned Phase 2 |

## Contributing

Each edition repository has its own contribution guidelines. For cross-edition work:

1. Propose in parent repo issues with `cross-edition` label
2. Discuss in weekly sync meeting
3. Implement in `shared/` directory
4. Editions opt-in via submodule update

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE)

## Links

- [Multi-Agent Version Plan](https://github.com/rhart696/true-valence-mapper-claude/blob/main/docs/planning/MULTI-AGENT-VERSION-PLAN.md)
- [Claude Edition (Baseline)](https://rhart696.github.io/true-valence-mapper-claude/)
- [Security Documentation](https://github.com/rhart696/true-valence-mapper-claude/tree/main/docs/security)

---

**Coordinated development by human + AI agent teams | © 2024-2025**
EOF
)"

# Create GOVERNANCE.md
log "INFO" "Creating GOVERNANCE.md"
create_file "${PARENT_DIR}/docs/GOVERNANCE.md" "$(cat <<'EOF'
# True Valence Mapper - Multi-Agent Governance

This document defines how different AI-led editions coordinate development and share innovations.

## Principles

1. **Edition Independence**: Each edition operates autonomously with its own roadmap
2. **Shared Innovation**: Valuable features can be promoted to shared library
3. **Opt-In Adoption**: Editions choose when to adopt shared components
4. **Evidence-Based**: Decisions driven by metrics and validation, not speculation

## Weekly Sync Schedule

**When**: Every Monday, 10:00 AM (documented async if solo developer)
**Duration**: 30 minutes
**Attendees**: Edition leads (human + primary AI agent per edition)

**Agenda**:
1. Edition status updates (5 min each)
2. Demo new features (10 min)
3. Promotion candidates (10 min)
4. Blockers and cross-edition issues (5 min)

## Feature Promotion Workflow

### 1. Identify Candidate

Feature developed in edition repository demonstrates value:
- Solves user need effectively
- Has test coverage > 80%
- Security reviewed and passing
- Applicable to other editions

### 2. Propose Promotion

Edition lead creates issue in parent repo:
- Label: `promotion-candidate`
- Include: feature description, metrics, test results, security review
- Estimate: effort for other editions to adopt

### 3. Review and Decide

**Criteria for promotion to `shared/`:**
- ✅ Applicable to 2+ editions
- ✅ No security vulnerabilities
- ✅ Well-tested and documented
- ✅ Positive user feedback (if applicable)
- ✅ Maintenance overhead acceptable

**Decision makers**: Weekly sync meeting (majority vote if multiple editions)

### 4. Implementation

**If approved:**
1. Refactor feature into `shared/` directory
2. Create PR to parent repo
3. Update shared component documentation
4. Notify other editions (GitHub discussion post)

**Editions adopt via:**
```bash
cd true-valence-mapper-{edition}
git submodule update --remote parent
# Review changes in shared/
# Integrate into edition codebase
git commit -m "Adopt shared feature X from parent"
```

## Issue Labeling Strategy

Use these labels across all edition repositories:

| Label | Usage |
|-------|-------|
| `edition:claude` | Specific to Claude edition |
| `edition:codex` | Specific to Codex edition |
| `cross-edition` | Affects multiple editions |
| `shared-component` | Related to `shared/` directory |
| `promotion-candidate` | Feature proposed for sharing |
| `governance` | Process or coordination issue |

## Semantic Versioning

**Format**: `v{major}.{minor}.{patch}-{edition}`

**Examples**:
- `v1.0.0-claude` - Claude edition release
- `v1.1.0-codex` - Codex edition with new feature
- `v2.0.0-shared` - Shared component library major update

**When to tag**:
- **Major**: Breaking changes, architecture shifts
- **Minor**: New features, non-breaking additions
- **Patch**: Bug fixes, documentation updates

## Edition Success Criteria

Track these metrics to evaluate edition value:

### Quantitative
- Lines of code added/modified/deleted (churn rate)
- Test coverage percentage
- Security audit pass rate
- Deployment frequency
- Issue resolution time

### Qualitative
- Unique approaches discovered
- User experience improvements
- Code quality innovations
- Architectural insights

## Edition Lifecycle

### Active Development
- Regular commits (at least weekly)
- Participation in sync meetings
- Responsive to issues

### Paused
- No active development but maintained
- May resume later
- Status updated in parent README

### Archived
- Experiment concluded (success or failure)
- Repository made read-only
- Learnings documented in decision log
- Code preserved for reference

**Archive criteria**:
- 4+ weeks of inactivity
- OR objectives achieved and merged to main edition
- OR approach proven non-viable

## Conflict Resolution

**If editions disagree on shared component**:
1. Present evidence (metrics, user feedback, technical analysis)
2. Time-boxed discussion (15 min max)
3. Vote (1 vote per active edition)
4. Tie-breaker: Human lead decides based on project goals

**If issue blocks multiple editions**:
1. Label `blocker` + `cross-edition`
2. Emergency sync meeting within 24 hours
3. Highest-priority resolution

## Merge Protocols

### Shared → Edition
**When**: Edition decides to adopt shared components
**How**:
```bash
git -C versions/{edition} submodule update --remote
# Review changes
# Integrate as needed
```

### Edition → Shared
**When**: Feature approved for promotion
**How**:
1. Extract feature to `shared/` directory
2. PR to parent repo with tests and docs
3. Code review by 1+ other edition leads
4. Merge to main after approval

### Edition → Main Edition
**When**: Experiment succeeds and consolidates
**How**:
1. Feature freeze on experimental edition
2. Cherry-pick valuable commits to main
3. Document learnings
4. Archive experimental repo

## Communication Channels

- **GitHub Issues**: Feature proposals, bugs, questions
- **GitHub Discussions**: Async coordination, announcements
- **Decision Log**: Record of major decisions and rationale
- **Weekly sync**: Real-time coordination

## Amendments

This governance document can be updated:
1. Propose change via PR to parent repo
2. Label: `governance`
3. Review in weekly sync
4. Requires 2/3 vote of active editions
5. Document rationale in decision log

---

**Version**: 1.0.0
**Last updated**: 2025-11-17
**Next review**: 2025-12-17 (monthly)
EOF
)"

# Create ARCHITECTURE.md
log "INFO" "Creating ARCHITECTURE.md"
create_file "${PARENT_DIR}/docs/ARCHITECTURE.md" "$(cat <<'EOF'
# True Valence Mapper - Multi-Agent Architecture

## Rationale

This project uses a **multi-agent polyrepo** architecture to explore how different AI orchestrators approach the same problem space.

### Why Multiple Editions?

1. **Diverse Approaches**: Different AI tools (Claude Code, Copilot, Gemini) have unique strengths
2. **Parallel Exploration**: Test multiple solutions simultaneously
3. **Comparative Learning**: Identify best practices by comparing outcomes
4. **Risk Mitigation**: Avoid single-vendor lock-in or approach dependency

### Why Polyrepo vs Monorepo?

**Polyrepo Advantages** (our choice):
- ✅ Clear ownership boundaries per edition
- ✅ Independent release cycles
- ✅ Easier to archive failed experiments
- ✅ Low coupling between editions
- ✅ Familiar to most developers

**Monorepo Disadvantages** (why we didn't choose it):
- ❌ Complexity budget violations with 7+ editions
- ❌ Harder to isolate experimental failures
- ❌ Shared CI/CD increases blast radius
- ❌ Submodule management provides similar benefits with less complexity

## Repository Topology

```
┌─────────────────────────────────────────────┐
│   true-valence-mapper (parent)              │
│   Governance, Shared Assets, Coordination   │
└─────────────────┬───────────────────────────┘
                  │
      ┌───────────┼───────────┬───────────┐
      │           │           │           │
┌─────▼─────┐ ┌──▼──────┐ ┌──▼──────┐ ┌──▼──────┐
│  Claude   │ │  Codex  │ │  Gemini │ │   ...   │
│  Edition  │ │ Edition │ │ Edition │ │         │
└───────────┘ └─────────┘ └─────────┘ └─────────┘
 Submodule     Submodule   Submodule   Submodule
```

## Submodule Strategy

**Why Submodules?**
- Track specific versions of shared components
- Opt-in updates (editions control when to sync)
- Git history preservation
- Explicit dependency management

**Alternative Considered: npm/pip packages**
- ❌ Too heavy for this use case
- ❌ Publishing overhead
- ❌ Versioning complexity
- ✅ Submodules simpler for this scale

## Shared Component Philosophy

**What belongs in `shared/`:**
- ✅ CSS/styling used by 2+ editions
- ✅ Database schemas (Supabase)
- ✅ Security validation logic
- ✅ Test fixtures and helpers
- ✅ Proven stable components

**What stays in editions:**
- ❌ Experimental features
- ❌ Edition-specific workflows
- ❌ UI components with divergent designs
- ❌ Anything used by only 1 edition

## Edition Coordination

**Loosely Coupled**:
- Editions don't depend on each other
- Shared components are optional (can be overridden)
- No required synchronization

**Coordinated Where Valuable**:
- Weekly syncs to share learnings
- Feature promotions for valuable innovations
- Security patches distributed rapidly

## Deployment Model

Each edition deploys independently:

| Edition | Hosting | URL |
|---------|---------|-----|
| Claude | GitHub Pages | rhart696.github.io/true-valence-mapper-claude |
| Codex | GitHub Pages | rhart696.github.io/true-valence-mapper-codex |
| Gemini | GitHub Pages | rhart696.github.io/true-valence-mapper-gemini |

**Why separate deployments?**
- Independent release cycles
- Easier to compare live versions
- No single point of failure
- Users can choose preferred edition

## Scalability Considerations

**Current Scale**: 3 repos (parent + 2 editions)
**Phase 2 Scale**: 8 repos (parent + 7 editions)
**Max Recommended**: 10 repos before consolidation

**Overhead per edition**:
- ~2 hours/week maintenance
- ~30 min/week sync coordination
- ~1 hour/month dependency updates

**At 8 editions**: ~24 hours/week total (3 hours/day)

**Mitigation**:
- Automation for repetitive tasks
- Archive low-value editions
- Consolidate successful experiments

## Technology Decisions

### Frontend
- **Pure HTML/CSS/JS**: No build step, maximum compatibility
- **Rationale**: Easy for all AI agents to understand and modify

### Backend
- **Supabase**: Managed PostgreSQL + Auth + RLS
- **Rationale**: Minimal ops, security built-in, generous free tier

### Testing
- **Manual + Automated**: Balance speed and thoroughness
- **Rationale**: Early stage, changing requirements

### CI/CD
- **GitHub Actions**: Native integration, per-repo isolation
- **Rationale**: No external dependencies, easy to debug

## Future Considerations

### If Editions Converge
**Sign**: 3+ editions use identical approaches
**Action**: Consolidate to single edition, archive duplicates
**Timeline**: Evaluate quarterly

### If Overhead Exceeds Value
**Sign**: More time coordinating than developing
**Action**: Pause/archive low-value editions
**Timeline**: Evaluate monthly

### If One Edition Dominates
**Sign**: Single edition clearly superior across all metrics
**Action**: Promote to main, archive others, preserve learnings
**Timeline**: After 6 months validation

## Architectural Principles

1. **Independence**: Editions can diverge without coordination
2. **Opt-In Sharing**: Adopt shared components when valuable
3. **Evidence-Based**: Metrics guide decisions, not opinions
4. **Fail Fast**: Archive experiments that don't deliver value
5. **Document Learnings**: Every archived edition teaches something

---

**Version**: 1.0.0
**Last updated**: 2025-11-17
**Stakeholders**: Human lead + AI agent team
EOF
)"

# Create DECISION-LOG.md
log "INFO" "Creating DECISION-LOG.md"
create_file "${PARENT_DIR}/docs/DECISION-LOG.md" "$(cat <<'EOF'
# True Valence Mapper - Decision Log

Records major decisions, rationale, and outcomes for the multi-agent architecture.

## Format

```
### YYYY-MM-DD: Decision Title
**Context**: What prompted this decision?
**Options Considered**: What alternatives were evaluated?
**Decision**: What was chosen and why?
**Outcome**: What happened after implementation? (updated later)
**Metrics**: Quantitative results (updated later)
```

---

## Decisions

### 2025-11-17: Adopt Phased Multi-Agent Rollout (3 repos initially)

**Context**: Codex proposed creating 8 repositories immediately (parent + 7 editions). Analysis revealed this might be premature without validation that multi-repo architecture provides value.

**Options Considered**:
1. **Full rollout (8 repos)**: Create all editions immediately
   - Pro: Maximum experimentation
   - Con: High overhead, unproven value
2. **Phased rollout (3 repos)**: Start with parent + 2 editions
   - Pro: Lower risk, validate before scaling
   - Con: Slower to full experimentation
3. **Monorepo with branches**: Single repo, edition branches
   - Pro: Lowest overhead
   - Con: Less isolation for experiments

**Decision**: **Option 2 - Phased Rollout**
- Phase 1: Create parent + Claude + Codex editions (3 repos)
- Validate for 2-4 weeks
- Phase 2: Add more editions if validated

**Rationale**:
- Solo developer context (limited time budget)
- Aligns with IDP Testing Framework ("simulate first, minimize errors")
- Reversible if overhead exceeds value
- Can scale up based on evidence, not speculation

**Success Criteria**:
- Overhead < 2 hours/week
- Different approaches emerge between Claude and Codex
- Governance workflows are smooth
- Value > complexity cost

**Outcome**: _To be updated after 2-4 week validation period_

**Metrics**: _To be tracked weekly_
- Time spent on cross-edition governance
- Number of unique approaches discovered
- Features promoted to shared library
- User-facing improvements per edition

---

### 2025-11-17: Choose Polyrepo Over Monorepo

**Context**: Need to decide repository structure for multi-agent architecture.

**Options Considered**:
1. **Polyrepo (multiple repositories)**: Separate repo per edition
2. **Monorepo (single repository)**: All editions in one repo with directories
3. **Hybrid**: Core in monorepo, experiments in separate repos

**Decision**: **Option 1 - Polyrepo**

**Rationale**:
- Clear ownership boundaries per edition
- Independent release cycles valuable for experimentation
- Easier to archive failed experiments
- Familiar to most developers
- Complexity stays distributed vs centralized

**Trade-offs Accepted**:
- More repositories to manage (8 vs 1)
- Submodule complexity for shared components
- Need coordination mechanisms (governance docs)

**Outcome**: _To be evaluated after Phase 1 completion_

---

### 2025-11-17: Implement Dry-Run Mode for Automation

**Context**: Repository creation script could fail and create broken repos. Need safety mechanism.

**Options Considered**:
1. **No dry-run**: Run directly in production
   - Pro: Faster
   - Con: Risky, hard to test
2. **Dry-run mode**: Test without creating repos
   - Pro: Safe, allows validation
   - Con: Extra code complexity
3. **Sandbox testing**: Test in separate GitHub org
   - Pro: Full validation
   - Con: Requires additional setup

**Decision**: **Option 2 - Dry-Run Mode** + logging

**Rationale**:
- Low implementation cost (30 lines of code)
- High safety value
- Enables iterative testing
- Logging provides audit trail

**Outcome**: ✅ Successfully implemented and tested
- Dry-run mode works correctly
- Logging captures all operations
- Phase control allows gradual rollout

**Metrics**:
- Dry-run test passed: ✅
- Log file created: ✅
- Would have created 3 repos correctly: ✅

---

## Template for New Decisions

```markdown
### YYYY-MM-DD: Decision Title

**Context**:

**Options Considered**:
1. Option A
   - Pro:
   - Con:
2. Option B
   - Pro:
   - Con:

**Decision**:

**Rationale**:

**Success Criteria**:
-
-

**Outcome**: _To be updated_

**Metrics**: _To be tracked_
-
-
```

---

**Maintained by**: Human lead + AI agents
**Review frequency**: Monthly
**Retention**: Permanent (all decisions preserved)
EOF
)"

# Create .gitignore
log "INFO" "Creating .gitignore"
create_file "${PARENT_DIR}/.gitignore" "$(cat <<'EOF'
# Logs
*.log
setup-multi-agent-repos.log
bootstrap-parent-repo.log

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
*.swo

# Temp
tmp/
temp/
*.tmp

# Node (if used in ops tools)
node_modules/
package-lock.json

# Python (if used in ops tools)
__pycache__/
*.py[cod]
venv/
.env
EOF
)"

# Create LICENSE
log "INFO" "Creating LICENSE"
create_file "${PARENT_DIR}/LICENSE" "$(cat <<'EOF'
MIT License

Copyright (c) 2024-2025 True Valence Mapper Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
)"

log "SUCCESS" "Parent repository bootstrap completed!"
log "INFO" "Log file: ${LOG_FILE}"

if [[ "${DRY_RUN}" == "true" ]]; then
  log "DRY-RUN" "This was a dry run. Set DRY_RUN=false to create files."
  log "DRY-RUN" "Example: DRY_RUN=false ./scripts/bootstrap-parent-repo.sh"
else
  log "INFO" "Next steps:"
  log "INFO" "1. cd ${PARENT_DIR}"
  log "INFO" "2. git init"
  log "INFO" "3. git add ."
  log "INFO" "4. git commit -m 'Initial parent repository structure'"
  log "INFO" "5. gh repo create rhart696/true-valence-mapper --source=. --public --push"
fi
