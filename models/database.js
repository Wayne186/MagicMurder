const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgresql-slippery-33608:5432/wayne';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE users(username TEXT NOT NULL, guess BOOLEAN)');
query.on('end', () => { client.end(); });