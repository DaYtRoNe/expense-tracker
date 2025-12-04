import { Router } from "express";
import { addTransaction } from "../controller/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(verifyJWT, addTransaction);

export default router;