import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let connection;

const dbConnect = async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
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
