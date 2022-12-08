const config = require('../config/postgresql.db.config');

const { Pool } = require("pg");

const pool = new Pool({
  user: config.USER,
  host: config.HOST,
  database: config.DB,
  password: config.PASSWORD,
  port: config.PORT
});

module.exports = pool;