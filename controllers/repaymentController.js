const Loan = require("../models/Loan");

// Submit a repayment
exports.addRepayment = async (req, res) => {
  const { loanId, amount } = req.body;
  const userId = req.user.id;

  try {
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ error: "Loan not found" });
    if (loan.customer.toString() !== userId)
      return res.status(403).json({ error: "Unauthorized" });

    const nextRepayment = loan.scheduledRepayments.find(
      (r) => r.status === "PENDING"
    );
    if (!nextRepayment)
      return res.status(400).json({ error: "All repayments already made" });

    if (amount < nextRepayment.amount) {
      return res
        .status(400)
        .json({ error: "Repayment amount is less than required" });
    }

    // Mark repayment as PAID
    nextRepayment.status = "PAID";

    // Check if all repayments are PAID
    const allPaid = loan.scheduledRepayments.every((r) => r.status === "PAID");
    if (allPaid) loan.state = "PAID";

    await loan.save();
    res.status(200).json({ message: "Repayment successful", loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit repayment" });
  }
};
