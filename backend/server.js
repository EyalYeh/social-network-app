// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// import routes
const authRoutes = require("./routes/authRoutes");

const app = express();

app.set("json spaces", 2);

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // adjust port if your frontend runs elsewhere
app.use(express.json());

// routes
app.use("/", authRoutes);

// health check route
app.get("/health", (req, res) => res.json({ ok: true }));

// start server
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});