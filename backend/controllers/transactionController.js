const Transaction = require("../models/Transaction");


// GET USER TRANSACTIONS

const getTransactions = async(req,res)=>{

    try{

        const userId = req.user.id;


        const transactions = await Transaction.find({
            user:userId
        })
        .sort({
            createdAt:-1
        });



        res.status(200).json({

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

    getTransactions

};