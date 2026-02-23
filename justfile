# justfile — True Valence Mapper (Claude Edition)
# Usage: just [recipe]   |   just --list

# App lives in v1/ subdirectory
app_dir := "v1"

# Default: show available recipes
default:
    @just --list

# ── Development ──────────────────────────────────────────

# Start Next.js dev server
dev:
    cd {{app_dir}} && npm run dev

# Production build
build:
    cd {{app_dir}} && npm run build

# Start production server
start:
    cd {{app_dir}} && npm run start

# Install/update dependencies
install:
    cd {{app_dir}} && npm install

# ── Quality ──────────────────────────────────────────────

# Run ESLint
lint:
    cd {{app_dir}} && npm run lint

# Run lint + build (type-check via Next.js build)
check: lint build

# ── Validation ───────────────────────────────────────────

# Quick validation of multi-agent repo setup
validate:
    bash scripts/quick-validate.sh

# Full setup validation
validate-setup:
    bash scripts/validate-setup.sh

# ── Git & Review ─────────────────────────────────────────

# Show uncommitted changes summary
status:
    @git status --short
    @echo ""
    @git log --oneline -5

# Pre-push workflow: lint + build + status
pre-push: check status
    @echo ""
    @echo "Pre-push checks complete."
