import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.warn("MONGODB_URI is not set. Contact submissions will fail until it is configured.");
}

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    }
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "not_connected"
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    await Contact.create({ name, email, phone, message });
    return res.status(201).json({ message: "Thanks. Your message has been saved." });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return res.status(500).json({ error: "Could not save your message right now." });
  }
});

async function start() {
  if (mongoUri) {
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB || "student_management"
    });
    console.log("Connected to MongoDB");
  }

  app.listen(port, () => {
    console.log(`Student Management app running on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Unable to start app:", error);
  process.exit(1);
});
