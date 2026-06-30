const express = require("express");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const helmet = require("helmet");

const cors = require("cors");

const rateLimit = require("express-rate-limit");



dotenv.config();



const app = express();




// ==========================
// SECURITY MIDDLEWARE
// ==========================


app.use(helmet());



app.use(
    cors({

        origin:"http://localhost:5173",

        credentials:true

    })
);





// JSON BODY LIMIT

app.use(
    express.json({

        limit:"10kb"

    })
);








// RATE LIMIT


const limiter = rateLimit({

    windowMs:15 * 60 * 1000,

    max:100,

    message:{

        message:"Too many requests, please try later"

    }

});



app.use(limiter);









// ==========================
// ROUTES
// ==========================



app.use(

    "/api/auth",

    require("./routes/authRoutes")

);





app.use(

    "/api/user",

    require("./routes/userRoutes")

);





app.use(

    "/api/account",

    require("./routes/accountRoutes")

);





app.use(

    "/api/transactions",

    require("./routes/transactionRoutes")

);





app.use(

    "/api/admin",

    require("./routes/adminRoutes")

);









// ==========================
// DEFAULT ROUTE
// ==========================


app.get("/",(req,res)=>{


    res.json({

        message:"SecureBank API Running"

    });


});









// ==========================
// 404 HANDLER
// ==========================


app.use((req,res)=>{


    res.status(404).json({

        message:"API route not found"

    });


});









// ==========================
// GLOBAL ERROR HANDLER
// ==========================


app.use((err,req,res,next)=>{


    console.error(err.stack);



    res.status(500).json({

        message:"Internal Server Error"

    });



});









// ==========================
// DATABASE CONNECTION
// ==========================


mongoose.connect(

    process.env.MONGO_URI

)


.then(()=>{


    console.log(
        "MongoDB Connected"
    );



    const PORT =
    process.env.PORT || 5000;




    app.listen(PORT,()=>{


        console.log(

            `Server running on port ${PORT}`

        );


    });



})


.catch((error)=>{


    console.log(

        "MongoDB Connection Error:",

        error.message

    );


});