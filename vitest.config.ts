/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		coverage: {
			provider: "v8",
			include: ["src/**/*.{ts,astro}"],
			exclude: ["src/**/*.test.ts"],
			thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
		},
	},
});
