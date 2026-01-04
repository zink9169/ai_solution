import express from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
// if you haven't created this yet, tell me and I'll paste it again

const router = express.Router();

/* PUBLIC */
router.get("/", getArticles);
router.get("/:id", getArticleById);

/* ADMIN */
router.post("/", authenticateToken, requireAdmin, createArticle);
router.put("/:id", authenticateToken, requireAdmin, updateArticle);
router.delete("/:id", authenticateToken, requireAdmin, deleteArticle);

export default router;
