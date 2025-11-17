# Multi-Agent Implementation Plan

## Naming & Repository Strategy

- **Full app name:** True Valence Relationship Mapper  
- **Short name (also parent directory/repo):** `true-valence-mapper`
- **Edition repositories:** Each orchestrator-led build gets its own git repository so experiments, issues, and automation stay isolated. Repos will be named `true-valence-mapper-{edition}`.

## Parent Repository (`true-valence-mapper`)

Purpose: houses shared documents, governance, evaluation rubrics, onboarding instructions, and links/submodules for every edition.

Recommended contents:
1. `/docs` – cross-version guidance, comparison matrix, release playbooks.
2. `/shared` – reusable assets (Supabase schema, QA scripts, brand tokens).
3. `/versions` – git submodules pointing to each agent edition repository, keeping snapshot alignment.
4. `/ops` – automation or GitHub workflow definitions for status dashboards.

Creation steps:
1. `mkdir true-valence-mapper && cd true-valence-mapper`
2. `git init`
3. Add this multi-agent plan plus any shared docs.
4. `gh repo create rhart696/true-valence-mapper --public` (authenticate with PAT stored in 1Password).
5. Push and add submodules once child repos exist.

## Edition Repositories

Create the following repos on GitHub (all under `rhart696`), each initialized from the current Claude build commit so they share the same baseline:

| Edition | Repo Name | Primary Goal | Kickoff Tasks |
| --- | --- | --- | --- |
| Claude Code *(current repo)* | `true-valence-mapper-claude` | Preserve reference implementation shipped with Claude Code. | Rename repo locally & remotely, keep docs updated, act as baseline for comparisons. |
| Codex | `true-valence-mapper-codex` | Showcase GPT-5/Codex automation, richer developer tooling. | Fork from Claude edition, swap orchestration scripts to Codex CLI, document agent differences. |
| Multi Path | `true-valence-mapper-multipath` | Explore branching/parallel agent workflows (e.g., multi-agent planning). | Clone base, integrate Multi Path orchestrator configs, capture execution traces. |
| Gemini | `true-valence-mapper-gemini` | Optimize for Google Gemini 2.5 workflows and AI Studio deployment. | Align prompts to Gemini, add API keys (store in 1Password), document latency/cost metrics. |
| BMAD-Method | `true-valence-mapper-bmad-method` | Implement BMAD coaching methodology with AI guidance. | Introduce BMAD-specific flows, align documentation, add scenario libraries. |
| Stitch | `true-valence-mapper-stitch` | Build on Stitch automation platform & data stitching workflows. | Configure Stitch integration, automate data syncing scripts. |
| Speckit | `true-valence-mapper-speckit` | Embed Speckit enablement workflows & in-app guidance. | Add Speckit SDK, tailor UX prompts, document enablement templates. |

### Repository Creation Workflow

For each edition (except Claude, already initialized):
1. `gh repo create rhart696/<repo-name> --public --template rhart696/true-valence-mapper-claude` *(or manually clone and push if template unavailable).*  
2. `git clone git@github.com:rhart696/<repo-name>.git` inside the parent `true-valence-mapper/versions` directory.
3. Update the edition-specific README to explain goals, orchestrator, and divergence plan.
4. Add the repo as a submodule in the parent:  
   `git submodule add git@github.com:rhart696/<repo-name>.git versions/<repo-name>`
5. Configure secrets via 1Password and reference them with `.env` files excluded from git.

### Credential Handling

- Store all GitHub Personal Access Tokens, Supabase keys, and model API keys inside 1Password vaults.
- Reference them locally via `op item get` CLI commands or manual copy when running `gh` commands.
- Never commit `.env`/credential files; provide `.env.example` templates per repo.

## Migration Tasks for the Current (Claude) Repository

1. Rename the repo locally to `true-valence-mapper-claude` (`git remote set-url origin git@github.com:rhart696/true-valence-mapper-claude.git` after the remote is created).
2. Update documentation (done in this commit) to use the new full/short names and note the Claude edition.
3. Copy this repository into the parent `true-valence-mapper/versions` directory once the parent repo is created.
4. Register the repo as a submodule in the parent for traceable cross-version comparisons.

## Coordination & Governance

- Maintain a change log in the parent repo to capture learnings from each agent edition.
- Schedule periodic syncs (weekly) to evaluate whether features from experimental editions should graduate into the canonical build.
- Use GitHub Projects in the parent repo to coordinate cross-version tasks, labeling issues by edition.

## GitHub Actions Automation (Preferred for Repo Creation)

To provision the parent + child repositories without leaving VS Code:

1. **Create a PAT**:  
   - In GitHub, generate a classic Personal Access Token with `repo`, `public_repo`, and `read:org` scopes.  
   - Store it securely in 1Password (e.g., `tv-mapper-github-pat`).  
   - From your terminal, pull it when needed via `op read "op://Vault/tv-mapper-github-pat/password"`.
2. **Add the PAT as a GitHub Secret**:  
   - In this repo’s Settings → Secrets and variables → Actions, create `GH_CLI_TOKEN` with the PAT value.  
   - No plaintext storage—always copy via `op read ... | pbcopy`.
3. **Trigger the workflow**:  
   - Go to GitHub → Actions → “Setup Multi-Agent Repositories” workflow.  
   - Hit “Run workflow”, type `YES` in the confirmation box, and submit.  
   - The job runs `scripts/setup-multi-agent-repos.sh`, which uses `gh` to create the parent repo plus Claude, Codex, Multi Path, Gemini, BMAD-Method, Stitch, and Speckit repositories if they don’t already exist.
4. **Verify in GitHub**:  
   - Each repo will appear under `github.com/rhart696/`.  
   - Rename this repo to `true-valence-mapper-claude` (GitHub → Settings → General) so the template name matches the workflow assumptions.

> **Note:** The workflow is idempotent; re-running it skips repos that already exist.

## Next Operational Steps

1. Create the parent `true-valence-mapper` repository and commit this plan plus shared docs.
2. Rename/push the current repo as `true-valence-mapper-claude`.
3. Spin up the Codex edition next (prioritize since Codex agent is active), followed by Multi Path and Gemini.
4. Once each repo exists, add them as submodules in the parent and publish a comparison dashboard (GitHub Pages or simple README table).
5. Track deployment URLs per edition for A/B testing and validation.
