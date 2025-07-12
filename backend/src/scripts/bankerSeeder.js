import bcrypt from "bcryptjs";
import dbConnect from "../utils/dbConnect.js";

const createBanker = async () => {
  const name = "Abdul Rahman";
  const email = "faisalzulfequar30@gmail.com";
  const password = "123456";
  const role = "banker";

  try {
    const connection = await dbConnect(); 

    const [existing] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      console.log("🚫 Banker already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    console.log("✅ Banker created with ID:", result.insertId);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create banker:", err.message);
    process.exit(1);
  }
};

createBanker();
