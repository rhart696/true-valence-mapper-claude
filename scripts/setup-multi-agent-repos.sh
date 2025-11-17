#!/usr/bin/env bash

set -euo pipefail

# Configuration
OWNER="${GH_OWNER:-rhart696}"
PARENT_REPO="true-valence-mapper"
DRY_RUN="${DRY_RUN:-false}"
LOG_FILE="${LOG_FILE:-setup-multi-agent-repos.log}"
PHASE="${PHASE:-1}"  # Phase 1: initial 3 repos, Phase 2: add more

# Logging function
log() {
  local level="$1"
  shift
  local message="$*"
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  echo "[${timestamp}] [${level}] ${message}" | tee -a "${LOG_FILE}"
}

# All repository descriptions
declare -A CHILD_DESCRIPTIONS=(
  ["true-valence-mapper-claude"]="True Valence Relationship Mapper – Claude Code reference build."
  ["true-valence-mapper-codex"]="True Valence Relationship Mapper – Codex/GPT-5 engineering workflow."
  ["true-valence-mapper-multipath"]="True Valence Relationship Mapper – Multi Path orchestration experiments."
  ["true-valence-mapper-gemini"]="True Valence Relationship Mapper – Gemini AI Studio implementation."
  ["true-valence-mapper-bmad-method"]="True Valence Relationship Mapper – BMAD coaching methodology edition."
  ["true-valence-mapper-stitch"]="True Valence Relationship Mapper – Stitch automation platform integration."
  ["true-valence-mapper-speckit"]="True Valence Relationship Mapper – Speckit enablement-focused edition."
)

# Phase 1: Initial 3-repo rollout (parent, Claude, Codex)
# Phase 2: Add additional editions as validated
if [[ "${PHASE}" == "1" ]]; then
  child_repo_names=("true-valence-mapper-claude" "true-valence-mapper-codex")
  log "INFO" "Phase 1: Creating parent + 2 child repos (Claude, Codex)"
else
  child_repo_names=("${!CHILD_DESCRIPTIONS[@]}")
  IFS=$'\n' child_repo_names=($(sort <<<"${child_repo_names[*]}"))
  log "INFO" "Phase 2: Creating all ${#child_repo_names[@]} child repositories"
fi

create_repo() {
  local repo_name="$1"
  local description="$2"
  local visibility="${3:-public}"

  if gh repo view "${OWNER}/${repo_name}" >/dev/null 2>&1; then
    log "INFO" "${repo_name} already exists under ${OWNER}. Skipping."
    return 0
  fi

  if [[ "${DRY_RUN}" == "true" ]]; then
    log "DRY-RUN" "Would create ${OWNER}/${repo_name} (${visibility}): ${description}"
    return 0
  fi

  log "INFO" "Creating ${OWNER}/${repo_name}..."
  if gh repo create "${OWNER}/${repo_name}" \
    --${visibility} \
    --description "${description}" \
    --disable-wiki \
    --enable-issues \
    --confirm 2>&1 | tee -a "${LOG_FILE}"; then
    log "SUCCESS" "Created ${OWNER}/${repo_name}"
  else
    log "ERROR" "Failed to create ${OWNER}/${repo_name}"
    return 1
  fi
}

# Initialize log file
log "INFO" "==============================================="
log "INFO" "Multi-Agent Repository Setup - Phase ${PHASE}"
log "INFO" "DRY_RUN: ${DRY_RUN}"
log "INFO" "OWNER: ${OWNER}"
log "INFO" "==============================================="

if [[ "${DRY_RUN}" == "true" ]]; then
  log "DRY-RUN" "Running in dry-run mode - no repositories will be created"
fi

log "INFO" "Authenticating gh CLI"
if ! gh auth status >/dev/null 2>&1; then
  if [[ -z "${GH_TOKEN:-}" ]]; then
    log "ERROR" "GH_TOKEN is not set. Provide a personal access token via environment variables or gh auth login."
    exit 1
  fi
  log "INFO" "Authenticating with GitHub using GH_TOKEN"
  printf "%s" "${GH_TOKEN}" | gh auth login --with-token >/dev/null
  log "SUCCESS" "GitHub authentication completed"
fi

log "INFO" "Ensuring parent repository (${PARENT_REPO}) exists"
create_repo "${PARENT_REPO}" "Parent repository coordinating all True Valence Mapper agent editions."

log "INFO" "Ensuring child repositories exist (${#child_repo_names[@]} repos)"
for repo_name in "${child_repo_names[@]}"; do
  create_repo "${repo_name}" "${CHILD_DESCRIPTIONS[${repo_name}]}"
done

log "SUCCESS" "Repository creation run completed."
log "INFO" "Log file: ${LOG_FILE}"

if [[ "${DRY_RUN}" == "true" ]]; then
  log "DRY-RUN" "This was a dry run. Set DRY_RUN=false to create repositories."
  log "DRY-RUN" "Example: DRY_RUN=false PHASE=1 ./scripts/setup-multi-agent-repos.sh"
fi
