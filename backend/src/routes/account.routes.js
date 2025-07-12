import Router from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/roles.middleware.js";
import { depositMoney } from "../controllers/transactions/deposit.controller.js";
import { withdrawMoney } from "../controllers/transactions/withdraw.controller.js";
import { getBalanceController } from "../controllers/transactions/getBalance.controller.js";
import { getTransactionsController } from "../controllers/transactions/getTransactions.controller.js";

const accountsRouter = Router();

accountsRouter.route("/deposit").post(authMiddleware, roleMiddleware("customer"), depositMoney);

accountsRouter.route("/withdraw").post(authMiddleware, roleMiddleware("customer"), withdrawMoney);

accountsRouter.route("/balance").get(authMiddleware, roleMiddleware("customer"), getBalanceController);

accountsRouter.route("/transactions").get(authMiddleware, roleMiddleware("customer"), getTransactionsController);

export default accountsRouter