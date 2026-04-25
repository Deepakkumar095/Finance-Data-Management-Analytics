import { useEffect, useState } from "react";
import { request } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Records = () => {
  const { user } = useAuth(); 
  const [records, setRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
    userId: ""
  });

  // Load Records
  const loadRecords = async () => {
    try {
      setLoading(true);
      const res = await request("/api/records/get-records");
      setRecords(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load Users (only for admin)
  const loadUsers = async () => {
    try {
      if (user?.role === "admin") {
        const res = await request("/api/users");
        setUsers(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadRecords();
    loadUsers();
  }, [user]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit (admin only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        amount: parseFloat(form.amount),
        type: form.type,
        category: form.category,
        note: form.note,
        date: new Date(form.date).toISOString(),
        userId: form.userId
      };

      if (!form.userId) {
        setError("Please select user");
        return;
      }

      if (editingRecord) {
        await request(`/api/records/update/${editingRecord._id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
      } else {
        await request("/api/records/add-record", {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }

      setShowForm(false);
      setEditingRecord(null);

      setForm({
        amount: "",
        type: "income",
        category: "",
        note: "",
        date: new Date().toISOString().split("T")[0],
        userId: ""
      });

      await loadRecords();
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit
  const handleEdit = (record) => {
    setEditingRecord(record);
    setForm({
      amount: record.amount.toString(),
      type: record.type,
      category: record.category,
      note: record.note,
      date: new Date(record.date).toISOString().split("T")[0],
      userId: record.user?._id || ""
    });
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await request(`/api/records/delete/${id}`, { method: "DELETE" });
    await loadRecords();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Records</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      
      {user?.role === "admin" && (
        <button onClick={() => setShowForm(true)}>Add Record</button>
      )}

      
      {showForm && user?.role === "admin" && (
        <form onSubmit={handleSubmit}>
          <select
            name="userId"
            value={form.userId}
            onChange={handleFormChange}
            required
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.firstName} {u.lastName} ({u.email})
              </option>
            ))}
          </select>

          <input
            name="amount"
            value={form.amount}
            onChange={handleFormChange}
            placeholder="Amount"
            required
          />

          <select name="type" value={form.type} onChange={handleFormChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            name="category"
            value={form.category}
            onChange={handleFormChange}
            placeholder="Category"
            required
          />

          <input
            name="note"
            value={form.note}
            onChange={handleFormChange}
            placeholder="Note"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleFormChange}
          />

          <button type="submit">
            {editingRecord ? "Update" : "Save"}
          </button>
        </form>
      )}

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
            <th>User Email</th>
            {user?.role === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {records
            .filter((r) => r.user !== null)
            .map((r) => (
              <tr key={r._id}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.type}</td>
                <td>{r.category}</td>
                <td>{r.amount}</td>
                <td>{r.note}</td>
                <td>{r.user?.email}</td>

                
                {user?.role === "admin" && (
                  <td>
                    <button onClick={() => handleEdit(r)}>Edit</button>
                    <button onClick={() => handleDelete(r._id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Records;