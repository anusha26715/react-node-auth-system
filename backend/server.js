// backend/server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const SQLiteStore = require("connect-sqlite3")(session);

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS (Frontend URL from ENV for flexibility)
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,     // ✅ Vercel frontend
      "http://localhost:5000"     // ✅ local dev frontend
    ],
    credentials: true,
  })
);

app.set("trust proxy", 1);

// ✅ Session setup (SQLite for persistence across restarts)
app.use(
  session({
    store: new SQLiteStore({ db: "sessions.sqlite" }),
    secret: process.env.SESSION_SECRET || "defaultSecretKey",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // needed for cross-origin cookies
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// ✅ Routes
app.use("/auth", authRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Global error handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});


