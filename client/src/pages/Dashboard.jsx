import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await API.get("/loans");
        setLoans(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div>
      <h2>Your Loans</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan._id}>
            Loan #{loan._id}: {loan.amount} - {loan.state}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
