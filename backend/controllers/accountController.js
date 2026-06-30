const Account = require("../models/Account");
const Transaction = require("../models/Transaction");


// generate account number
const generateAccountNumber = () => {

    return "ACC" + Math.floor(
        100000000 + Math.random() * 900000000
    );

};



// ==========================
// CREATE ACCOUNT
// ==========================
const createAccount = async (req, res) => {

    try {

        const userId = req.user.id;


        const existing = await Account.findOne({
            user: userId
        });


        if (existing) {

            return res.status(400).json({
                message: "Account already exists"
            });

        }



        const account = await Account.create({

            user: userId,

            accountNumber: generateAccountNumber(),

            balance: 0

        });



        res.status(201).json({

            message: "Account created successfully",

            account

        });



    } catch(error) {


        res.status(500).json({

            message: error.message

        });


    }

};






// ==========================
// DEPOSIT MONEY
// ==========================
const depositMoney = async (req,res)=>{


    try {


        const userId = req.user.id;

        const {amount} = req.body;



        if(!amount || amount <= 0){

            return res.status(400).json({

                message:"Invalid amount"

            });

        }



        const account = await Account.findOne({

            user:userId

        });



        if(!account){

            return res.status(404).json({

                message:"Account not found"

            });

        }




        account.balance += amount;

        await account.save();





        await Transaction.create({

            user:userId,

            account:account._id,

            type:"deposit",

            amount:amount,

            balanceAfterTransaction:account.balance

        });






        res.status(200).json({

            message:"Deposit successful",

            balance:account.balance

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// ==========================
// WITHDRAW MONEY
// ==========================
const withdrawMoney = async(req,res)=>{


    try{


        const userId = req.user.id;

        const {amount}=req.body;



        if(!amount || amount<=0){


            return res.status(400).json({

                message:"Invalid amount"

            });


        }




        const account = await Account.findOne({

            user:userId

        });




        if(!account){


            return res.status(404).json({

                message:"Account not found"

            });


        }





        if(account.balance < amount){


            return res.status(400).json({

                message:"Insufficient balance"

            });


        }





        account.balance -= amount;


        await account.save();






        await Transaction.create({

            user:userId,

            account:account._id,

            type:"withdraw",

            amount:amount,

            balanceAfterTransaction:account.balance

        });






        res.status(200).json({

            message:"Withdrawal successful",

            balance:account.balance

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// ==========================
// CHECK BALANCE
// ==========================
const checkBalance = async(req,res)=>{


    try{


        const userId = req.user.id;



        const account = await Account.findOne({

            user:userId

        });




        if(!account){


            return res.status(404).json({

                message:"Account not found"

            });


        }





        res.status(200).json({

            accountNumber: account.accountNumber,

            balance: account.balance

        });




    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};
// ==========================
// TRANSFER MONEY
// ==========================
const transferMoney = async(req,res)=>{

    try{


        const userId = req.user.id;

        const {receiverAccountNumber, amount} = req.body;



        if(!receiverAccountNumber || !amount || amount <=0){

            return res.status(400).json({

                message:"Invalid details"

            });

        }



        // sender account

        const senderAccount = await Account.findOne({

            user:userId

        });



        if(!senderAccount){

            return res.status(404).json({

                message:"Sender account not found"

            });

        }




        // receiver account

        const receiverAccount = await Account.findOne({

            accountNumber:receiverAccountNumber

        });




        if(!receiverAccount){

            return res.status(404).json({

                message:"Receiver account not found"

            });

        }




        if(senderAccount.balance < amount){

            return res.status(400).json({

                message:"Insufficient balance"

            });

        }





        // deduct sender balance

        senderAccount.balance -= amount;

        await senderAccount.save();





        // add receiver balance

        receiverAccount.balance += amount;

        await receiverAccount.save();






        // sender transaction

        await Transaction.create({

            user:userId,

            account:senderAccount._id,

            type:"withdraw",

            amount:amount,

            balanceAfterTransaction:senderAccount.balance

        });






        // receiver transaction

        await Transaction.create({

            user:receiverAccount.user,

            account:receiverAccount._id,

            type:"deposit",

            amount:amount,

            balanceAfterTransaction:receiverAccount.balance

        });







        res.status(200).json({

            message:"Money transferred successfully",

            remainingBalance:senderAccount.balance

        });



    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};







module.exports = {

    createAccount,

    depositMoney,

    withdrawMoney,

    checkBalance,

    transferMoney

};
