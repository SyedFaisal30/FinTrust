import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { withdrawAmount } from "../../models/accounts.model.js";

export const withdrawMoney = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const userId = req.user?.id;

  if (!amount || amount <= 0) {
    return res.status(400).json(new ApiError(400, "Invalid amount"));
  }

  const withdrawId = await withdrawAmount(userId, amount);
  return res.status(200).json(new ApiResponse(200, {
    id: withdrawId,
    amount
}, "Withdrawal successful"));
  
});
