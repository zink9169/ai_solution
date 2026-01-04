import { query } from "../config/database.js";

export const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const r = await query("SELECT is_admin FROM users WHERE id = $1", [userId]);
    if (!r.rows[0]?.is_admin) {
      return res
        .status(403)
        .json({ success: false, message: "Admin access required" });
    }

    next();
  } catch (e) {
    console.error("requireAdmin error:", e);
    res
      .status(500)
      .json({ success: false, message: "Admin verification failed" });
  }
};
