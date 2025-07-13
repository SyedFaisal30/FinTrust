import { getConnection } from "../utils/dbConnect.js";

export const insertVerification = async ({ name, email, password, code, role, expiresAt }) => {
  const pool = getConnection();
  await pool.query(
    `INSERT INTO verifications (name, email, password, code, role, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, password, code, role, expiresAt]
  );
};

export const findVerificationByEmail = async (email) => {
  const pool = getConnection();
  const [rows] = await pool.query(
    `SELECT * FROM verifications WHERE email = ?`,
    [email]
  );
  return rows[0];
};

export const deleteVerificationByEmail = async (email) => {
  const pool = getConnection();
  await pool.query(`DELETE FROM verifications WHERE email = ?`, [email]);
};

export const cleanupExpiredVerifications = async () => {
  const pool = getConnection();
  await pool.query(`DELETE FROM verifications WHERE expires_at < NOW()`);
};
