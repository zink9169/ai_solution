import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/apiBase";
export default function Solutions() {
  const [softwareSolutions, setSoftwareSolutions] = useState([]);
  const [projectSolutions, setProjectSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const loadSolutions = async () => {
      try {
        const [softwareRes, projectRes] = await Promise.all([
          fetch(`${API_BASE}/api/solutions?type=software`, {
            signal: controller.signal,
          }),
          fetch(`${API_BASE}/api/solutions?type=project`, {
            signal: controller.signal,
          }),
        ]);

        const softwareData = await softwareRes.json();
        const projectData = await projectRes.json();

        if (softwareData.success) {
          setSoftwareSolutions(softwareData.data);
        }

        if (projectData.success) {
          setProjectSolutions(projectData.data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to load solutions");
        }
      } finally {
        setLoading(false);
      }
    };

    loadSolutions();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin h-10 w-10 border-b-2 border-sky-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-inter">
      {/* SOFTWARE SOLUTIONS */}
      <h2 className="text-3xl font-bold text-sky-600 text-center mb-10">
        Software Solutions
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {softwareSolutions.map((s) => (
          <div
            key={s.id}
            className="bg-white border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition"
          >
            {s.icon_url && (
              <img
                src={s.icon_url}
                alt={s.name}
                className="h-16 w-16 mx-auto mb-4"
              />
            )}
            <h3 className="font-semibold text-lg">{s.name}</h3>
            <p className="text-sm text-slate-600 mt-2">{s.summary}</p>
          </div>
        ))}
      </div>

      {/* PAST PROJECTS */}
      <h2 className="text-3xl font-bold text-sky-600 text-center mb-10">
        Past Solutions
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectSolutions.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/solutions/${p.id}`)}
            className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {p.image_url && (
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${p.image_url})` }}
              />
            )}
            <div className="p-5 text-center">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm text-slate-600 mt-2">{p.summary}</p>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-center text-red-500 mt-10">{error}</p>}
    </div>
  );
}
