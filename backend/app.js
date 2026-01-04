import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { testConnection } from "./config/database.js";

import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import eventRegistrationRoutes from "./routes/eventRegistration.routes.js";
import jobRoutes from "./routes/job.routes.js";
import solutionRoutes from "./routes/solution.routes.js";
import articleRoutes from "./routes/article.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health checks (use /api/health on Vercel)
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/event-registrations", eventRegistrationRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/articles", articleRoutes);

// Avoid running DB tests in production serverless
if (process.env.NODE_ENV !== "production") {
  testConnection().catch((error) =>
    console.error("❌ Database connection failed:", error.message)
  );
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
