const ambiensaConfig = require('../config/ambiensadb.postgresql.config');
const fiscalizacionConfig = require('../config/fiscalizaciondb.postgresql.config');

const { Pool } = require("pg");

const ambiensaPool = new Pool({
  user: ambiensaConfig.USER,
  host: ambiensaConfig.HOST,
  database: ambiensaConfig.DB,
  password: ambiensaConfig.PASSWORD,
  port: ambiensaConfig.PORT
});

const fiscalizacionPool = new Pool({
  user: fiscalizacionConfig.USER,
  host: fiscalizacionConfig.HOST,
  database: fiscalizacionConfig.DB,
  password: fiscalizacionConfig.PASSWORD,
  port: fiscalizacionConfig.PORT
});

module.exports = {
  ambiensaPool,
  fiscalizacionPool
};