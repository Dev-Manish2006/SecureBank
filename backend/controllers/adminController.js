const User = require("../models/User");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");




// ==========================
// GET ALL USERS
// ==========================
const getAllUsers = async (req, res) => {

    try {


        const users = await User
            .find()
            .select("-password");


        res.status(200).json({

            count: users.length,

            users

        });



    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};








// ==========================
// GET ALL ACCOUNTS
// ==========================
const getAllAccounts = async(req,res)=>{


    try{


        const accounts = await Account
            .find()
            .populate(
                "user",
                "name email"
            );



        res.status(200).json({

            count:accounts.length,

            accounts

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









// ==========================
// GET ALL TRANSACTIONS
// ==========================
const getAllTransactions = async(req,res)=>{


    try{


        const transactions = await Transaction
            .find()
            .populate(
                "user",
                "name email"
            )
            .populate(
                "account",
                "accountNumber"
            );



        res.status(200).json({

            count:transactions.length,

            transactions

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









// ==========================
// BLOCK USER
// ==========================
const blockUser = async(req,res)=>{


    try{


        const user = await User.findById(
            req.params.id
        );



        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }



        user.isBlocked = true;


        await user.save();



        res.status(200).json({

            message:"User blocked successfully"

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









// ==========================
// UNBLOCK USER
// ==========================
const unblockUser = async(req,res)=>{


    try{


        const user = await User.findById(
            req.params.id
        );



        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }



        user.isBlocked = false;


        await user.save();



        res.status(200).json({

            message:"User unblocked successfully"

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









// ==========================
// ADMIN DASHBOARD STATS
// ==========================
const getDashboardStats = async(req,res)=>{


    try{


        const users = await User.countDocuments();


        const accounts = await Account.countDocuments();


        const transactions = await Transaction.countDocuments();




        res.status(200).json({

            users,

            accounts,

            transactions

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








module.exports = {


    getAllUsers,

    getAllAccounts,

    getAllTransactions,

    blockUser,

    unblockUser,

    getDashboardStats


};