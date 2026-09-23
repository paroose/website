# 0002. Devcontainer and pre-commit hook

- Status: accepted
- Date: 2026-09-23

## Context

A new machine or contributor should be productive without installing Node or pnpm by hand, and broken commits shouldn't reach CI.

## Decision

- **Devcontainer** (`.devcontainer/devcontainer.json`): the Microsoft Node 24 image, pnpm via Corepack (version pinned by `packageManager`), `pnpm install` on create, port 4321 forwarded, Astro and Biome editor extensions.
- **Pre-commit hook** (`.githooks/pre-commit`): runs `pnpm lint && pnpm check && pnpm test`, the same checks as CI minus the build. The `prepare` script sets `core.hooksPath` to `.githooks`, so `pnpm install` activates it.

## Considered options

- **Husky, lefthook or simple-git-hooks.** Extra dependency for a hook that is three commands. Rejected.
- **Staged-files-only checks (lint-staged, `biome check --staged`).** Faster on big repos, but the whole suite runs in seconds here. Rejected until it doesn't.
- **A devcontainer Node feature instead of the image.** More flexible versions, slower builds. Rejected.

## Consequences

- Commits take a few seconds longer. `git commit --no-verify` skips the hook; CI still enforces everything.
- Hook setup depends on `pnpm install` having run. A clone that never installed has no hook.
- `astro dev` binds to localhost; use `pnpm dev --host` if something other than the editor's port forwarding needs to reach it.
