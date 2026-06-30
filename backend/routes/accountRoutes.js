const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");


const {
    createAccount,
    depositMoney,
    withdrawMoney,
    checkBalance,
    transferMoney
} = require("../controllers/accountController");



// ==========================
// CREATE ACCOUNT
// ==========================
router.post(
    "/create",
    protect,
    createAccount
);



// ==========================
// DEPOSIT MONEY
// ==========================
router.post(
    "/deposit",
    protect,
    depositMoney
);



// ==========================
// WITHDRAW MONEY
// ==========================
router.post(
    "/withdraw",
    protect,
    withdrawMoney
);



// ==========================
// CHECK BALANCE
// ==========================
router.get(
    "/balance",
    protect,
    checkBalance
);



// ==========================
// TRANSFER MONEY
// ==========================
router.post(
    "/transfer",
    protect,
    transferMoney
);



module.exports = router;