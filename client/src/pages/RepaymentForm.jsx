import  { useState } from "react";
import API from "../services/api";

const RepaymentForm = () => {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/repayments", { loanId, amount });
      setMessage("Repayment successful!");
    } catch (err) {
      setMessage("Failed to submit repayment.");
    }
  };

  return (
    <div>
      <h2>Submit Repayment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RepaymentForm;
