const express = require("express");
const { addRepayment } = require("../controllers/repaymentController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Submit a repayment (Customer only)
router.post("/", authenticate, authorize("customer"), addRepayment);

module.exports = router;
