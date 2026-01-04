import { useState, useEffect } from "react";
import { API_BASE } from "../utils/apiBase";

export default function Feedback() {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);

  const [selectedRating, setSelectedRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Load testimonials
  useEffect(() => {
    fetch(`${API_BASE}/api/feedback`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setTestimonials(data.data);
          setIndex(0);
        }
      });
  }, []);

  // Auto slide
  useEffect(() => {
    if (testimonials.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials]);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    const form = e.target;

    const payload = {
      name: form.name.value,
      occupation: form.occupation.value,
      email: form.email.value,
      rating: selectedRating,
      message: form.message.value,
    };

    try {
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccessMsg("✅ Feedback submitted. Thank you!");
      form.reset();
      setSelectedRating(0);
    } catch (err) {
      setErrorMsg(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-10 pb-24 max-w-5xl mx-auto px-6 font-inter">
      <h2 className="text-4xl font-bold text-sky-600 text-center mb-12">
        Customer Testimonials
      </h2>

      {/* SLIDER */}
      {testimonials.length > 0 && (
        <div className="relative flex items-center justify-center mb-20">
          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="text-6xl px-6 text-slate-600 hover:text-sky-600 transition select-none"
          >
            ‹
          </button>

          {/* CARD */}
          <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl border">
            <h3 className="font-semibold text-xl text-slate-900">
              {testimonials[index].name}
            </h3>
            <p className="text-sm text-slate-600">
              {testimonials[index].occupation}
            </p>

            <div className="mt-2">
              {renderStars(testimonials[index].rating)}
            </div>

            <p className="mt-4 italic text-slate-700 leading-relaxed">
              “{testimonials[index].message}”
            </p>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            className="text-6xl px-6 text-slate-600 hover:text-sky-600 transition select-none"
          >
            ›
          </button>
        </div>
      )}

      {/* FEEDBACK FORM */}
      <h3 className="text-2xl font-bold text-center mb-6">
        Leave Your Feedback
      </h3>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl space-y-4 max-w-xl mx-auto"
      >
        <input
          name="name"
          required
          placeholder="Your Name"
          className="w-full border p-3 rounded"
        />

        <input
          name="occupation"
          placeholder="Occupation"
          className="w-full border p-3 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        {/* STAR PICKER */}
        <div className="flex text-3xl cursor-pointer">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => setSelectedRating(num)}
              className={
                num <= selectedRating
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-yellow-300"
              }
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          name="message"
          required
          rows="4"
          placeholder="Your feedback"
          className="w-full border p-3 rounded"
        />

        <button
          disabled={submitting}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            submitting ? "bg-gray-400" : "bg-sky-600 hover:bg-sky-700"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>

        {successMsg && <p className="text-green-600">{successMsg}</p>}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      </form>
    </div>
  );
}
