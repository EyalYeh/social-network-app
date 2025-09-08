const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");   // ← import Postgres pool

const app = express();
app.use(cors());
app.use(express.json());

// ← This is where your snippet goes
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myapp",
  password: "Eyal5618!", // <-- your Postgres password
  port: 5432,
});

// Test route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users"); // test query
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

const bcrypt = require("bcrypt");

// Signup route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not register user" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password} = req.body;
   if (!username || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];
    
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

   res.json({ message: "Login successful", user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
  
});

