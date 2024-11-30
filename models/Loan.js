const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema({
  dueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["PENDING", "PAID"], default: "PENDING" },
});

const loanSchema = new mongoose.Schema({
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
  scheduledRepayments: { type: [repaymentSchema], default: [] },
});


module.exports = mongoose.model("Loan", loanSchema);
