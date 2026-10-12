import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("stockwise_token"));
  const [loading, setLoading] = useState(true);

  // Validate token on mount
  useEffect(() => {
    const verifyUserToken = async () => {
      const storedToken = localStorage.getItem("stockwise_token");
      if (!storedToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userData = await api.getMe();
        setUser(userData);
        setToken(storedToken);
      } catch (err) {
        console.error("Token verification failed:", err.message);
        // Clear invalid token
        localStorage.removeItem("stockwise_token");
        localStorage.removeItem("stockwise_user");
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUserToken();
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    if (data && data.token) {
      localStorage.setItem("stockwise_token", data.token);
      localStorage.setItem("stockwise_user", JSON.stringify(data));
      setToken(data.token);
      setUser(data);
      return data;
    } else {
      throw new Error("Invalid response from server");
    }
  };

  const register = async (name, email, password, role = "staff") => {
    const data = await api.register(name, email, password, role);
    if (data && data.token) {
      localStorage.setItem("stockwise_token", data.token);
      localStorage.setItem("stockwise_user", JSON.stringify(data));
      setToken(data.token);
      setUser(data);
      return data;
    } else {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("stockwise_token");
    localStorage.removeItem("stockwise_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
