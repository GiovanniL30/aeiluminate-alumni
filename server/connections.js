import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
});

connection.connect((error) => {
  if (error) return console.log(error);
  else console.log("Connection created with mysql");
});

export default connection;
