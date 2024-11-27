import { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [pendingLoans, setPendingLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await API.get("/loans"); // Adjust this if there's an admin-specific endpoint
        setPendingLoans(
          response.data.filter((loan) => loan.state === "PENDING")
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchLoans();
  }, []);

  const approveLoan = async (id) => {
    try {
      await API.put(`/loans/${id}/approve`);
      setPendingLoans(pendingLoans.filter((loan) => loan._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {pendingLoans.map((loan) => (
          <li key={loan._id}>
            Loan #{loan._id}: {loan.amount} - {loan.state}
            <button onClick={() => approveLoan(loan._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
