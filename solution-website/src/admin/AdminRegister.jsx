import { useState } from "react";
import officeBg from "../assets/office.jpg"; // Background image
import { useAuth } from "../context/AuthContext"; // Custom Auth Context
import { API_BASE } from "../utils/apiBase";

export default function AdminRegister() {
  const { login } = useAuth(); // Login function from AuthContext

  const [name, setName] = useState(""); // Name input state
  const [email, setEmail] = useState(""); // Email input state
  const [password, setPassword] = useState(""); // Password input state

  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Clear any previous success message
    setLoading(true); // Start loading state

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Send registration data
      });

      const data = await res.json(); // Parse JSON response

      if (!res.ok || !data.success) {
        const validatorMsg = data?.errors?.[0]?.msg; // Get validation error message
        throw new Error(validatorMsg || data.message || "Register failed"); // Throw error if registration fails
      }

      // Registration success, show success message
      setSuccessMessage("Admin user registered successfully!");

      // Optionally, clear the form after successful registration
      setName("");
      setEmail("");
      setPassword("");

      // No need to redirect or login, just show success message
      // login(data.data.token, data.data.user); // Only use if you want to auto-login the admin (not needed per your requirement)
    } catch (err) {
      setError(err.message || "Something went wrong"); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <img
        src={officeBg}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Office background"
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />{" "}
      {/* Dark overlay */}
      {/* Registration Form */}
      <div className="relative z-10 flex items-center justify-center h-screen px-4">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-sm bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Admin Register
          </h2>

          {/* Show Error Message */}
          {error && (
            <div className="mb-4 text-sm text-red-200 bg-red-500/20 p-3 rounded">
              {error}
            </div>
          )}

          {/* Show Success Message */}
          {successMessage && (
            <div className="mb-4 text-sm text-green-200 bg-green-500/20 p-3 rounded">
              {successMessage}
            </div>
          )}

          {/* Full Name Input */}
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
            placeholder="Full Name"
            className="w-full p-3 mb-4 rounded-lg bg-white/25 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-sky-400 outline-none"
          />

          {/* Email Input */}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-lg bg-white/25 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-sky-400 outline-none"
          />

          {/* Password Input */}
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            placeholder="Password"
            className="w-full p-3 mb-6 rounded-lg bg-white/25 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-sky-400 outline-none"
          />

          {/* Register Button */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-sky-600/90 text-white font-semibold hover:bg-sky-600 transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-white/80 mt-6">
            © 2025 AI-Solutions • Admin Access
          </p>
        </form>
      </div>
    </div>
  );
}
