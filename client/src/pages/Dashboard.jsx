import { useEffect, useState } from "react";
import API from "../services/api";
import LoanCard from "../components/LoanCard";
import LoanForm from "./LoanForm";

const Dashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await API.get("/loans");
        setLoans(response.data);
      } catch (err) {
        setError("Failed to fetch loans.",err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

return (
  <div className="max-w-5xl mx-auto mt-10">
    <h1 className="text-4xl font-bold text-center mb-6">Loan Dashboard</h1>
    <LoanForm />

    <h2 className="text-3xl font-bold text-center mt-10 mb-4">
      Your Previous Loans Status
    </h2>
    {error && <p className="text-red-500 text-center">{error}</p>}
    {loans.length > 0 ? (
      loans.map((loan) => <LoanCard key={loan._id} loan={loan} />) // No onApprove prop for customers
    ) : (
      <p className="text-center text-gray-600">No loans available.</p>
    )}
  </div>
);
};

export default Dashboard;
