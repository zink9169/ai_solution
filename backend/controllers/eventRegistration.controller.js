import { query } from "../config/database.js";

// POST /api/event-registrations
export const registerForEvent = async (req, res) => {
  try {
    const { event_title, event_date, full_name, email, phone } = req.body;

    if (!event_title || !full_name || !email) {
      return res.status(400).json({
        success: false,
        message: "Event title, name and email are required",
      });
    }

    await query(
      `
      INSERT INTO event_registrations
        (event_title, event_date, full_name, email, phone)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [event_title, event_date || null, full_name, email, phone || null]
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Event registration error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register for event",
    });
  }
};

// GET /api/event-registrations (ADMIN)
export const getAllEventRegistrations = async (req, res) => {
  try {
    const result = await query(`
      SELECT *
      FROM event_registrations
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
};
