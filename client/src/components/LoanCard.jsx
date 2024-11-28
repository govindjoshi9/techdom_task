/* eslint-disable react/prop-types */
import { useState } from "react";
import RepaymentForm from "../pages/RepaymentForm";

const LoanCard = ({ loan, onApprove }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-bold">
        Loan #{loan._id}
        <span className="ml-2 text-sm font-medium text-gray-500">
          ({loan.state})
        </span>
      </h3>
      <p className="text-gray-700">Amount: ${loan.amount}</p>
      <p className="text-gray-700">Term: {loan.term} weeks</p>

      {loan.state === "PENDING" && (
        <button
          onClick={() => onApprove(loan._id)}
          className="mt-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Approve Loan
        </button>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        {isExpanded ? "Hide Details" : "View Details"}
      </button>

      {isExpanded && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Scheduled Repayments:</h4>
          <ul className="list-disc list-inside">
            {loan.scheduledRepayments.map((repayment) => (
              <li key={repayment._id} className="mb-2">
                <p>
                  <strong>Due Date:</strong>{" "}
                  {new Date(repayment.dueDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Amount:</strong> ${repayment.amount.toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      repayment.status === "PAID"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {repayment.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>

          <RepaymentForm id={loan._id} />
        </div>
      )}
    </div>
  );
};

export default LoanCard;
