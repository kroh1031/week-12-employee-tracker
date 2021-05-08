const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USERNAME,

  // Be sure to update with your own MySQL password!
  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE,
});

module.exports = connection;
