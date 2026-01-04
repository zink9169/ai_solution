import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Solutions from "./pages/Solutions";
import Feedback from "./pages/Feedback";
import Gallery from "./pages/Gallery";
import Jobs from "./pages/Jobs";
import SolutionDetail from "./pages/SolutionDetail";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import FeedbackApproval from "./admin/FeedbackApproval";
import EventRegistrations from "./admin/EventRegistrations";
import JobSubmissions from "./admin/JobSubmissions";
import JobSubmissionDetail from "./admin/JobSubmissionDetail";
import AdminRegister from "./admin/AdminRegister";
import ContactMessages from "./admin/ContactMessages";
import ErrorPage from "./pages/ErrorPage";
export default function App() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] text-slate-900">
      <Navbar />

      <main className="pt-10">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:id" element={<SolutionDetail />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/feedback"
            element={
              <ProtectedRoute>
                <FeedbackApproval />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <EventRegistrations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs-submissions"
            element={
              <ProtectedRoute>
                <JobSubmissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact-messages"
            element={
              <ProtectedRoute>
                <ContactMessages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs/:id"
            element={
              <ProtectedRoute>
                <JobSubmissionDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/register"
            element={
              <ProtectedRoute>
                <AdminRegister />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
