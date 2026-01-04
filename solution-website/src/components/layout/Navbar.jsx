import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BluePeakLogo from "../../assets/BluePeak.svg";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Public navbar items
  const publicLinks = [
    { label: "Home", to: "/" },
    { label: "Solutions", to: "/solutions" },
    { label: "Feedback", to: "/feedback" },
    { label: "Articles", to: "/articles" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
    { label: "Submit Job", to: "/jobs" },
    { label: "Admin Login", to: "/admin" },
  ];

  // Admin-only navbar items
  const adminLinks = [
    { label: "Approve Feedback", to: "/admin/feedback" },
    { label: "Job Submissions", to: "/admin/jobs-submissions" },
    { label: "Contact Messages", to: "/admin/contact-messages" },
    { label: "Event Registrations", to: "/admin/events" },
    { label: "Admin Register", to: "/admin/register" },
  ];

  const linksToRender = isAuthenticated ? adminLinks : publicLinks;

  const handleLogout = () => {
    logout(); // Clear auth state
    navigate("/"); // Redirect to home page
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <nav className="w-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 select-none">
          <img
            src={BluePeakLogo}
            alt="AI-Solutions Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-bold text-sky-600">AI-Solutions</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm text-slate-700">
            {linksToRender.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `hover:text-sky-600 ${
                      isActive ? "text-sky-600 font-semibold" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {/* Logout button (admin only) */}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout} // Call the handleLogout function
                  className="text-red-600 hover:underline text-sm"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <ul className="px-4 py-3 space-y-2 text-sm">
            {linksToRender.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="block px-3 py-2 rounded hover:bg-slate-100"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout} // Call the handleLogout function
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-slate-100 rounded"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
