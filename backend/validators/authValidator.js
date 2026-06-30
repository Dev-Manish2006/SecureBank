const { body } = require("express-validator");




// ==========================
// REGISTER VALIDATION
// ==========================

const registerValidation = [

    body("name")

    .notEmpty()

    .withMessage(
        "Name is required"
    ),





    body("email")

    .isEmail()

    .withMessage(
        "Valid email required"
    ),





    body("password")

    .isLength({

        min:8

    })

    .withMessage(
        "Password must be minimum 8 characters"
    )


    .matches(/[A-Z]/)

    .withMessage(
        "Password must contain one uppercase letter"
    )


    .matches(/[a-z]/)

    .withMessage(
        "Password must contain one lowercase letter"
    )


    .matches(/[0-9]/)

    .withMessage(
        "Password must contain one number"
    )


    .matches(/[@$!%*?&]/)

    .withMessage(
        "Password must contain special character"
    )


];









// ==========================
// LOGIN VALIDATION
// ==========================

const loginValidation = [


    body("email")

    .isEmail()

    .withMessage(
        "Valid email required"
    ),




    body("password")

    .notEmpty()

    .withMessage(
        "Password required"
    )


];







module.exports={


    registerValidation,

    loginValidation


};