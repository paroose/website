export const langs = ["en", "nl"] as const;
export type Lang = (typeof langs)[number];

export const copy = {
	en: {
		title: "Pascal Roose — Coming soon",
		headline: "Coming soon",
		lead: "I'm building a place for my resume, portfolio and blog. Check back shortly.",
	},
	nl: {
		title: "Pascal Roose — Binnenkort",
		headline: "Binnenkort",
		lead: "Ik bouw een plek voor mijn cv, portfolio en blog. Kom straks nog eens kijken.",
	},
} satisfies Record<Lang, Record<string, string>>;

export const pathFor = (lang: Lang) => (lang === "en" ? "/" : `/${lang}/`);
