import { connection } from "../utils/dbConnect.js";

export const insertVerification = async ({ name, email, password, code, role, expiresAt }) => {
  await connection.query(
    `INSERT INTO verifications (name, email, password, code, role, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, password, code, role, expiresAt]
  );
};

export const findVerificationByEmail = async (email) => {
  const [rows] = await connection.query(
    `SELECT * FROM verifications WHERE email = ?`,
    [email]
  );
  return rows[0];
};

export const deleteVerificationByEmail = async (email) => {
  await connection.query(`DELETE FROM verifications WHERE email = ?`, [email]);
};

export const cleanupExpiredVerifications = async () => {
  await connection.query(`DELETE FROM verifications WHERE expires_at < NOW()`);
};
