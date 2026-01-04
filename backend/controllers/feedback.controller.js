import { query } from "../config/database.js";

/**
 * PUBLIC: Get approved feedback only
 * Used by frontend slider
 */
export const getApprovedFeedbacks = async (req, res) => {
  try {
    const result = await query(
      `
      SELECT id, name, occupation, rating, message, created_at
      FROM feedbacks
      WHERE approved = true
      ORDER BY created_at DESC
      `
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get approved feedbacks error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedbacks",
    });
  }
};

/**
 * ADMIN: Get unapproved feedbacks
 * Only admin should use this
 */
export const getPendingFeedbacks = async (req, res) => {
  try {
    const result = await query(
      `
      SELECT *
      FROM feedbacks
      WHERE approved = false
      ORDER BY created_at DESC
      `
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get pending feedbacks error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending feedbacks",
    });
  }
};

/**
 * PUBLIC: Submit feedback (always unapproved)
 */
export const createFeedback = async (req, res) => {
  try {
    const { name, occupation, email, rating, message } = req.body;

    if (!name || !message || !rating) {
      return res.status(400).json({
        success: false,
        message: "Name, rating and message are required",
      });
    }

    const result = await query(
      `
      INSERT INTO feedbacks
        (name, occupation, email, rating, message, approved)
      VALUES
        ($1, $2, $3, $4, $5, false)
      RETURNING id
      `,
      [name, occupation || null, email || null, rating, message]
    );

    res.status(201).json({
      success: true,
      message: "Feedback submitted and awaiting approval",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Create feedback error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback",
    });
  }
};

/**
 * ADMIN: Approve feedback
 */
export const approveFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `
      UPDATE feedbacks
      SET approved = true
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.json({
      success: true,
      message: "Feedback approved",
    });
  } catch (error) {
    console.error("Approve feedback error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve feedback",
    });
  }
};

/**
 * ADMIN: Delete feedback
 */
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      "DELETE FROM feedbacks WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.json({
      success: true,
      message: "Feedback deleted",
    });
  } catch (error) {
    console.error("Delete feedback error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete feedback",
    });
  }
};
