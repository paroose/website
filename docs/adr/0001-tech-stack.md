# 0001. Tech stack

- Status: accepted
- Date: 2026-09-23

## Context

`paroose.dev` is Pascal Roose's personal website with three purposes: resume, portfolio and blog. It's a low-traffic, mostly static site maintained by one person, so the stack should stay small, cheap to host and easy to keep up to date. It follows Pascal's own design system (dark first, light second, Geist, bilingual NL/EN), and the repository needs CI, a test coverage gate of 80%, Dependabot and CodeQL.

## Decision

| Area | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build) 7, static output, zero client JS by default |
| Language | TypeScript, strict (`astro/tsconfigs/strict`) |
| Package manager | pnpm (pinned via `packageManager`) |
| Styling / UI | Plain CSS with the design-system tokens as CSS variables, Astro components |
| Content | Markdown in the repo (Astro content collections), added with the first real content |
| Lint / format | Biome |
| Tests | Vitest with v8 coverage; thresholds of 80% enforced in `vitest.config.ts`; pages rendered with the Astro Container API |
| Hosting | GitHub Pages, custom domain `paroose.dev` (`public/CNAME`) |
| CI/CD | GitHub Actions: `ci.yml` (lint, typecheck, test, build), `deploy.yml` (build and deploy on `main`) |
| Security / upkeep | CodeQL (`codeql.yml`) and Dependabot (npm and GitHub Actions, weekly) |

The 80% coverage gate lives in the code and CI, not in a service: CI fails below the threshold, and the CI check is marked as required on `main` in the repository settings.

## Considered options

- **npm instead of pnpm.** Zero setup, but pnpm is faster and stricter about undeclared dependencies. Chosen: pnpm.
- **Tailwind CSS.** Fast to write, but the design system already defines tokens and a small set of components, and the site is small. It would add a dependency and config for little gain. Rejected.
- **Astro with React islands** (reusing the design system's React components). Adds React and client JS to a mostly static site. Rejected; revisit if a page needs real interactivity.
- **MDX** for content. Only needed if posts embed components. Rejected until that's needed.
- **External CMS.** More moving parts than one author needs. Rejected.
- **Prettier, ESLint + Prettier, or no linter.** Prettier and ESLint give full `.astro` support but need more config and dependencies. Biome is one fast tool for lint and format. Chosen: Biome.
- **Codecov or another coverage service.** Not needed for one repo; Vitest thresholds fail CI on their own. Rejected for now.

## Consequences

- Biome only partially supports `.astro`: it checks the frontmatter but not the markup, and template-usage lint rules (`noUnusedImports`, `noUnusedVariables`) are turned off for `.astro` files. `astro check` covers types.
- Fonts (Geist, Geist Mono) load from Google Fonts, as the design system specifies. This is a third-party request from visitors' browsers; self-hosting via `@fontsource` would remove it.
- The theme follows the OS setting; the manual theme toggle and the nav are left out until there are sections to link to.
- Blog, portfolio and resume pages don't exist yet. Adding them starts with a content collection and probably a new ADR if the approach changes.
- GitHub Pages needs one-time repo settings: Pages source set to GitHub Actions, the custom domain and HTTPS, and DNS records at the registrar.
