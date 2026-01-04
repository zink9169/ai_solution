import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Full article data with complete content (fallback)
const articlesData = {
  1: {
    id: 1,
    title: "How AI is Transforming Modern Businesses",
    author: "Sarah Johnson",
    date: "January 15, 2024",
    category: "Technology",
    readTime: "8 min read",
    img: "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=1600",
    excerpt:
      "AI automation, data insights, and predictive analytics are reshaping how companies operate today.",
    content: `
      <p class="lead">Artificial Intelligence has moved from science fiction to boardroom reality, fundamentally changing how businesses operate, compete, and deliver value to customers.</p>
      <h2>The AI Revolution in Business Operations</h2>
      <p>In today's fast-paced digital economy, artificial intelligence is no longer a luxury—it's a necessity. Companies across industries are leveraging AI to automate processes, gain insights from data, and create more personalized customer experiences.</p>
      <h3>1. Automation and Efficiency</h3>
      <p>One of the most immediate impacts of AI in business is automation. From customer service chatbots to automated inventory management, AI systems are handling repetitive tasks that once required human intervention. This not only reduces operational costs but also allows employees to focus on strategic, creative work.</p>
      <p>For example, retail companies are using AI-powered systems to predict demand, optimize pricing, and manage supply chains. These systems analyze vast amounts of data in real-time, making decisions that would take humans hours or days to process.</p>
      <h3>2. Data-Driven Decision Making</h3>
      <p>AI excels at finding patterns in large datasets that humans might miss. Machine learning algorithms can analyze customer behavior, market trends, and operational metrics to provide actionable insights. This enables businesses to make more informed decisions faster.</p>
      <p>Financial institutions use AI to detect fraudulent transactions, assess credit risk, and provide personalized investment advice. Healthcare organizations leverage AI to analyze medical images, predict patient outcomes, and optimize treatment plans.</p>
      <h3>3. Enhanced Customer Experience</h3>
      <p>AI-powered personalization is transforming how businesses interact with customers. Recommendation engines suggest products based on browsing history, chatbots provide instant support, and voice assistants make interactions more natural and convenient.</p>
      <p>E-commerce platforms have seen significant increases in conversion rates through AI-driven product recommendations. Streaming services keep users engaged with personalized content suggestions. These technologies create more relevant, engaging experiences that drive customer loyalty.</p>
      <h2>Challenges and Considerations</h2>
      <p>While AI offers tremendous opportunities, businesses must also navigate challenges. Data privacy concerns, algorithmic bias, and the need for skilled talent are all important considerations. Companies must invest in responsible AI practices and ensure transparency in how AI systems make decisions.</p>
      <h2>The Future of AI in Business</h2>
      <p>As AI technology continues to evolve, we can expect even more transformative changes. Generative AI is already creating new possibilities for content creation, product design, and problem-solving. The businesses that successfully integrate AI into their operations today will be best positioned to thrive in the future.</p>
      <p>The key to success is starting with clear objectives, investing in the right technologies, and ensuring that AI complements rather than replaces human expertise. The future belongs to businesses that can effectively combine the power of AI with human creativity and judgment.</p>
    `,
  },
  2: {
    id: 2,
    title: "Building Better Software: Clean Architecture Explained",
    author: "Michael Chen",
    date: "January 10, 2024",
    category: "Development",
    readTime: "12 min read",
    img: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1600",
    excerpt:
      "Clean, maintainable architecture reduces bugs and builds long-term scalability.",
    content: `
      <p class="lead">Clean architecture isn't just a buzzword—it's a fundamental approach to building software that stands the test of time.</p>
      <h2>What is Clean Architecture?</h2>
      <p>Clean architecture is a software design philosophy that emphasizes separation of concerns, independence from frameworks, and testability...</p>
    `,
  },
  3: {
    id: 3,
    title: "Why Your Business Needs Cloud Computing",
    author: "Emily Rodriguez",
    date: "January 5, 2024",
    category: "Cloud",
    readTime: "10 min read",
    img: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1600",
    excerpt:
      "Cloud systems increase speed, reduce costs, and offer better security for growing companies.",
    content: `
      <p class="lead">Cloud computing has become the backbone of modern business operations...</p>
    `,
  },
  4: {
    id: 4,
    title: "Cybersecurity Essentials for 2025",
    author: "David Kim",
    date: "December 28, 2023",
    category: "Security",
    readTime: "15 min read",
    img: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1600",
    excerpt:
      "Protecting your business from data breaches and cyber threats is more important than ever.",
    content: `
      <p class="lead">In an increasingly digital world, cybersecurity is not just an IT concern...</p>
    `,
  },
  5: {
    id: 5,
    title: "The Future of Automation in Workplaces",
    author: "Lisa Anderson",
    date: "December 20, 2023",
    category: "Automation",
    readTime: "9 min read",
    img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600",
    excerpt:
      "Automation tools streamline processes, reduce human error, and increase productivity.",
    content: `
      <p class="lead">Workplace automation is reshaping how we work...</p>
    `,
  },
  6: {
    id: 6,
    title: "How to Successfully Manage Software Projects",
    author: "James Wilson",
    date: "December 15, 2023",
    category: "Project Management",
    readTime: "11 min read",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
    excerpt:
      "Roadmaps, agile planning, and teamwork are key elements to any successful software project.",
    content: `
      <p class="lead">Successful software project management requires a blend of technical expertise...</p>
    `,
  },
};

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const mapApiArticleToUi = (a) => ({
  // keep DB fields too (so you can use them if you want)
  ...a,
  img:
    a?.image_url ||
    "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=1600",
  date: formatDate(a?.created_at) || formatDate(new Date()),
  readTime: a?.read_time || "5 min read",
  excerpt: a?.excerpt || a?.content?.slice(0, 160) || "",
  author: a?.author || "Admin",
  category: a?.category || "General",
});

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const apiBase = useMemo(() => import.meta.env.VITE_API_URL || "", []);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadArticle = async () => {
      setLoading(true);

      // Timeout (works in all browsers)
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      try {
        const res = await fetch(`${apiBase}/api/articles/${id}`, {
          signal: controller.signal,
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.success && data?.data) {
            setArticle(mapApiArticleToUi(data.data));
            return;
          }
        }
      } catch (err) {
        // ignore abort errors (we will fallback)
        if (err?.name !== "AbortError") {
          // optional: console.log(err);
        }
      } finally {
        clearTimeout(timeoutId);
      }

      // Fallback to local data
      const local = articlesData[id];
      if (local) {
        setArticle(local);
      } else {
        navigate("/articles");
      }

      setLoading(false);
    };

    loadArticle();
    return () => controller.abort();
  }, [apiBase, id, navigate]);

  // Ensure loading becomes false even if API success
  useEffect(() => {
    if (article) setLoading(false);
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Article Not Found
          </h2>
          <button
            onClick={() => navigate("/articles")}
            className="text-sky-600 hover:underline"
          >
            ← Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div
        className="h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${article.img})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-8 w-full">
            <div className="inline-block bg-sky-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {article.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <span>By {article.author || "Admin"}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/articles")}
          className="flex items-center gap-2 text-slate-600 hover:text-sky-600 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Articles
        </button>

        {/* Article Body */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:text-slate-700 prose-li:my-2 prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-h4:mt-6 prose-h4:mb-2"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Share this article
          </h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Facebook
            </button>
            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
              Twitter
            </button>
            <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors">
              LinkedIn
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles Section (fallback local list) */}
      <div className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(articlesData)
              .filter((a) => String(a.id) !== String(article.id))
              .slice(0, 3)
              .map((relatedArticle) => (
                <div
                  key={relatedArticle.id}
                  onClick={() => navigate(`/articles/${relatedArticle.id}`)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${relatedArticle.img})` }}
                  ></div>
                  <div className="p-6">
                    <div className="text-xs text-sky-600 font-semibold mb-2">
                      {relatedArticle.category}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{relatedArticle.date}</span>
                      <span className="text-sky-600 font-semibold">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
