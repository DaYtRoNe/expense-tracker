import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);

// Test Route
app.get("/", (req, res) => {
    res.send("Expense Tracker API is running...");
});

export default app;