import { useState } from "react";
import { API_BASE } from "../utils/apiBase";
export default function Gallery() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const events = [
    {
      date: "March 12, 2025",
      title: "AI Innovation Workshop",
      desc: "Hands-on exploration of AI tools, automation workflows, and real-world business integrations.",
      img: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      date: "April 5, 2025",
      title: "Tech Leadership Talk",
      desc: "A deep transformation talk focusing on digital leadership, modern software trends, and future-thinking mindsets.",
      img: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      date: "May 20, 2025",
      title: "Future of Automation Conference",
      desc: "Industry experts sharing insights on intelligent systems, enterprise automation and large-scale AI adoption.",
      img: "https://images.pexels.com/photos/3182806/pexels-photo-3182806.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      date: "June 14, 2025",
      title: "Cloud Computing Summit",
      desc: "A premium summit discussing serverless, cloud-native architecture, and global-scale infrastructure.",
      img: "https://images.pexels.com/photos/3184771/pexels-photo-3184771.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  const galleryImages = [
    "https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3183157/pexels-photo-3183157.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/288477/pexels-photo-288477.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3184308/pexels-photo-3184308.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const form = e.target;

    const payload = {
      event_title: selectedEvent.title,
      event_date: selectedEvent.date,
      full_name: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
    };

    try {
      const res = await fetch(`${API_BASE}/api/event-registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMsg("🎉 Registration successful!");
      form.reset();

      setTimeout(() => {
        setSelectedEvent(null);
        setSuccessMsg("");
      }, 2000);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-6 font-inter">
      {/* PAGE TITLE */}
      <h2 className="text-3xl md:text-4xl font-bold text-sky-600 text-center mb-12">
        Gallery & Events
      </h2>

      {/* UPCOMING EVENTS */}
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        Upcoming Events
      </h3>

      <div className="grid md:grid-cols-2 gap-10">
        {events.map((event, i) => (
          <div
            key={i}
            onClick={() => setSelectedEvent(event)}
            className="cursor-pointer rounded-xl shadow-lg overflow-hidden"
          >
            <img src={event.img} className="h-64 w-full object-cover" />
            <div className="p-6 bg-white">
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-slate-600">{event.date}</p>
              <p className="text-sm mt-2">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* GALLERY SECTION */}
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Event Gallery</h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((src, i) => (
          <div
            key={i}
            className="
              group relative overflow-hidden rounded-xl shadow-lg 
              transition hover:shadow-xl cursor-pointer
            "
          >
            <img
              src={src}
              alt="Gallery"
              className="
                h-56 w-full object-cover 
                transition duration-500 
                group-hover:scale-110
              "
            />
            {/* Dark overlay on hover */}
            <div
              className="
              absolute inset-0 bg-black/30 opacity-0 
              group-hover:opacity-100 transition duration-500
            "
            />
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="fullName"
                required
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full border px-4 py-2 rounded"
              />
              <input
                name="phone"
                placeholder="Phone"
                className="w-full border px-4 py-2 rounded"
              />

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 rounded text-white ${
                  submitting ? "bg-gray-400" : "bg-sky-600 hover:bg-sky-700"
                }`}
              >
                {submitting ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-3 rounded text-center">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-3 rounded text-center">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
