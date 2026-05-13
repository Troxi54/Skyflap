import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client";
import postExtension from "./db/extensions/post";

function createPrismaClient() {
  const pool = new Pool({
    connectionString: process.env["DATABASE_URL"],
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
  }).$extends(postExtension);
}

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof createPrismaClient>;
};

const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env["NODE_ENV"] !== "production") globalForPrisma.prisma = prisma;

export default prisma;
