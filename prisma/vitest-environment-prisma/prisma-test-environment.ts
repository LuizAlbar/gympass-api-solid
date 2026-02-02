import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import type { Environment } from "vitest/environments";
import { env } from "@/env/index.ts";

const prisma = new PrismaClient();

function generateDatabaseUrl(schema: string) {
	const url = new URL(env.DATABASE_URL);

	url.searchParams.set("schema", schema);
	return url.toString();
}

export default (<Environment>{
	name: "prisma",
	viteEnvironment: "ssr",
	async setup() {
		const schema = randomUUID().replace(/-/g, "_");
		const databaseUrl = generateDatabaseUrl(schema);

		process.env.DATABASE_URL = databaseUrl;

		execSync("pnpm dlx prisma migrate deploy", { stdio: "inherit" });

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
				);

				await prisma.$disconnect();
			},
		};
	},
});
