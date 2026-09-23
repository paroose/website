import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import en from "./pages/index.astro";
import nl from "./pages/nl/index.astro";

test.each([
	["en", en, "Coming soon", "Binnenkort"],
	["nl", nl, "Binnenkort", "Coming soon"],
] as const)(
	"%s page renders its headline and language switch",
	async (lang, page, headline, other) => {
		const html = await (await AstroContainer.create()).renderToString(page);
		expect(html).toContain(`<html lang="${lang}">`);
		expect(html).toContain(headline);
		expect(html).not.toContain(other);
		expect(html).toContain('aria-current="true"');
		expect(html).toContain('href="/nl/"');
	},
);
