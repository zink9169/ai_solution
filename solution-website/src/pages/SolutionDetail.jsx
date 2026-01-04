import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/apiBase";

export default function SolutionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSolution = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/solutions/${id}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (data.success) {
          setSolution(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin h-10 w-10 border-b-2 border-sky-600 rounded-full" />
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-600">Solution not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="text-sky-600 mb-6 hover:underline"
      >
        ← Back to Solutions
      </button>

      {solution.image_url && (
        <img
          src={solution.image_url}
          alt={solution.name}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{solution.name}</h1>
      <p className="text-slate-600 mb-8">{solution.summary}</p>

      {solution.project_story && (
        <div className="prose max-w-none">
          <h2>Project Overview</h2>
          <p style={{ whiteSpace: "pre-line" }}>{solution.project_story}</p>
        </div>
      )}
    </div>
  );
}
