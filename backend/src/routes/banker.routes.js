import Router from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/roles.middleware.js";
import { getAllCustomersController } from "../controllers/banker/getAllCustomers.controller.js";
import { getCustomerTransactionsController } from "../controllers/banker/getCustomerTransactions.controller.js";

const bankerRouter = Router();

bankerRouter
.route("/customers")
.get(authMiddleware, roleMiddleware("banker"), getAllCustomersController);

bankerRouter
  .route("/customers/:userId/transactions")
  .get(authMiddleware, roleMiddleware("banker"), getCustomerTransactionsController);

export default bankerRouter;
