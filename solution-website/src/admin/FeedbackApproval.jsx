import { useEffect, useState } from "react";
import { API_BASE } from "../utils/apiBase";

export default function FeedbackApproval() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Fetch pending feedbacks
  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/feedback/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load feedbacks");
      }

      setFeedbacks(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Approve feedback
  const approve = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/feedback/${id}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Approve failed");
      }

      // Remove from list
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Delete feedback
  const remove = async (id) => {
    if (!confirm("Delete this feedback permanently?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/feedback/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Delete failed");
      }

      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-8 w-8 border-b-2 border-sky-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-sky-600 mb-8">
        Pending Feedback Approval
      </h1>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded">{error}</div>
      )}

      {feedbacks.length === 0 ? (
        <p className="text-slate-500 text-center">No pending feedbacks 🎉</p>
      ) : (
        <div className="space-y-6">
          {feedbacks.map((f) => (
            <div
              key={f.id}
              className="bg-white border rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{f.name}</h3>
                  <p className="text-sm text-slate-500">
                    {f.occupation || "—"} • Rating: {f.rating}/5
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => approve(f.id)}
                    className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => remove(f.id)}
                    className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="mt-4 text-slate-700 whitespace-pre-line">
                {f.message}
              </p>

              <p className="mt-3 text-xs text-slate-400">
                Submitted: {new Date(f.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
