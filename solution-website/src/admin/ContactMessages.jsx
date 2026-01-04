import { useEffect, useState } from "react";

export default function ContactMessages() {
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiBase = import.meta.env.VITE_API_URL || "";

  // Parse legacy message field if backend stored extra data inside message
  // e.g. "Company: X\nCountry: Y\nJob: Z\nJob Details: ..."
  const parseLegacy = (raw) => {
    const out = {};
    if (!raw || typeof raw !== "string") return out;

    const lines = raw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    for (const line of lines) {
      const lower = line.toLowerCase();
      const value = line.split(":").slice(1).join(":").trim();

      if (lower.startsWith("company:")) out.companyName = value;
      else if (lower.startsWith("country:")) out.country = value;
      else if (lower.startsWith("job:")) out.job = value;
      else if (lower.startsWith("job details:")) out.jobDetails = value;
      else if (lower.startsWith("requirement:")) out.jobDetails = value;
    }
    return out;
  };

  // Normalizes fields whether backend returns snake_case or camelCase
  const normalizeMessage = (m) => {
    const legacy = parseLegacy(m?.message);

    return {
      id:
        m?.id ??
        m?._id ??
        `${m?.email || "row"}-${m?.created_at || Date.now()}`,
      name: m?.name || "—",
      email: m?.email || "—",
      phone: m?.phone || "—",
      companyName:
        m?.company_name || m?.companyName || legacy.companyName || "—",
      country: m?.country || legacy.country || "—",
      job: m?.job || legacy.job || "—",
      jobDetails:
        m?.job_details ||
        m?.jobDetails ||
        legacy.jobDetails ||
        m?.message ||
        "—",
      createdAt: m?.created_at || m?.createdAt || null,
    };
  };

  const formatDate = (val) => {
    if (!val) return "—";
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadMessages = async () => {
      try {
        const res = await fetch(`${apiBase}/api/contact`, {
          signal: controller.signal,
        });

        const data = await res.json();

        // Support both shapes:
        // { success: true, data: [...] } OR direct array OR { data: [...] }
        const rows = Array.isArray(data) ? data : data?.data || [];

        if (!Array.isArray(rows)) {
          throw new Error(data?.message || "Failed to load contact messages");
        }

        setContactMessages(rows.map(normalizeMessage));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
    return () => controller.abort();
  }, [apiBase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-b-2 border-sky-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-sky-600 mb-8">Contact Messages</h1>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {contactMessages.length === 0 ? (
        <p className="text-slate-600">No contact messages found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Country</th>
                <th className="px-4 py-3 text-left">Job</th>
                <th className="px-4 py-3 text-left">Job Details</th>
                <th className="px-4 py-3 text-left">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.map((m) => (
                <tr
                  key={m.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3">{m.email}</td>
                  <td className="px-4 py-3">{m.phone}</td>
                  <td className="px-4 py-3">{m.companyName}</td>
                  <td className="px-4 py-3">{m.country}</td>
                  <td className="px-4 py-3">{m.job}</td>
                  <td className="px-4 py-3">
                    <div className="max-w-[420px] whitespace-pre-wrap break-words">
                      {m.jobDetails}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {formatDate(m.createdAt)}
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
