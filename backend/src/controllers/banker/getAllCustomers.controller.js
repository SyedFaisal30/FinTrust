import { asyncHandler } from "../../utils/asyncHandler.js";
import { getAllCustomers } from "../../models/users.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export const getAllCustomersController = asyncHandler(async (req, res) => {
  console.log("✅ /api/banker/customers route hit");
  const customers = await getAllCustomers();
  return res
    .status(200)
    .json(new ApiResponse(200, customers, "Fetched all customers"));
});
