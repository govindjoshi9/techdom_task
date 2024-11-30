import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [userLoans, setUserLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await API.get("/loans/admin-loans");
        const loansByUser = groupLoansByUser(response.data);        
        setUserLoans(loansByUser);
      } catch (err) {
        setError("Failed to fetch loans.");
        console.error("Fetch loans error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const groupLoansByUser = (loans) => {
    const grouped = loans.reduce((acc, loan) => {
      const user = loan.customer; // Use customer for user data
      if (!user) return acc; // Skip if no user data

      if (!acc[user._id]) {
        acc[user._id] = {
          user: user,
          loans: [],
        };
      }
      acc[user._id].loans.push(loan);
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const approveLoan = async (loanId) => {
    try {
      await API.put(`/loans/${loanId}/approve`);
      setUserLoans(
        (prevUserLoans) =>
          prevUserLoans
            .map((userLoan) => ({
              ...userLoan,
              loans: userLoan.loans.filter((loan) => loan._id !== loanId),
            }))
            .filter((userLoan) => userLoan.loans.length > 0) // Remove users with no loans left
      );
    } catch (err) {
      setError("Failed to approve loan.");
      console.error("Approve loan error:", err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {userLoans.length === 0 ? (
        <p className="text-center">No loans to approve.</p>
      ) : (
        userLoans.map((userLoan) => (
          <div
            key={userLoan.user._id}
            className="bg-white shadow-md rounded-md p-4 mb-6"
          >
            <h3 className="text-xl font-bold mb-4">
              {userLoan.user.name} ({userLoan.user.email})
            </h3>
            <ul>
              {userLoan.loans.map((loan) => (
                <li
                  key={loan._id}
                  className="p-4 bg-gray-100 rounded-md mb-2 flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Loan Amount:</strong> ${loan.amount}
                    </p>
                    <p>
                      <strong>Status:</strong> {loan.status}
                    </p>
                  </div>
                  <button
                    onClick={() => approveLoan(loan._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Approve Loan
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
