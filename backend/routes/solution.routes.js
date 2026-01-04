import express from "express";
import {
  getSolutions,
  getSolutionById,
} from "../controllers/solution.controller.js";

const router = express.Router();

router.get("/", getSolutions);
router.get("/:id", getSolutionById);

export default router;
