const validate = (req,res,next)=>{


    const errors = req.validationErrors;



    if(errors){


        return res.status(400).json({

            message:"Validation failed",

            errors

        });


    }



    next();


};



module.exports = validate;