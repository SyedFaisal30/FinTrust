import { asyncHandler } from "../../utils/asyncHandler.js";
import { getUserTransactions } from "../../models/accounts.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { findUserById } from "../../models/users.model.js";

export const getCustomerTransactionsController = asyncHandler(
  async (req, res) => {
    const { userId } = req.params;

    const user = await findUserById(userId);
    if (!user || user.role !== "customer") {
      return res
        .status(404)
        .json(new ApiError(404, false, "Customer not found"));
    }

    const transactions = await getUserTransactions(userId);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          transactions,
        },
        "Transaction history fetched"
      )
    );
  }
);
