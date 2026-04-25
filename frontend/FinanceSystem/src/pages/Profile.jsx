import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page">
      <div className="card">
        <h1>Your profile</h1>
        <p>Manage your account details.</p>
        <div className="profile-grid">
          <div>
            <strong>First name</strong>
            <p>{user?.firstName}</p>
          </div>
          <div>
            <strong>Last name</strong>
            <p>{user?.lastName}</p>
          </div>
          <div>
            <strong>Username</strong>
            <p>{user?.userName}</p>
          </div>
          <div>
            <strong>Email</strong>
            <p>{user?.email}</p>
          </div>
          <div>
            <strong>Role</strong>
            <p>{user?.role}</p>
          </div>
          <div>
            <strong>Status</strong>
            <p className={`status-label ${user?.isActive ? "active" : "inactive"}`}>
              {user?.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
