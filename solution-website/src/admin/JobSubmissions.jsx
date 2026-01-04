import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/apiBase";

export default function JobSubmissions() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const loadJobs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/jobs`, {
          signal: controller.signal,
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load jobs");
        }

        setJobs(data.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-b-2 border-sky-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-sky-600 mb-8">Job Submissions</h1>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {jobs.length === 0 ? (
        <p className="text-slate-600">No job submissions found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Job Title</th>
                <th className="px-4 py-3 text-left">Country</th>
                <th className="px-4 py-3 text-left">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  onClick={() => navigate(`/admin/jobs/${job.id}`)}
                  className="border-t hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="px-4 py-3 font-medium">{job.name}</td>
                  <td className="px-4 py-3">{job.email}</td>
                  <td className="px-4 py-3">{job.job_title || "—"}</td>
                  <td className="px-4 py-3">{job.country || "—"}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {new Date(job.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
