import mysql from "mysql2";

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

const handleReconnect = () => {
  console.log("Attempting to reconnect...");
  pool.getConnection((error, newConnection) => {
    if (error) {
      console.error("Error reconnecting to MySQL:", error);
      setTimeout(handleReconnect, 2000);
    } else {
      console.log("Reconnected to MySQL");
      newConnection.release();
    }
  });
};

pool.getConnection((error, conn) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }

  console.log("Connection established with MySQL");
  conn.release();
});

pool.on("error", (err) => {
  console.error("MySQL pool error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNRESET") {
    console.log("Connection lost, attempting to reconnect...");
    handleReconnect();
  } else {
    console.error("MySQL error:", err);
    throw err;
  }
});

export default connection;
