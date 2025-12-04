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

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });

        return res.status(200).json({
            message: "Transactions fetched successfully",
            count: transactions.length,
            transactions
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getDashboardData = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            } else {
                totalExpense += transaction.amount;
            }
        });

        const balance = totalIncome - totalExpense;

        return res.status(200).json({
            totalIncome,
            totalExpense,
            balance,
            transactionCount: transactions.length
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export { addTransaction, getAllTransactions, getDashboardData };