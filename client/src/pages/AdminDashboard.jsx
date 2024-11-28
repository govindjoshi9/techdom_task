import { useEffect, useState } from "react";
import API from "../services/api";
import LoanCard from "../components/LoanCard";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await API.get("/loans");
        setLoans(response.data);
        console.log(response)
      } catch (err) {
        setError("Failed to fetch loans.",err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const approveLoan = async (id) => {
    try {
      await API.put(`/loans/${id}/approve`);
      setLoans(loans.filter((loan) => loan._id !== id));
    } catch (err) {
      setError("Failed to approve loan.",err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loans.map((loan) => (
        <LoanCard key={loan._id} loan={loan} onApprove={approveLoan} />
      ))}
    </div>
  );
};

export default AdminDashboard;
