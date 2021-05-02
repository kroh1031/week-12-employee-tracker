require("dotenv").config();

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: "root",
  //process.env.DB_USERNAME

  // Be sure to update with your own MySQL password!
  password: "kroh1031",
  //process.env.DB_PASSWORD

  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected as id ${connection.threadId}`);
  connection.end();
});
