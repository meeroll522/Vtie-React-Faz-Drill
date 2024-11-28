import pkg from 'pg';
const { Client } = pkg; // Extract Client from the default export

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'fazdrill',
  password: 'ftsb@123',
  port: 5432,
});
export { getCountries, getFieldsByCountry, getSitesByField, client };
