const jwt = require("jsonwebtoken");
const User = require("../models/User");



const protect = async(req,res,next)=>{


    try{


        let token;



        // Get token from Header

        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ){

            token =
            req.headers.authorization.split(" ")[1];

        }





        if(!token){


            return res.status(401).json({

                message:"Not authorized, no token"

            });


        }







        // Verify JWT

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );







        // Find User

        const user = await User.findById(

            decoded.id

        ).select("-password");







        if(!user){


            return res.status(401).json({

                message:"User not found"

            });


        }








        // Block Check

        if(user.isBlocked){


            return res.status(403).json({

                message:"Your account is blocked"

            });


        }







        req.user = user;



        next();




    }
    catch(error){



        return res.status(401).json({

            message:"Token invalid or expired"

        });



    }


};





module.exports = protect;