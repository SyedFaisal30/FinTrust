import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { getUserTransactions } from "../../models/accounts.model.js";

export const getTransactionsController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const transactions = await getUserTransactions(userId);

  return res.status(200).json(new ApiResponse(200, transactions, "Transactions retrieved"));
});
