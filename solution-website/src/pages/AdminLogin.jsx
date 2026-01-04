import { useState } from "react";
import { useNavigate } from "react-router-dom";
import officeBg from "../assets/office.jpg";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../utils/apiBase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store token + user in AuthContext
      login(data.data.token, data.data.user);

      // ✅ Redirect after REAL login
      navigate("/admin/feedback");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <img
        src={officeBg}
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative z-10 flex items-center justify-center h-screen px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Admin Login
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-200 bg-red-500/20 p-3 rounded">
              {error}
            </div>
          )}

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-lg bg-white/25 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-sky-400 outline-none"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-6 rounded-lg bg-white/25 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-sky-400 outline-none"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-sky-600/90 text-white font-semibold hover:bg-sky-600 transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-center text-xs text-white/80 mt-6">
            © 2025 AI-Solutions • Admin Access
          </p>
        </form>
      </div>
    </div>
  );
}
