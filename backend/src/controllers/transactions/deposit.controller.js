import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { depositAmount } from "../../models/accounts.model.js";

export const depositMoney = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const userId = req.user?.id;

  if (!amount || amount <= 0) {
    return res.status(400).json(new ApiError(400, "Invalid amount"));
  }

  const depositId = await depositAmount(userId, amount);

  return res.status(200).json(new ApiResponse(200, {
    id: depositId,
    amount
  }, "Deposit successful"));
});
