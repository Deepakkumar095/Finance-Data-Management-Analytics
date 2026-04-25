import { createContext, useContext, useEffect, useState } from "react";
import { request } from "../utils/api.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      const response = await request("/api/profile", { method: "GET" });
      setUser(response.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const login = async (payload) => {
    try {
      setError("");
      const response = await request("/api/login", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setUser(response.data);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (payload) => {
    try {
      setError("");
      const response = await request("/api/signup", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setUser(response.data);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await request("/api/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
