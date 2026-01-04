import express from "express";
import {
  registerForEvent,
  getAllEventRegistrations,
} from "../controllers/eventRegistration.controller.js";

const router = express.Router();

router.post("/", registerForEvent);
router.get("/", getAllEventRegistrations); // admin use

export default router;
