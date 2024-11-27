import React, { useState } from "react";
import API from "../services/api";

const LoanForm = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/loans", { amount, term });
      setMessage("Loan request submitted successfully!");
    } catch (error) {
      setMessage("Failed to submit loan request");
    }
  };

  return (
    <div>
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Term (weeks)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoanForm;
