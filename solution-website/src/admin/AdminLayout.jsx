// src/admin/AdminLayout.jsx
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import FeedbackAdmin from "./pages/FeedbackAdmin";
import JobsAdmin from "./pages/JobsAdmin";
import EventsAdmin from "./pages/EventsAdmin";
import ContactsAdmin from "./pages/ContactsAdmin";
import AdminRegister from "./pages/AdminRegister";

const navItems = [
  { to: "feedback", label: "Approve Feedback" },
  { to: "jobs", label: "View Job Submissions" },
  { to: "events", label: "View Event Registrations" },
  { to: "contacts", label: "Contact Messages" },
  { to: "admins", label: "Admin Registration" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="font-bold text-sky-600 text-lg">Blue Peak</div>
          <span className="text-slate-400">|</span>
          <span className="text-slate-700 font-semibold">Admin Dashboard</span>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          Logout
        </button>
      </header>

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-slate-200 min-h-[calc(100vh-64px)] p-4">
          <div className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-sm text-slate-500">Signed in as</div>
            <div className="font-semibold text-slate-900">
              {JSON.parse(localStorage.getItem("user") || "{}")?.name ||
                "Admin"}
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg border transition ${
                    isActive
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <Routes>
              <Route index element={<Navigate to="feedback" replace />} />
              <Route path="feedback" element={<FeedbackAdmin />} />
              <Route path="jobs" element={<JobsAdmin />} />
              <Route path="events" element={<EventsAdmin />} />
              <Route path="contacts" element={<ContactsAdmin />} />
              <Route path="admins" element={<AdminRegister />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
