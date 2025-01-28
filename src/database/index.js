const mysql = require('mysql');
const { Config } = require('../config/index');
const debug = require("debug")("app:module-database");

//crear conexion a la bdd
const connection = mysql.createConnection({
  host: Config.mysqlHost,
  user: Config.mysqlUser,
  password: Config.mysqlPassword,
  database: Config.mysqlDatabase
});

connection.connect((err) => {
  if (err) {
    debug('Error connecting to MySQL:', err);
    return;
  }
  debug('Connected to MySQL');
});

module.exports = connection;
