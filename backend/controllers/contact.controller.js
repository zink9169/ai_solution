import { query } from "../config/database.js";

// Helper: pack structured fields into legacy "message" if DB doesn't have new columns yet
const buildLegacyMessage = ({
  message,
  companyName,
  country,
  job,
  jobDetails,
}) => {
  const parts = [];

  if (companyName) parts.push(`Company: ${companyName}`);
  if (country) parts.push(`Country: ${country}`);
  if (job) parts.push(`Job: ${job}`);
  if (jobDetails) parts.push(`Job Details: ${jobDetails}`);

  // Keep original message if someone still sends it
  if (message && !jobDetails) parts.push(`Requirement: ${message}`);

  return parts.join("\n");
};

// POST - save contact message
export const createContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,

      // new fields
      companyName,
      country,
      job,
      jobDetails,

      // legacy field (old frontend)
      message,
    } = req.body;

    // Validation:
    // For new form: require name, email, jobDetails
    // For old form: require name, email, message
    const requirementText = jobDetails || message;

    if (!name || !email || !requirementText) {
      return res.status(400).json({
        success: false,
        message: "Name, email and requirement details are required",
      });
    }

    // Try new-schema insert first (if columns exist)
    // If it fails due to missing columns, fallback to legacy insert.
    const packedMessage = buildLegacyMessage({
      message,
      companyName,
      country,
      job,
      jobDetails,
    });

    try {
      const result = await query(
        `
        INSERT INTO contact_messages 
          (name, email, phone, company_name, country, job, job_details, message)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `,
        [
          name,
          email,
          phone || null,
          companyName || null,
          country || null,
          job || null,
          jobDetails || null,
          packedMessage, // keep message populated too
        ]
      );

      return res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: result.rows[0],
      });
    } catch (dbErr) {
      // Fallback for old DB schema (no new columns)
      const result = await query(
        `
        INSERT INTO contact_messages (name, email, phone, message)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [name, email, phone || null, packedMessage]
      );

      return res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: result.rows[0],
      });
    }
  } catch (error) {
    console.error("Create contact message error:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending message",
    });
  }
};

// GET - admin use
export const getAllContactMessages = async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );

    return res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get contact messages error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching messages",
    });
  }
};
