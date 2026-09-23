# paroose.dev

Personal website of Pascal Roose: resume, portfolio and blog. For now it's a "Coming soon" page in English (`/`) and Dutch (`/nl/`).

Built with [Astro](https://astro.build), deployed to GitHub Pages at <https://paroose.dev>. The stack and why it was chosen are in [`docs/adr/`](docs/adr/).

## Development

Requires Node 24 (`.nvmrc`) and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm test       # Vitest, fails under 80% coverage
pnpm lint       # Biome (pnpm format to fix)
pnpm check      # astro check (types)
pnpm build      # static output in dist/
```

A devcontainer (`.devcontainer/`) sets all of this up in VS Code or Codespaces. `pnpm install` also enables a pre-commit hook (`.githooks/pre-commit`) running lint, check and test; skip it in a pinch with `git commit --no-verify`.

## Deployment

Every push to `main` runs CI and deploys via GitHub Actions. One-time setup: Settings → Pages → Source "GitHub Actions", custom domain `paroose.dev` with HTTPS enforced, and DNS pointing at GitHub Pages. See [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
