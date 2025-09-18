const pool = require("../db/pool");

exports.listPosts = async (req,res) => {
    try{
        const {rows} = await pool.query(
            "SELECT id, author, content, likes, created_at FROM posts ORDER BY created_at DESC"
        );
        res.json(rows);
    } catch (e){
        console.error(e);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

exports.createPost = async (req,res) => {
    const { author, content } = req.body;
    if (!author || !content) return res.status(400).json({ error: "Missing fields" });

    try {
        const { rows } = await pool.query(
        `INSERT INTO posts (author, content)
        VALUES ($1, $2)
        RETURNING id, author, content, likes, created_at`,
        [author, content]
        );
        res.status(201).json(rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to create post" });
    }
};

exports.deletePost = async (req, res) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `UPDATE posts SET likes = likes + 1
       WHERE id = $1
       RETURNING id, author, content, likes, created_at`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to like post" });
  }
};