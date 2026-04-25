import { useEffect, useState } from "react";
import { request } from "../utils/api.js";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await request("/api/users", { method: "GET" });
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateUser = async (id, changes) => {
    try {
      await request(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(changes)
      });
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      await request(`/api/users/${id}`, { method: "DELETE" });
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="page shell">Loading users...</div>;
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Admin user management</h1>
        <p>Review and manage user roles, activation, and access.</p>
      </div>

      {error && <div className="card error-card">{error}</div>}

      <div className="table-wrap card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const displayName = user.firstName || user.userName || user.email;
              return (
                <tr key={user._id}>
                  <td>{displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => updateUser(user._id, { role: e.target.value })}
                    >
                      <option value="user">user</option>
                      <option value="analyst">analyst</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={Boolean(user.isActive)}
                      onChange={(e) => updateUser(user._id, { isActive: e.target.checked })}
                    />
                  </td>
                  <td>
                    <button className="danger" onClick={() => deleteUser(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
