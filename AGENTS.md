# Agent instructions

Personal website (resume, portfolio, blog) for Pascal Roose: Astro 7, TypeScript strict, pnpm, plain CSS, Biome, Vitest. Static site on GitHub Pages at paroose.dev. Stack rationale: `docs/adr/0001-tech-stack.md`.

## Commands

- `pnpm dev`, `pnpm build`
- `pnpm lint` (Biome; `pnpm format` fixes), `pnpm check` (types), `pnpm test` (coverage must stay ≥ 80%)
- Run lint, check, test and build before finishing a change; CI runs the same, and the pre-commit hook (`.githooks/`, enabled by `pnpm install`) runs lint, check and test. Never bypass it with `--no-verify`; fix the failure.

## Conventions

- Keep it small: no new dependency, abstraction or config without a clear need.
- Every page exists in English (`src/pages/`, `/`) and Dutch (`src/pages/nl/`). Copy lives in `src/i18n.ts`; write Dutch natively ("je/jij"), don't translate word for word.
- Only pages go in `src/pages/`: anything there becomes a route, including test files.
- Tests live next to the code (`src/*.test.ts`). New logic needs tests; the 80% threshold is in `vitest.config.ts`.
- Record significant architecture or tooling decisions as a new ADR in `docs/adr/`. Don't edit accepted ADRs; supersede them.

## Design system

Styling and voice follow Pascal's design system: <https://claude.ai/artifact/Hvxh5hGnppo6vs3Sqh3Jbi>. Read its `project/README.md` first and use its tokens (`project/tokens.json`); don't invent colours, sizes or copy style. Tokens are mirrored as CSS variables in `src/styles/global.css`. Dark theme is the default, light follows `prefers-color-scheme`.
