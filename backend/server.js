// server.js
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const postsRouter = require("./routes/postsRoutes");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.set("json spaces", 2);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", authRoutes);   
app.use("/api/posts", postsRouter); 

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}/api/auth`);
});


