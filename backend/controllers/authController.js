// controllers/authController.js
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const pool = require("../db/pool");
const { uploadsDir } = require("../middleware/upload");

function pgErrorToMessage(err) {
  if (err && err.code === "23505") {
    if (err.detail?.includes("(username)")) return "Username already taken, please choose another!";
    if (err.detail?.includes("(email)")) return "Email already used";
    return "Account already exists";
  }
  return null;
}

function photoUrl(req, photoPath) {
  if (!photoPath) return null;
  if (/^https?:\/\//i.test(photoPath)) return photoPath;
  return `${req.protocol}://${req.get("host")}${photoPath}`;
}

async function processAvatar(buffer) {
  // Generate two sizes for crisp UI (36px UI → 72px@2x)
  const base = uuid();
  const file1x = `${base}@1x.webp`;
  const file2x = `${base}@2x.webp`;
  const out1x = path.join(uploadsDir, file1x);
  const out2x = path.join(uploadsDir, file2x);

  await sharp(buffer).resize(36, 36).webp({ quality: 85 }).toFile(out1x);
  await sharp(buffer).resize(72, 72).webp({ quality: 85 }).toFile(out2x);

  return { rel1x: `/uploads/${file1x}`, rel2x: `/uploads/${file2x}` };
}

exports.signup = async (req, res) => {
  let { username, email, password } = req.body || {};
  username = (username || "").trim();
  email = (email || "").trim().toLowerCase();
  password = password || "";

  if (!username || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
    const hashed = await bcrypt.hash(password, rounds);

    let rel1x = null, rel2x = null;
    if (req.file && req.file.buffer) {
      const out = await processAvatar(req.file.buffer);
      rel1x = out.rel1x;
      rel2x = out.rel2x;
    }

    await pool.query(
      "INSERT INTO users (username, email, password, profile_photo) VALUES ($1, $2, $3, $4)",
      [username, email, hashed, rel1x]
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        username,
        email,
        profile_photo: rel1x,
        profile_photo_url: photoUrl(req, rel1x),
        profile_photo_2x_url: photoUrl(req, rel2x),
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    const msg = pgErrorToMessage(err);
    if (msg) return res.status(409).json({ error: msg });
    return res.status(500).json({ error: "Could not register user" });
  }
};

exports.login = async (req, res) => {
  let { username, password } = req.body || {};
  username = (username || "").trim();
  password = password || "";

  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const result = await pool.query(
      "SELECT id, username, email, password, profile_photo FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid password" });

    const rel1x = user.profile_photo || null;
    const rel2x = rel1x ? rel1x.replace("@1x.webp", "@2x.webp") : null;

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile_photo: rel1x,
        profile_photo_url: photoUrl(req, rel1x),
        profile_photo_2x_url: photoUrl(req, rel2x),
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, profile_photo FROM users ORDER BY id"
    );
    const rows = result.rows.map((u) => {
      const rel1x = u.profile_photo || null;
      const rel2x = rel1x ? rel1x.replace("@1x.webp", "@2x.webp") : null;
      return {
        ...u,
        profile_photo_url: photoUrl(req, rel1x),
        profile_photo_2x_url: photoUrl(req, rel2x),
      };
    });
    res.json(rows);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ error: "Could not fetch users" });
  }
};
