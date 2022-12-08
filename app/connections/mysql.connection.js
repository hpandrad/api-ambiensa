const config = require('../config/mysql.db.config');
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  user: config.USER,
  host: config.HOST,
  database: config.DB,
  password: config.PASSWORD,
  port: config.PORT,
  multipleStatements: true
});

pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});

module.exports = pool;