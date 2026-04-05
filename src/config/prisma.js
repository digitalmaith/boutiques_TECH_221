import { PrismaClient } from "@prisma/client";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const { PrismaPg } = await import("prisma/adapter-pg");
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;