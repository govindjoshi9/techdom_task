import { useState } from "react";
import API from "../services/api";

const LoanForm = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/loans", { amount, term });
      setMessage("Loan request submitted successfully!");
    } catch (error) {
      setMessage("Failed to submit loan request",error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Apply for a Loan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Loan Amount
          </label>
          <input
            type="number"
            placeholder="Enter Loan Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Loan Term (Weeks)
          </label>
          <input
            type="number"
            placeholder="Enter Loan Term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Loan Request
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default LoanForm;
