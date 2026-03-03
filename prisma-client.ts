import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

// Crée une instance de PrismaClient avec le driver adapter pour PostgreSQL
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export default prisma;