import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let connection;

const dbConnect = async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "127.0.0.1",
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "bank",
      connectTimeout: 10000,
    });

    console.log("✅ MySQL Connected Successfully");
    return connection;
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error.message);
    throw error;
  }
};

export default dbConnect;
export { connection };
