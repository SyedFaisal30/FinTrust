import { getConnection } from "../utils/dbConnect.js";

export const findUserByEmail = async (email) => {
  const pool = getConnection();
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

export const findUserById = async (id) => {
  const pool = getConnection();
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const createUser = async (name, email, password, role = "customer") => {
  const pool = getConnection();
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
  return result.insertId;
};

export const getAllCustomers = async () => {
  const pool = getConnection();
  const [rows] = await pool.query(
    "SELECT id, name, email FROM users WHERE role = 'customer'"
  );
  return rows;
};
