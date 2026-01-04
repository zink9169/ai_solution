import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const apiBase = import.meta.env.VITE_API_URL || "";

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem("user");
    return cached ? JSON.parse(cached) : null;
  });

  const [authLoading, setAuthLoading] = useState(Boolean(token)); // only load if token exists

  // Save token+user whenever changes
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Verify token and fetch profile
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const res = await fetch(`${apiBase}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Invalid token");

        const data = await res.json();
        if (data?.success && data?.data?.user) {
          setUser(data.data.user);
        } else {
          setToken("");
          setUser(null);
        }
      } catch {
        // token invalid/expired
        setToken("");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    loadProfile();
  }, [token, apiBase]);

  // ✅ login accepts (token, user)
  const login = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user), // ✅ nice name for Navbar
      authLoading,
      login,
      logout,
    }),
    [token, user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
