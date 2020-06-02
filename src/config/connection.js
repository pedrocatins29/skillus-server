import mysql from "mysql";

const connection = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  host: process.env.HOST,
});

export default connection;
