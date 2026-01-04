import { query } from "../config/database.js";
import { supabaseAdmin } from "../config/supabase.js";
import { v4 as uuidv4 } from "uuid";

/**
 * POST /api/jobs
 * Public: submit job requirement
 */
export const createJobRequirement = async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({
        success: false,
        message:
          "Supabase admin not configured. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env and restart the server.",
      });
    }

    const { name, email, phone, country, job_title } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    let fileUrl = null;

    if (req.file) {
      const ext = req.file.originalname.includes(".")
        ? req.file.originalname.split(".").pop()
        : "bin";

      const fileName = `jobs/${uuidv4()}.${ext}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("job-files")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        return res.status(400).json({
          success: false,
          message: `Supabase upload failed: ${uploadError.message}`,
        });
      }

      const { data } = supabaseAdmin.storage
        .from("job-files")
        .getPublicUrl(fileName);

      fileUrl = data?.publicUrl || null;
    }

    const result = await query(
      `
      INSERT INTO job_requirements
      (name, email, phone, country, job_title, file_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
      `,
      [name, email, phone || null, country || null, job_title || null, fileUrl]
    );

    res.status(201).json({
      success: true,
      message: "Job requirement submitted successfully",
      id: result.rows[0].id,
      fileUrl,
    });
  } catch (err) {
    console.error("Job submission error:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Failed to submit job requirement",
    });
  }
};

/**
 * GET /api/jobs
 * Public: list all job submissions
 */
export const getAllJobRequirements = async (req, res) => {
  try {
    const result = await query(`
      SELECT id, name, email, phone, country, job_title, file_url, created_at
      FROM job_requirements
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error("Get jobs error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job submissions",
    });
  }
};

/**
 * GET /api/jobs/:id
 * Public: get one job submission detail
 */
export const getJobRequirementById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `
      SELECT id, name, email, phone, country, job_title, file_url, created_at
      FROM job_requirements
      WHERE id = $1
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Job submission not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Get job detail error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job submission detail",
    });
  }
};
