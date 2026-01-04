import { query } from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const feedbacks = [
  {
    name: "Kyaw Min Tun",
    occupation: "Retail Business Owner",
    email: "kyawmin@example.com",
    rating: 5,
    message:
      "Their POS and inventory system completely transformed how we manage our stores. Reports are clear, staff training was easy, and support is always responsive.",
  },
  {
    name: "May Thiri Aung",
    occupation: "Operations Manager",
    email: "maythiri@example.com",
    rating: 4,
    message:
      "Very professional team. They delivered our internal management system on time and explained everything clearly.",
  },
  {
    name: "Zaw Lin Htet",
    occupation: "Startup Founder",
    email: "zawlin@example.com",
    rating: 5,
    message:
      "From idea to deployment, the process was smooth. The custom software helped us scale faster.",
  },
  {
    name: "Hnin Pwint Oo",
    occupation: "E-commerce Seller",
    email: "hninp@example.com",
    rating: 5,
    message:
      "Their automation tools saved us hours every day. Order processing is now fully automatic.",
  },
  {
    name: "Aung Ko Ko",
    occupation: "IT Supervisor",
    email: "aungko@example.com",
    rating: 4,
    message:
      "Strong technical knowledge and clear communication. The system is stable and easy to maintain.",
  },
];

const seedFeedbacks = async () => {
  try {
    console.log("🌱 Seeding feedbacks...");

    for (const fb of feedbacks) {
      await query(
        `
        INSERT INTO feedbacks
        (name, occupation, email, rating, message, approved)
        VALUES ($1, $2, $3, $4, $5, true)
        `,
        [fb.name, fb.occupation, fb.email, fb.rating, fb.message]
      );
    }

    console.log("✅ Feedbacks seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding feedbacks:", error);
    process.exit(1);
  }
};

seedFeedbacks();
