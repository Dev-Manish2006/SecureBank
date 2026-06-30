const express = require("express");

const router = express.Router();



// Controllers

const {

    registerUser,

    loginUser,

    forgotPassword,

    resetPassword,

    changePassword

} = require("../controllers/authController");




// Validation

const {

    registerValidation,

    loginValidation

} = require("../validators/authValidator");





const validate = require("../middleware/validationMiddleware");

const protect = require("../middleware/authMiddleware");







// ==========================
// REGISTER
// ==========================

router.post(

    "/register",

    registerValidation,

    validate,

    registerUser

);









// ==========================
// LOGIN
// ==========================

router.post(

    "/login",

    loginValidation,

    validate,

    loginUser

);









// ==========================
// FORGOT PASSWORD
// ==========================

router.post(

    "/forgot-password",

    forgotPassword

);









// ==========================
// RESET PASSWORD
// ==========================

router.post(

    "/reset-password",

    resetPassword

);









// ==========================
// CHANGE PASSWORD
// ==========================

router.put(

    "/change-password",

    protect,

    changePassword

);







module.exports = router;