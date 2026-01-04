import express from "express";
import {
  getApprovedFeedbacks,
  getPendingFeedbacks,
  createFeedback,
  approveFeedback,
  deleteFeedback,
} from "../controllers/feedback.controller.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getApprovedFeedbacks);
router.post("/", createFeedback);

/* ADMIN */
router.get("/pending", getPendingFeedbacks);
router.put("/:id/approve", approveFeedback);
router.delete("/:id", deleteFeedback);

export default router;
