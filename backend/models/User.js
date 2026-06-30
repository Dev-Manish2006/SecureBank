const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({



    // User Name

    name: {

        type:String,

        required:true,

        trim:true

    },





    // Email

    email: {

        type:String,

        required:true,

        unique:true,

        lowercase:true,

        trim:true,

        index:true

    },





    // Password

    password: {

        type:String,

        required:true

    },





    // Role Based Access

    role:{


        type:String,


        enum:[

            "customer",

            "admin"

        ],


        default:"customer"


    },





    // Account Block Status

    isBlocked:{


        type:Boolean,


        default:false


    },







    // Forgot Password Token

    resetPasswordToken:{


        type:String,


        default:null


    },







    // Token Expiry

    resetPasswordExpire:{


        type:Date,


        default:null


    }






},



{


    timestamps:true


});






module.exports = mongoose.model(

    "User",

    userSchema

);