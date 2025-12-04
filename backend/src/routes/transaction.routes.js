import { Router } from "express";
import { addTransaction, getAllTransactions, getDashboardData, updateTransaction, deleteTransaction } from "../controller/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(verifyJWT, addTransaction);
router.route("/get-all").get(verifyJWT, getAllTransactions);

router.route("/dashboard").get(verifyJWT, getDashboardData);

router.route("/:id")
    .put(verifyJWT, updateTransaction)
    .delete(verifyJWT, deleteTransaction);

export default router;