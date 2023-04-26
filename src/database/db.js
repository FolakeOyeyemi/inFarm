const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
});

pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {

  // console.log("The solution is: ", results[0].solution);
  console.log("Database connected successfully 🚀🚀");
})
// let sql = 'SELECT * FROM farm_users';

module.exports = pool.promise();
