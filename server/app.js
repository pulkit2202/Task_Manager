const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./router/authRoute.js");
const taskRouter = require("./router/taskRoute.js");
const profileRouter = require("./router/profileRoute.js");
const userRouter = require("./router/userRoute.js");

const app = express();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",  
  credentials: true
}));


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Routes
app.use("/auth", authRouter);
app.use("/task", taskRouter);
app.use("/profile", profileRouter);
app.use("/users", userRouter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API working 🎉" });
});

module.exports = app;
