import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "@prisma/client";
import env from "./env.js";

const { PrismaClient } = pkg;
const adapter = new PrismaPg({ connectionString: env.databaseUrl });
const prisma = new PrismaClient({ adapter });

export default prisma;
