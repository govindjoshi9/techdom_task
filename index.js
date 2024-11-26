const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const loanRoutes = require("./routes/loan");
const repaymentRoutes = require("./routes/repayment");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all origins

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes); // Authentication routes (register, login)
app.use("/api/loans", loanRoutes); // Loan-related routes
app.use("/api/repayments", repaymentRoutes); // Repayment-related routes

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Mini-Loan API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
