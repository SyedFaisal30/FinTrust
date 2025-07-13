import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let pool;

const dbConnect = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "bank",
      waitForConnections: true,
      connectionLimit: 10,   
      queueLimit: 0,        
      connectTimeout: 10000,
    });

    console.log("✅ MySQL connection pool created successfully");
  } catch (error) {
    console.error("❌ Failed to create MySQL connection pool:", error.message);
    throw error;
  }
};

const getConnection = () => {
  if (!pool) {
    throw new Error("❌ MySQL pool not initialized. Call dbConnect() first.");
  }
  return pool;
};

export { dbConnect, getConnection };
