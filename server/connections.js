import mysql from "mysql2";

/**
 *
 * @author Giovanni Leo
 */
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connection = pool.promise();

pool.getConnection((error, conn) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }

  console.log("Connection established with MySQL");
  conn.release();
});

setInterval(() => {
  pool.query("SELECT 1", (err) => {
    if (err) {
      console.error("Ping to database failed:", err);
    } else {
      console.log("Database connection is active.");
    }
  });
}, 60000);

export default connection;
