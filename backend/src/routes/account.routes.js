import Router from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { depositMoney } from "../controllers/transactions/deposit.controller.js";
import { withdrawMoney } from "../controllers/transactions/withdraw.controller.js";
import { getBalanceController } from "../controllers/transactions/getBalance.controller.js";
import { getTransactionsController } from "../controllers/transactions/getTransactions.controller.js";

const accountsRouter = Router();

accountsRouter.route("/deposit").post(authMiddleware, depositMoney);

accountsRouter.route("/withdraw").post(authMiddleware, withdrawMoney);

accountsRouter.route("/balance").get(authMiddleware, getBalanceController);

accountsRouter.route("/transactions").get(authMiddleware, getTransactionsController);

export default accountsRouter