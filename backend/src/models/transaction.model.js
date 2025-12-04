import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxLength: 50
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            maxLength: 20,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: ["income", "expense"] // මේ වචන දෙක විතරයි පිළිගන්නේ (Validation)
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true,
            maxLength: 100
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);