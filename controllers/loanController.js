const Loan = require("../models/Loan");
const User = require("../models/User");

// Helper to generate repayment schedule
const generateRepayments = (amount, term, startDate) => {
  const repayments = [];
  const weeklyAmount = (amount / term).toFixed(2);

  for (let i = 0; i < term; i++) {
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + 7 * (i + 1));
    repayments.push({
      dueDate,
      amount: weeklyAmount,
      status: "PENDING",
    });
  }

  return repayments;
};

// Create a new loan
exports.createLoan = async (req, res) => {
  const { amount, term } = req.body;
  const userId = req.user.id;

  try {
    const repayments = generateRepayments(amount, term, new Date());
    const loan = new Loan({
      customer: userId,
      amount,
      term,
      scheduledRepayments: repayments,
    });

    await loan.save();
    res.status(201).json({ message: "Loan request submitted", loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create loan" });
  }
};

// Get loans for a customer
exports.getCustomerLoans = async (req, res) => {
  const userId = req.user.id;

  try {
    const loans = await Loan.find({ customer: userId });
    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve loans" });
  }
};

// Approve a loan (Admin only)
exports.approveLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ error: "Loan not found" });

    loan.state = "APPROVED";
    await loan.save();

    res.status(200).json({ message: "Loan approved successfully", loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to approve loan" });
  }
};