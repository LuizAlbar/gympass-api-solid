import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths({ root: "./" })],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		projects: [
			{
				plugins: [tsconfigPaths({ root: "./" })],
				resolve: {
					alias: {
						"@": path.resolve(__dirname, "./src"),
					},
				},
				test: {
					name: "unit",
					include: ["src/**/*.spec.ts"],
					environment: "node",
				},
			},
			{
				plugins: [tsconfigPaths({ root: "./" })],
				resolve: {
					alias: {
						"@": path.resolve(__dirname, "./src"),
					},
				},
				test: {
					name: "e2e",
					include: ["src/http/controllers/**/*.test.ts"],
					environment:
						"./prisma/vitest-environment-prisma/prisma-test-environment.ts",
				},
			},
		],
	},
});
