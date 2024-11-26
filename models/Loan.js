const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  term: { type: Number, required: true },
  state: {
    type: String,
    enum: ["PENDING", "APPROVED", "PAID"],
    default: "PENDING",
  },
  scheduledRepayments: [
    {
      dueDate: { type: Date, required: true },
      amount: { type: Number, required: true },
      status: { type: String, enum: ["PENDING", "PAID"], default: "PENDING" },
    },
  ],
});

module.exports = mongoose.model("Loan", LoanSchema);
