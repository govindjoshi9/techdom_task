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
  const { customer, amount, term } = req.body;

  try {
    const loan = new Loan({
      customer,
      amount,
      term,
      state: "PENDING", // Ensure it's explicitly set
      scheduledRepayments: generateRepayments(amount, term), // Optional if using a repayment schedule
    });

    await loan.save();
    res.status(201).json({ message: "Loan created successfully", loan });
  } catch (error) {
    console.error("Loan creation error:", error);
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

///admin lone can see

exports.getAdminLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ state: "PENDING" }) // Only fetch pending loans
      .populate("customer", "name email"); // Populate customer details for display

    res.status(200).json(loans);
  } catch (error) {
    console.error("Failed to retrieve admin loans:", error);
    res.status(500).json({ error: "Failed to retrieve loans" });
  }
};

// Approve a loan (Admin only)
exports.approveLoan = async (req, res) => {
  try {
    const loanId = req.params.id;
    const loan = await Loan.findByIdAndUpdate(
      loanId,
      { status: "approved" },
      { new: true }
    );

    if (!loan) {
      return res.status(404).json({ error: "Loan not found." });
    }

    res.status(200).json({ message: "Loan approved successfully.", loan });
  } catch (error) {
    console.error("Approve loan error:", error);
    res.status(500).json({ error: "Failed to approve loan." });
  };
}
