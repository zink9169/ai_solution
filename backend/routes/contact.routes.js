import express from "express";
import {
  createContactMessage,
  getAllContactMessages,
} from "../controllers/contact.controller.js";

const router = express.Router();

// Public: submit contact form
router.post("/", createContactMessage);

// Admin: get all contact messages
router.get("/", getAllContactMessages);

export default router;
