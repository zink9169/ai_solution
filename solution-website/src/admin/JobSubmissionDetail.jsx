import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/apiBase";

export default function JobSubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadJob = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/jobs/${id}`, {
          signal: controller.signal,
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load job");
        }

        setJob(data.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadJob();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-b-2 border-sky-600 rounded-full" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-600">Job submission not found</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sky-600 mt-4 hover:underline"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="text-sky-600 hover:underline mb-6"
      >
        ← Back to list
      </button>

      <div className="bg-white rounded-lg shadow p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">{job.name}</h1>

        <p>
          <strong>Email:</strong> {job.email}
        </p>
        <p>
          <strong>Phone:</strong> {job.phone || "—"}
        </p>
        <p>
          <strong>Country:</strong> {job.country || "—"}
        </p>
        <p>
          <strong>Job Title:</strong> {job.job_title || "—"}
        </p>

        <p className="text-sm text-slate-500">
          Submitted: {new Date(job.created_at).toLocaleString()}
        </p>

        {job.file_url && (
          <div className="pt-4">
            <a
              href={job.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
            >
              View / Download CV
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
