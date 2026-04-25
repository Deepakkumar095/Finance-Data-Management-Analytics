import { useEffect, useState } from "react";
import { request } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Analytics = () => {
    const { user } = useAuth();
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            const endpoints = [
                "/api/dashboard/category-summary",
                "/api/dashboard/monthly-trends",
                "/api/dashboard/top-spending",
                "/api/dashboard/recent"
            ];

            const responses = await Promise.all(
                endpoints.map(endpoint => request(endpoint, { method: "GET" }))
            );

            setAnalytics({
                categorySummary: responses[0].data,
                monthlyTrends: responses[1].data,
                topSpending: responses[2].data,
                recentActivity: responses[3].data
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnalytics();
    }, []);

    if (loading) {
        return <div className="page shell">Loading analytics...</div>;
    }

    return (
        <div className="page">
            <div className="card">
                <h1>Analytics Dashboard</h1>
                <p>Financial insights and trends for {user.role === "admin" ? "all users" : "your account"}.</p>
            </div>

            {error && <div className="card error-card">{error}</div>}

            <div className="grid two-up">
                <div className="card">
                    <h2>Category Summary</h2>
                    {analytics.categorySummary?.length ? (
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Income</th>
                                        <th>Expense</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics.categorySummary.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>${item.income?.toFixed(2) || 0}</td>
                                            <td>${item.expense?.toFixed(2) || 0}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No category data available.</p>
                    )}
                </div>

                <div className="card">
                    <h2>Monthly Trends</h2>
                    {analytics.monthlyTrends?.length ? (
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Year</th>
                                        <th>Income</th>
                                        <th>Expense</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics.monthlyTrends.map((item) => (
                                        <tr key={`${item.year}-${item.month}`}>
                                            <td>{item.month}</td>
                                            <td>{item.year}</td>
                                            <td>${item.income?.toFixed(2) || 0}</td>
                                            <td>${item.expense?.toFixed(2) || 0}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No monthly trends data available.</p>
                    )}
                </div>
            </div>

            <div className="grid two-up">
                <div className="card">
                    <h2>Top Spending Categories</h2>

                    {analytics.topSpending?.length ? (
                        <PieChart width={400} height={300}>
                            <Pie
                                data={analytics.topSpending}
                                dataKey="expense"
                                nameKey="category"
                                outerRadius={120}
                                label
                            >
                                {analytics.topSpending.map((entry, index) => (
                                    <Cell key={index} fill={["#FF5733", "#4CAF50", "#2196F3", "#FFC107"][index % 4]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    ) : (
                        <p>No spending data available</p>
                    )}
                </div>

                <div className="card">
                    <h2>Recent Activity</h2>
                    {analytics.recentActivity?.length ? (
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Note</th>
                                        <th>User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics.recentActivity.map((item) => (
                                        <tr key={item._id}>
                                            <td>{new Date(item.date).toLocaleDateString()}</td>
                                            <td>{item.type}</td>
                                            <td>{item.category}</td>
                                            <td>${item.amount?.toFixed(2) || 0}</td>
                                            <td>{item.note}</td>
                                            <td>{item.userEmail}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No recent activity.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;