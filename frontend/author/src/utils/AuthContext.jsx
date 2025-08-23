import { createContext, useContext, useState, useEffect } from "react";
import { isTokenExpired } from "../utils/jwt";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem("jwt");
    if (stored && !isTokenExpired(stored)) {
      return stored;
    }
    localStorage.removeItem("jwt"); // remove if expired
    localStorage.removeItem("user");
    setUser(null);
    return null;
  });

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token]);

  const login = (jwtToken, userData) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("jwt", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
