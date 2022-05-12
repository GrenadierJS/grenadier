import { defineConfig } from "astro/config";
import critters from "astro-critters";
import compress from "astro-compress";

export default defineConfig({
	site: "https://grenadier.dev",
	experimental: {
		integrations: true,
	},
	integrations: [
		critters({
			preload: "body",
			inlineFonts: true,
		}),
		compress(),
	],
});
