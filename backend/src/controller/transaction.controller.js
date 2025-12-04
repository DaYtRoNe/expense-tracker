import { Transaction } from "../models/transaction.model.js";

const addTransaction = async (req, res) => {
    try {
        const { title, amount, type, category, date, description } = req.body;

        if (!title || !amount || !type || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const transaction = await Transaction.create({
            userId: req.user._id,
            title,
            amount,
            type,
            category,
            date: date || Date.now(),
            description
        });

        return res.status(201).json({
            message: "Transaction added successfully",
            transaction
        });

    } catch (error) {
        console.log("Error in addTransaction:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export { addTransaction };