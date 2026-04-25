import { useEffect, useState } from "react";
import { request } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await request("/api/dashboard", { method: "GET" });
        setDashboard(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadDashboard();
  }, []);

  if (!dashboard && !error) {
    return <div className="page shell">Loading dashboard...</div>;
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Welcome, {user?.firstName || user?.userName || user?.email}</h1>
        <p className="section-text">Role: {user?.role}</p>
      </div>

      {error && <div className="card error-card">{error}</div>}

      {user?.role === "admin" ? (
        <div className="grid two-up">
          <div className="card">
            <h2>Overall finance summary</h2>
            <p>Total income: ${dashboard?.overall?.totalIncome ?? 0}</p>
            <p>Total expense: ${dashboard?.overall?.totalExpense ?? 0}</p>
            <p>Balance: ${dashboard?.overall?.balance ?? 0}</p>
          </div>
          <div className="card">
            <h2>Users with activity</h2>
            {dashboard?.users?.length ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Income</th>
                      <th>Expense</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.users.map((item) => (
                      <tr key={item.userId}>
                        <td>{item.email}</td>
                        <td>${item.totalIncome}</td>
                        <td>${item.totalExpense}</td>
                        <td>${item.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No records found yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid two-up">
          <div className="card">
            <h2>Your balance</h2>
            <p>Total income: ${dashboard?.totalIncome ?? 0}</p>
            <p>Total expense: ${dashboard?.totalExpense ?? 0}</p>
            <p>Balance: ${dashboard?.balance ?? 0}</p>
          </div>
          <div className="card">
            <h2>Profile</h2>
            <p>First name: {user?.firstName}</p>
            <p>Last name: {user?.lastName}</p>
            <p>Username: {user?.userName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
