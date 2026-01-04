import express from "express";
import { upload } from "../middleware/upload.js";
import { createJobRequirement, getAllJobRequirements, getJobRequirementById } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/", upload.single("file"), createJobRequirement);
router.get("/", getAllJobRequirements); // LIST
router.get("/:id", getJobRequirementById);
export default router;
