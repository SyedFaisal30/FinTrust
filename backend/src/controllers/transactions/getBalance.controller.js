import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { getUserBalance } from "../../models/accounts.model.js";

export const getBalanceController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const balance = await getUserBalance(userId);

  return res.status(200).json(new ApiResponse(200, {
    balance
  }, "Balance fetched"));
});
