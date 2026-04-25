import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import Profile from "./pages/Profile.jsx";
import Records from "./pages/Records.jsx";
import Analytics from "./pages/Analytics.jsx";
import "./index.css";

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="brand">
        <Link to="/">Finance Dashboard</Link>
        
      </div>
      <nav>
        {user ? (
          <>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/records">Records</NavLink>
            {(user.role === "analyst" || user.role === "admin") && <NavLink to="/analytics">Analytics</NavLink>}
            <NavLink to="/profile">Profile</NavLink>
            {user.role === "admin" && <NavLink to="/admin/users">User management</NavLink>}
            <button className="link-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

const AppContent = () => (
  <div className="app-shell">
    <Navigation />
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={["analyst", "admin"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </main>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
