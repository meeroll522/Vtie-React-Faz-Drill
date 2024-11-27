import pkg from 'pg';
const { Client } = pkg; // Extract Client from the default export

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'fazdrill',
  password: 'ftsb@123',
  port: 5432,
});

client.connect();

const getCountries = async () => {
  const res = await client.query('SELECT * FROM tbl_country');
  return res.rows;
};

const getFieldsByCountry = async (countryId) => {
  const res = await client.query('SELECT * FROM tbl_field WHERE country_id = $1', [countryId]);
  return res.rows;
};

const getSitesByField = async (fieldId) => {
  const res = await client.query('SELECT * FROM tbl_site WHERE field_id = $1', [fieldId]);
  return res.rows;
};

export { getCountries, getFieldsByCountry, getSitesByField, client };
