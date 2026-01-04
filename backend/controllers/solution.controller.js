import { query } from "../config/database.js";

// GET /api/solutions?type=software|project
export const getSolutions = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type || !["software", "project"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Query param 'type' must be 'software' or 'project'",
      });
    }

    const result = await query(
      `
      SELECT
        id,
        name,
        summary,
        icon_url,
        image_url,
        category,
        features,
        created_at
      FROM solutions
      WHERE type = $1
      ORDER BY created_at DESC
      `,
      [type]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Get solutions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch solutions",
    });
  }
};

// GET /api/solutions/:id
export const getSolutionById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `
      SELECT
        id,
        name,
        summary,
        project_story,
        image_url,
        icon_url,
        type,
        category,
        features,
        created_at
      FROM solutions
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Get solution by id error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch solution",
    });
  }
};
