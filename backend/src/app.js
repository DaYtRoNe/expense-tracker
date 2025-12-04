import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import transactionRouter from "./routes/transaction.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);

// Test Route
app.get("/", (req, res) => {
    res.send("Expense Tracker API is running...");
});

export default app;