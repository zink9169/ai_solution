import { useState } from "react";
import { API_BASE } from "../utils/apiBase";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    const form = e.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      companyName: form.companyName.value,
      country: form.country.value,
      job: form.job.value,
      jobDetails: form.jobDetails.value,
    };

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setSuccessMsg("Message sent successfully. We’ll contact you soon.");
      form.reset();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-inter overflow-hidden">
      <div
        className="relative w-full min-h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3182771/pexels-photo-3182771.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-5xl mx-auto min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-sm bg-white/20 backdrop-blur-xl p-6 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-3">Contact Us</h3>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                name="name"
                required
                placeholder="Your Name"
                className="w-full p-2.5 rounded bg-white/25 text-white placeholder-white/70"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Your Email"
                className="w-full p-2.5 rounded bg-white/25 text-white placeholder-white/70"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className="w-full p-2.5 rounded bg-white/25 text-white placeholder-white/70"
              />

              <input
                name="companyName"
                placeholder="Company Name"
                className="w-full p-2.5 rounded bg-white/25 text-white placeholder-white/70"
              />

              <input
                name="country"
                placeholder="Country"
                className="w-full p-2.5 rounded bg-white/25 text-white placeholder-white/70"
              />

              <input
                name="job"
                placeholder="Job Title"
                className="w-full p-2.5 rounded bg-white/25 text-white placeholder-white/70"
              />

              <textarea
                name="jobDetails"
                rows="3"
                required
                placeholder="Company Requirement / Job Details"
                className="w-full p-2.5 rounded bg-white/25 text-white placeholder-white/70"
              />

              <button
                disabled={submitting}
                className={`w-full py-2.5 rounded-lg font-semibold ${
                  submitting
                    ? "bg-slate-400"
                    : "bg-sky-600 hover:bg-sky-700 text-white"
                }`}
              >
                {submitting ? "Sending..." : "Submit"}
              </button>
            </form>

            {successMsg && <p className="mt-3 text-green-200">{successMsg}</p>}
            {errorMsg && <p className="mt-3 text-red-200">{errorMsg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
