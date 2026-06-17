import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("farmconnect_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCurrentUser() {
      const token = localStorage.getItem("farmconnect_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.me();
        setUser(response.data.user);
        localStorage.setItem("farmconnect_user", JSON.stringify(response.data.user));
      } catch (error) {
        localStorage.removeItem("farmconnect_token");
        localStorage.removeItem("farmconnect_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadCurrentUser();
  }, []);

  async function login(credentials) {
    const response = await authService.login(credentials);
    localStorage.setItem("farmconnect_token", response.data.token);
    localStorage.setItem("farmconnect_user", JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response.data.user;
  }

  function logout() {
    // JWT logout is handled on the client by removing the saved token.
    localStorage.removeItem("farmconnect_token");
    localStorage.removeItem("farmconnect_user");
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, logout, isLoggedIn: Boolean(user) }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
