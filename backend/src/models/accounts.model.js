import { connection } from "../utils/dbConnect.js";

export const depositAmount = async (userId, amount) => {
  const [result] = await connection.query(
    "INSERT INTO accounts (user_id, type, amount) VALUES (?, 'deposit', ?)",
    [userId, amount]
  );
  return result.insertId;
};

export const withdrawAmount = async (userId, amount) => {
  const balance = await getUserBalance(userId);

  if (balance <= 0) {
    throw new Error("Your account balance is ₹0. Please deposit funds before withdrawing.");
  }

  if (amount > balance) {
    throw new Error("Insufficient funds to complete this withdrawal.");
  }

  const [result] = await connection.query(
    "INSERT INTO accounts (user_id, type, amount) VALUES (?, 'withdraw', ?)",
    [userId, amount]
  );

  return result.insertId;
};


export const getUserBalance = async (userId) => {
  const [rows] = await connection.query(
    `SELECT
      SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) -
      SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END) AS balance
     FROM accounts WHERE user_id = ?`,
    [userId]
  );
  return rows[0].balance || 0;
};

export const getUserTransactions = async (userId) => {
  const [rows] = await connection.query(
    "SELECT * FROM accounts WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};
