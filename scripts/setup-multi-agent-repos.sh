#!/usr/bin/env bash

set -euo pipefail

OWNER="${GH_OWNER:-rhart696}"
PARENT_REPO="true-valence-mapper"

declare -A CHILD_DESCRIPTIONS=(
  ["true-valence-mapper-claude"]="True Valence Relationship Mapper – Claude Code reference build."
  ["true-valence-mapper-codex"]="True Valence Relationship Mapper – Codex/GPT-5 engineering workflow."
  ["true-valence-mapper-multipath"]="True Valence Relationship Mapper – Multi Path orchestration experiments."
  ["true-valence-mapper-gemini"]="True Valence Relationship Mapper – Gemini AI Studio implementation."
  ["true-valence-mapper-bmad-method"]="True Valence Relationship Mapper – BMAD coaching methodology edition."
  ["true-valence-mapper-stitch"]="True Valence Relationship Mapper – Stitch automation platform integration."
  ["true-valence-mapper-speckit"]="True Valence Relationship Mapper – Speckit enablement-focused edition."
)

child_repo_names=("${!CHILD_DESCRIPTIONS[@]}")
IFS=$'\n' child_repo_names=($(sort <<<"${child_repo_names[*]}"))

create_repo() {
  local repo_name="$1"
  local description="$2"
  local visibility="${3:-public}"

  if gh repo view "${OWNER}/${repo_name}" >/dev/null 2>&1; then
    echo "ℹ️  ${repo_name} already exists under ${OWNER}. Skipping."
    return 0
  fi

  echo "🚀 Creating ${OWNER}/${repo_name}..."
  gh repo create "${OWNER}/${repo_name}" \
    --${visibility} \
    --description "${description}" \
    --disable-wiki \
    --enable-issues \
    --confirm
}

echo "==> Authenticating gh CLI"
if ! gh auth status >/dev/null 2>&1; then
  if [[ -z "${GH_TOKEN:-}" ]]; then
    echo "GH_TOKEN is not set. Provide a personal access token via environment variables or gh auth login."
    exit 1
  fi
  printf "%s" "${GH_TOKEN}" | gh auth login --with-token >/dev/null
fi

echo "==> Ensuring parent repository (${PARENT_REPO}) exists"
create_repo "${PARENT_REPO}" "Parent repository coordinating all True Valence Mapper agent editions."

echo "==> Ensuring child repositories exist"
for repo_name in "${child_repo_names[@]}"; do
  create_repo "${repo_name}" "${CHILD_DESCRIPTIONS[${repo_name}]}"
done

echo "✅ Repository creation run completed."
