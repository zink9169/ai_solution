import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Jobs() {
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);

  // Modal alert
  const [showAlert, setShowAlert] = useState(false);

  const apiBase = useMemo(() => import.meta.env.VITE_API_URL || "", []);

  const isUploading = status === "uploading";

  // Close modal on ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowAlert(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openModal = (newStatus, newMessage) => {
    setStatus(newStatus);
    setMessage(newMessage);
    setShowAlert(true);
  };

  return (
    <div className="pt-5 font-inter bg-[#f4f6f9]">
      <div className="w-full min-h-[650px] bg-gradient-to-r from-sky-700 to-blue-800 text-white relative">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">
              Submit Your Job Requirement
            </h1>

            <p className="text-lg md:text-xl text-slate-100 leading-relaxed max-w-md">
              Tell us about your project, technical needs, and deadlines. Our
              team will reach out with a customized solution.
            </p>

            <ul className="text-slate-200 space-y-2 text-sm md:text-base">
              <li>✔ Fast response time</li>
              <li>✔ Custom-made solutions</li>
              <li>✔ Professional project review</li>
              <li>✔ 100% confidential</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl border border-slate-200 transform md:-translate-y-6 text-slate-900">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">
              Job Requirement Form
            </h3>

            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();

                // reset UI
                setProgress(0);
                setFileUrl("");

                const form = e.target;
                const file = form.file.files?.[0];

                if (!file) {
                  openModal(
                    "error",
                    "Please choose a file first (PDF/DOC/DOCX)."
                  );
                  return;
                }

                const formData = new FormData();
                formData.append("file", file);
                formData.append("name", form.name.value);
                formData.append("email", form.email.value);
                formData.append("phone", form.phone.value);
                formData.append("country", form.country.value);
                formData.append("job_title", form.job_title.value);

                try {
                  setStatus("uploading");
                  setMessage("Uploading…");
                  setShowAlert(false);

                  const res = await axios.post(
                    `${apiBase}/api/jobs`,
                    formData,
                    {
                      headers: { "Content-Type": "multipart/form-data" },
                      onUploadProgress: (evt) => {
                        if (!evt.total) return;
                        const pct = Math.round((evt.loaded * 100) / evt.total);
                        setProgress(pct);
                      },
                    }
                  );

                  const uploadedUrl = res.data?.fileUrl || "";

                  setFileUrl(uploadedUrl);
                  setProgress(100);

                  // success modal
                  openModal(
                    "success",
                    "Your document is successfully uploaded and stored."
                  );

                  form.reset();
                  setFileName("");
                } catch (err) {
                  const apiMsg =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Upload failed";
                  openModal("error", apiMsg);
                } finally {
                  // if still uploading state, reset to idle after modal opens
                  // (keeps button from being stuck disabled)
                  setTimeout(() => {
                    setStatus((s) => (s === "uploading" ? "idle" : s));
                  }, 200);
                }
              }}
            >
              {/* FILE */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Upload CV / Project File
                </label>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    name="file"
                    disabled={isUploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      setFileName(f?.name || "");
                      setProgress(0);
                      setFileUrl("");
                      setStatus("idle");
                      setMessage("");
                      setShowAlert(false);
                    }}
                  />

                  <span className="text-slate-600 font-medium text-sm">
                    {fileName
                      ? `Selected: ${fileName}`
                      : "Drag & drop or click to upload"}
                  </span>
                  <span className="text-slate-400 text-xs mt-1">
                    (PDF, DOC, DOCX only)
                  </span>
                </label>
              </div>

              {/* PROGRESS */}
              {isUploading && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Uploading…</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded">
                    <div
                      className="h-2 bg-sky-600 rounded transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  disabled={isUploading}
                  className="border border-slate-300 p-3 w-full rounded-md text-black"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  disabled={isUploading}
                  className="border border-slate-300 p-3 w-full rounded-md text-black"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="text"
                  disabled={isUploading}
                  className="border border-slate-300 p-3 w-full rounded-md text-black"
                />
              </div>

              {/* COUNTRY */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Country
                </label>
                <input
                  name="country"
                  type="text"
                  disabled={isUploading}
                  className="border border-slate-300 p-3 w-full rounded-md text-black"
                />
              </div>

              {/* JOB TITLE */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Job Title
                </label>
                <input
                  name="job_title"
                  type="text"
                  disabled={isUploading}
                  className="border border-slate-300 p-3 w-full rounded-md text-black"
                />
              </div>

              {/* SUBMIT */}
              <button
                disabled={isUploading}
                className={[
                  "w-full py-3 rounded-md font-semibold shadow transition",
                  isUploading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-sky-600 hover:bg-sky-700 text-white",
                ].join(" ")}
              >
                {isUploading ? "Uploading…" : "Submit Requirement"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL ALERT */}
      {showAlert && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => setShowAlert(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={[
                "text-4xl mb-2",
                status === "success" ? "text-green-600" : "text-red-600",
              ].join(" ")}
            >
              {status === "success" ? "✔" : "✖"}
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {status === "success" ? "Stored Successfully" : "Upload Failed"}
            </h3>

            <p className="text-slate-600 mb-4">{message}</p>

            {status === "success" && fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block mb-4 text-sky-600 font-medium underline"
              >
                View uploaded file
              </a>
            )}

            <button
              onClick={() => setShowAlert(false)}
              className="mr-4 mt-2 px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
