import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth(); // Make sure it's isAuthenticated here
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-sky-600 rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/error" replace state={{ from: location }} />; // Redirect to /login
  }

  return children; // Render the protected route if authenticated
}
