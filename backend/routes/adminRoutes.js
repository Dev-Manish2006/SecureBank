const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ==========================
// CONTROLLERS
// ==========================

const {

    getAllUsers,

    getAllAccounts,

    getAllTransactions,

    blockUser,

    unblockUser,

    getDashboardStats

} = require("../controllers/adminController");







// ==========================
// ADMIN DASHBOARD STATS
// ==========================

router.get(

    "/stats",

    protect,

    adminMiddleware,

    getDashboardStats

);








// ==========================
// GET ALL USERS
// ==========================

router.get(

    "/users",

    protect,

    adminMiddleware,

    getAllUsers

);








// ==========================
// GET ALL ACCOUNTS
// ==========================

router.get(

    "/accounts",

    protect,

    adminMiddleware,

    getAllAccounts

);








// ==========================
// GET ALL TRANSACTIONS
// ==========================

router.get(

    "/transactions",

    protect,

    adminMiddleware,

    getAllTransactions

);








// ==========================
// BLOCK USER
// ==========================

router.put(

    "/block/:id",

    protect,

    adminMiddleware,

    blockUser

);








// ==========================
// UNBLOCK USER
// ==========================

router.put(

    "/unblock/:id",

    protect,

    adminMiddleware,

    unblockUser

);








module.exports = router;