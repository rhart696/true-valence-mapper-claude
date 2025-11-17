# Multi-Agent Repository Setup Scripts

This directory contains automation scripts for the phased multi-agent repository architecture.

## Scripts

### `setup-multi-agent-repos.sh`

Creates GitHub repositories for the True Valence Mapper multi-agent architecture.

#### Features

- **Dry-run mode**: Test without creating repositories
- **Logging**: All operations logged to file with timestamps
- **Phased rollout**: Start with 3 repos (Phase 1) or create all 8 (Phase 2)
- **Idempotent**: Safe to run multiple times (skips existing repos)
- **Error handling**: Exits on first error, logs all failures

#### Usage

**Dry-run mode (recommended first):**
```bash
DRY_RUN=true PHASE=1 ./scripts/setup-multi-agent-repos.sh
```

**Phase 1: Create parent + Claude + Codex (3 repos):**
```bash
DRY_RUN=false PHASE=1 ./scripts/setup-multi-agent-repos.sh
```

**Phase 2: Create all 8 repositories:**
```bash
DRY_RUN=false PHASE=2 ./scripts/setup-multi-agent-repos.sh
```

#### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DRY_RUN` | `false` | Set to `true` to test without creating repos |
| `PHASE` | `1` | `1` for initial 3 repos, `2` for all 8 repos |
| `GH_OWNER` | `rhart696` | GitHub username/organization |
| `GH_TOKEN` | - | GitHub Personal Access Token (if not authenticated) |
| `LOG_FILE` | `setup-multi-agent-repos.log` | Path to log file |

#### Prerequisites

1. **GitHub CLI installed**
   ```bash
   gh --version
   ```

2. **GitHub authentication**
   ```bash
   gh auth status
   # OR set GH_TOKEN environment variable
   ```

3. **Personal Access Token** (if using GH_TOKEN)
   - Scopes needed: `repo`, `public_repo`
   - Store in 1Password: `op://Personal/GitHub-Multi-Agent-PAT/password`

#### Repositories Created

**Phase 1 (3 repos):**
- `true-valence-mapper` - Parent repository (governance, shared assets)
- `true-valence-mapper-claude` - Claude Code edition (already exists)
- `true-valence-mapper-codex` - Codex/GPT-5 edition

**Phase 2 (additional 5 repos):**
- `true-valence-mapper-multipath` - Multi Path orchestration
- `true-valence-mapper-gemini` - Gemini AI Studio
- `true-valence-mapper-bmad-method` - BMAD coaching methodology
- `true-valence-mapper-stitch` - Stitch automation platform
- `true-valence-mapper-speckit` - Speckit enablement-focused

#### Examples

**Test in dry-run mode:**
```bash
export DRY_RUN=true
export PHASE=1
./scripts/setup-multi-agent-repos.sh
# Check setup-multi-agent-repos.log for what would be created
```

**Create Phase 1 repos with custom owner:**
```bash
export DRY_RUN=false
export PHASE=1
export GH_OWNER=myusername
./scripts/setup-multi-agent-repos.sh
```

**Create Phase 1 with PAT from 1Password:**
```bash
export GH_TOKEN=$(op read "op://Personal/GitHub-Multi-Agent-PAT/password")
export DRY_RUN=false
export PHASE=1
./scripts/setup-multi-agent-repos.sh
```

#### Validation

After running, verify repositories were created:

```bash
# Check parent repo
gh repo view rhart696/true-valence-mapper

# Check Codex edition
gh repo view rhart696/true-valence-mapper-codex

# List all repos matching pattern
gh repo list rhart696 --limit 100 | grep true-valence-mapper
```

#### Rollback

If you need to delete created repositories:

```bash
# Delete a specific repo
gh repo delete rhart696/true-valence-mapper-codex --yes

# Or via web UI:
# https://github.com/rhart696/{repo-name}/settings (scroll to Danger Zone)
```

#### Troubleshooting

**Error: "GH_TOKEN is not set"**
- Solution: Run `gh auth login` or set `GH_TOKEN` environment variable

**Error: "Protected branch update failed"**
- Solution: This is expected for existing repos with branch protection

**Error: "already exists"**
- Solution: Script will skip existing repos automatically (this is OK)

**Log file not created**
- Solution: Ensure you have write permissions in current directory

#### Related Documentation

- [Multi-Agent Version Plan](../docs/planning/MULTI-AGENT-VERSION-PLAN.md)
- [GitHub Workflow](./.github/workflows/setup-agent-repos.yml)

---

## bootstrap-parent-repo.sh

Initializes the parent repository structure with all necessary directories and documentation.

### Features

- **Dry-run mode**: Test without creating files
- **Logging**: All operations logged with timestamps
- **Idempotent**: Safe to run multiple times (skips existing files)
- **Complete structure**: Creates dirs, docs, and config files

### Usage

**Dry-run mode (recommended first):**
```bash
DRY_RUN=true ./scripts/bootstrap-parent-repo.sh
```

**Create parent repository structure:**
```bash
DRY_RUN=false PARENT_DIR=../true-valence-mapper ./scripts/bootstrap-parent-repo.sh
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DRY_RUN` | `false` | Set to `true` to test without creating files |
| `PARENT_DIR` | `../true-valence-mapper` | Path to parent repository |
| `LOG_FILE` | `bootstrap-parent-repo.log` | Path to log file |

### Structure Created

```
true-valence-mapper/
├── docs/
│   ├── GOVERNANCE.md      # Cross-edition workflows
│   ├── ARCHITECTURE.md    # Multi-agent rationale
│   └── DECISION-LOG.md    # Decision tracking
├── shared/
│   ├── styles/            # Common CSS
│   ├── components/        # Reusable JS
│   ├── schemas/           # Database schemas
│   ├── security/          # Validation logic
│   └── tests/             # Test fixtures
├── versions/              # Submodule directory
├── ops/                   # Monitoring tools
├── .github/workflows/     # GitHub Actions
├── README.md              # Main documentation
├── LICENSE                # MIT License
└── .gitignore             # Git exclusions
```

### After Running

Initialize as git repository and push to GitHub:

```bash
cd ../true-valence-mapper
git init
git add .
git commit -m "Initial parent repository structure"
gh repo create rhart696/true-valence-mapper --source=. --public --push
```

---

## Future Scripts

### `sync-shared-assets.sh` (Coming in Phase 3.2)

Will sync shared components from parent to child editions.

### `validate-repos.sh` (Coming in Phase 1.4)

Will validate all repositories are properly configured.
