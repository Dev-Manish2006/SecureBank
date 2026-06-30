const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();


// ==========================
// 🔥 IMPORTANT FIX FOR RENDER
// ==========================
app.set('trust proxy', 1);


// ==========================
// SECURITY MIDDLEWARE
// ==========================

app.use(helmet());


// ==========================
// CORS (PRODUCTION SAFE)
// ==========================

app.use(
    cors({
        origin: "*",   // change later to frontend URL for strict security
        credentials: true
    })
);


// ==========================
// BODY PARSER
// ==========================

app.use(express.json({ limit: "10kb" }));


// ==========================
// RATE LIMIT (FIXED FOR PROXY)
// ==========================

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try later" }
});

app.use(limiter);


// ==========================
// ROUTES
// ==========================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


// ==========================
// TEST ROUTE
// ==========================

app.get("/", (req, res) => {
    res.json({ message: "SecureBank API Running 🚀" });
});


// ==========================
// 404 HANDLER
// ==========================

app.use((req, res) => {
    res.status(404).json({ message: "API route not found" });
});


// ==========================
// GLOBAL ERROR HANDLER
// ==========================

app.use((err, req, res, next) => {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});


// ==========================
// DATABASE + SERVER START
// ==========================

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
});