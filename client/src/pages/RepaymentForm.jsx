import { useState } from "react";
import API from "../services/api";

const RepaymentForm = ({ id }) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/repayments", { loanId: id, amount });
      setMessage("Repayment successful!");
    } catch (err) {
      setMessage("Failed to submit repayment.",err);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h4 className="text-lg font-medium mb-3">Submit Repayment</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Repayment Amount
          </label>
          <input
            type="number"
            placeholder="Enter Repayment Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Submit Repayment
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.includes("successful") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default RepaymentForm;
