const adminMiddleware = (req, res, next) => {

    try {


        // Check authentication

        if (!req.user) {

            return res.status(401).json({

                message: "User not authenticated"

            });

        }





        // Check admin role

        if (req.user.role !== "admin") {

            return res.status(403).json({

                message: "Admin access only"

            });

        }





        // Allow request

        next();



    }

    catch(error) {


        return res.status(500).json({

            message: error.message

        });


    }

};



module.exports = adminMiddleware;