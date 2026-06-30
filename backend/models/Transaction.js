const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },

    type: {
        type: String,
        enum: ["deposit", "withdraw"],
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    balanceAfterTransaction: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});


module.exports = mongoose.model(
    "Transaction",
    transactionSchema
);