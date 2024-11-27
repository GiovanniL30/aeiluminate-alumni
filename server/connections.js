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

pool.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }

  console.log("Connection established with MySQL");
  connection.release();
});

pool.on("error", (err) => {
  console.error("MySQL pool error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Attempting to reconnect...");
    handleReconnect();
  } else {
    throw err;
  }
});

const handleReconnect = () => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.error("Error reconnecting to MySQL:", error);
      setTimeout(handleReconnect, 2000);
    } else {
      console.log("Reconnected to MySQL");
      connection.release();
    }
  });
};

export default connection;
