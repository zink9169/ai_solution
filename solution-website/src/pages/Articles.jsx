import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Realistic article data with IDs for navigation
const fallbackArticles = [
  {
    id: 1,
    title: "How AI is Transforming Modern Businesses",
    desc: "AI automation, data insights, and predictive analytics are reshaping how companies operate today.",
    img: "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Technology",
    date: "January 15, 2024",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Building Better Software: Clean Architecture Explained",
    desc: "Clean, maintainable architecture reduces bugs and builds long-term scalability.",
    img: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Development",
    date: "January 10, 2024",
    readTime: "12 min read",
  },
  {
    id: 3,
    title: "Why Your Business Needs Cloud Computing",
    desc: "Cloud systems increase speed, reduce costs, and offer better security for growing companies.",
    img: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Cloud",
    date: "January 5, 2024",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for 2025",
    desc: "Protecting your business from data breaches and cyber threats is more important than ever.",
    img: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Security",
    date: "December 28, 2023",
    readTime: "15 min read",
  },
  {
    id: 5,
    title: "The Future of Automation in Workplaces",
    desc: "Automation tools streamline processes, reduce human error, and increase productivity.",
    img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Automation",
    date: "December 20, 2023",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "How to Successfully Manage Software Projects",
    desc: "Roadmaps, agile planning, and teamwork are key elements to any successful software project.",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Project Management",
    date: "December 15, 2023",
    readTime: "11 min read",
  },
];

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value); // keep original if not a valid date
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Articles() {
  const navigate = useNavigate();

  const apiBase = useMemo(() => import.meta.env.VITE_API_URL || "", []);

  const [articles, setArticles] = useState(fallbackArticles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadArticles = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${apiBase}/api/articles`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          // try to read json error message
          let msg = "Failed to load articles";
          try {
            const errJson = await res.json();
            if (errJson?.message) msg = errJson.message;
          } catch {
            // ignore
          }
          throw new Error(msg);
        }

        const data = await res.json();

        if (Array.isArray(data?.data) && data.data.length > 0) {
          const mapped = data.data.map((item) => ({
            id: item.id,
            title: item.title,
            desc: item.excerpt || item.content?.slice(0, 160) || "",
            img:
              item.image_url ||
              "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=1600",
            category: item.category || "General",
            date: formatDate(item.created_at) || formatDate(new Date()),
            readTime: item.read_time || "5 min read",
          }));

          setArticles(mapped);
        } else {
          // API returned success but empty => show empty state (not fallback)
          setArticles([]);
        }
      } catch (err) {
        // ✅ Don't show an error when request is intentionally aborted
        if (err?.name === "AbortError") return;

        setError(err?.message || "Could not fetch articles");
        setArticles(fallbackArticles);
      } finally {
        // Avoid setting state after abort
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadArticles();
    return () => controller.abort();
  }, [apiBase]);

  if (loading) {
    return (
      <div className="pt-10 pb-20 max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-20 max-w-6xl mx-auto px-6 font-inter">
      {/* PAGE TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-4">
          Articles & Insights
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Stay updated with the latest trends, insights, and best practices in
          technology and business
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
          {error} - Showing cached articles
        </div>
      )}

      {/* ARTICLES GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((item) => (
          <div
            key={item.id || item.title}
            onClick={() => navigate(`/articles/${item.id}`)}
            className="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            {/* Article Image */}
            <div className="relative h-48 overflow-hidden">
              <div
                className="h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>

              {item.category && (
                <div className="absolute top-4 left-4">
                  <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </span>
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.desc}
              </p>

              {/* Article Meta */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                {item.date && <span>{item.date}</span>}
                {item.readTime && <span>{item.readTime}</span>}
              </div>

              {/* Read More Button */}
              <div className="flex items-center text-sky-600 font-semibold text-sm group-hover:gap-2 transition-all">
                <span>Read More</span>
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">No articles found.</p>
        </div>
      )}
    </div>
  );
}
