import pkg from 'pg';
const { Pool } = pkg;  // Destructure the `Pool` from the default export

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fazdrill',
  password: 'ftsb@123',
  port: 5432,  // Default PostgreSQL port
});

export default pool;
