import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://zeynab:nouveaumotdepasse@127.0.0.1:5432/boutique_tech_221'
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const query = (text, params) => pool.query(text, params);

export default pool;