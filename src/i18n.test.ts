import { expect, test } from "vitest";
import { copy, langs, pathFor } from "./i18n";

test("every language has the same non-empty copy", () => {
	const keys = Object.keys(copy.en).sort();
	for (const lang of langs) {
		expect(Object.keys(copy[lang]).sort()).toEqual(keys);
		for (const value of Object.values(copy[lang])) expect(value).not.toBe("");
	}
});

test("pathFor maps English to the root and others to a prefix", () => {
	expect(pathFor("en")).toBe("/");
	expect(pathFor("nl")).toBe("/nl/");
});
