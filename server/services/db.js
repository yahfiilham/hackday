const Pool = require('pg').Pool;

const dbHost = process.env.POSTGRES_HOST || 'localhost';
const dbUser = process.env.POSTGRES_USER || 'postgres';
const dbDatabase = process.env.POSTGRES_DATABASE || 'simple_media_social';
const dbPassword = process.env.POSTGRES_PASSWORD || 'ancol700';
const dbPort = process.env.POSTGRES_PORT || '5432';

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbDatabase,
  password: dbPassword,
  port: dbPort,
});

module.exports = pool;
