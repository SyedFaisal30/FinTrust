import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { withdrawAmount, getUserBalance } from "../../models/accounts.model.js";

export const withdrawMoney = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const userId = req.user?.id;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json(new ApiError(400, false,"Invalid withdrawal amount"));
    }

  const balance = await getUserBalance(userId);

  if (balance <= 0) {
    return res.status(400).json(new ApiError(400, false,"Your account balance is ₹0. Please deposit funds first."));
  }

  if (amount > balance) {
    return res.status(400).json(new ApiError(400, false,"Insufficient funds to withdraw this amount"));
  }

  const withdrawId = await withdrawAmount(userId, amount);

  return res.status(200).json(
    new ApiResponse(
      200,
      { id: withdrawId, amount },
      "Withdrawal successful"
    )
  );
});
