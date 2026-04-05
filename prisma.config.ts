import path from 'node:path';
import { defineConfig } from 'prisma/config';
import pg from 'pg';

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  migrate: {
    adapter: async () => {
      const { PrismaPg } = await import('prisma/adapter-pg');
      const { Pool } = pg;
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      return new PrismaPg(pool);
    },
  },
});