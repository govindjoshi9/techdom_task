const express = require("express");
const {
  createLoan,
  getCustomerLoans,
  approveLoan,
} = require("../controllers/loanController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new loan (Customer only)
router.post("/", authenticate, authorize("customer"), createLoan);

// Get loans for the logged-in customer
router.get("/", authenticate, authorize("customer"), getCustomerLoans);

// Approve a loan (Admin only)
router.put("/:id/approve", authenticate, authorize("admin"), approveLoan);

module.exports = router;
