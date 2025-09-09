const bcrypt = require("bcrypt");
const pool = require("../db/pool");

// helper: normalize pg unique violation messages
function pgErrorToMessage(err) {
  if (err && err.code === "23505") {
    // unique violation
    if (err.detail?.includes("(username)")) return "Username already taken, please choose another!";
    if (err.detail?.includes("(email)")) return "Email already used";
    return "Account already exists";
  }
  return null;
}

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashed]
    );
    return res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    const msg = pgErrorToMessage(err);
    if (msg) return res.status(409).json({ error: msg });
    return res.status(500).json({ error: "Could not register user" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const result = await pool.query(
      "SELECT id, username, email, password FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid password" });

    // success (no JWT yet; you can add later)
    return res.json({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username, email FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ error: "Could not fetch users" });
  }
};