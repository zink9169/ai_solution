import { useLocation, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-lg text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            Access Restricted
          </h1>
          <p className="text-lg text-gray-700">
            You don't have permission to access this page. Please log in first.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            You attempted to access:{" "}
            <span className="font-medium text-gray-700">
              {location.pathname}
            </span>
          </p>
          <button
            onClick={handleGoHome}
            className="mt-6 px-8 py-3 text-xl bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
