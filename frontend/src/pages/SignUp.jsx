import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const API_BASE = "http://localhost:5000/api/auth"; // matches updated server.js

function SignUp() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // avatar file & preview
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signupRef = useRef();

  // Scroll effect to slide form in
  useEffect(() => {
    const handleScroll = () => {
      if (!signupRef.current) return;
      const top = signupRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) signupRef.current.classList.add("scrolled");
      else signupRef.current.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preview cleanup
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) {
      setAvatarFile(null);
      setPreviewUrl("");
      return;
    }
    // basic client-side checks
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(f.type)) {
      setError("Please choose a JPG/PNG/WEBP/GIF image");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setError("Image must be ≤ 2MB");
      return;
    }
    setError("");
    setAvatarFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!username || !password) {
        setError("Please fill out username and password");
        return;
      }
    } else {
      if (!username || !password || !email) {
        setError("Please fill out username, email, and password");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      let res, data;

      if (isLogin) {
        res = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        data = await res.json().catch(() => ({}));
      } else {
        // Use FormData so we can send an optional file as "avatar"
        const fd = new FormData();
        fd.append("username", username);
        fd.append("email", email);
        fd.append("password", password);
        if (avatarFile) fd.append("avatar", avatarFile);

        res = await fetch(`${API_BASE}/signup`, {
          method: "POST",
          body: fd, // no manual Content-Type
        });
        data = await res.json().catch(() => ({}));
      }

      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }

      // success
      const user = data.user || {};
      const savedUsername = isLogin ? user.username || username : username;
      const savedEmail = isLogin ? user.email || email : email;
      let photo1x = user.profile_photo_url || user.profile_photo || "/default-avatar.png";
      let photo2x = user.profile_photo_2x_url || photo1x;

      localStorage.setItem("username", savedUsername);
      localStorage.setItem("email", savedEmail);
      localStorage.setItem("profilePhoto", photo1x);
      localStorage.setItem("profilePhoto2x", photo2x);

      navigate("/home", { state: { username: savedUsername } });
    } catch (err) {
      console.error(err);
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />

      {/* Opening section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to SocialTravelNet</h1>
            <h2>Scroll down to Sign Up / Log In</h2>
          </div>
        </div>
      </section>

      {/* Sign In/Up section */}
      <section className="signup-section" ref={signupRef}>
        <div className="signup-container">
          <h2 className="gradient-text">{isLogin ? "Login" : "Sign Up"}</h2>

          <form onSubmit={handleSubmit} className="signup-form">
            {!isLogin && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="upload-container">
                  <label className="upload-label">
                     Upload profile picture (optional)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      className="upload-input"
                    />
                  </label>
                </div>

                {previewUrl && (
                  <div className="preview-wrapper">
                    <p className="preview-text">Preview:</p>
                    <img src={previewUrl} alt="preview" className="preview-image" />
                  </div>
                )}  

              </>
            )}

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />

            <Button type="submit" variant="outlined" disabled={loading} sx={{ mt: 1 }}>
              {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          {error && <p className="error-msg">{error}</p>}

          <p className="login-option">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button
              className="toggle-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </Button>
          </p>
        </div>
      </section>

      <footer>
        <p style={{ textAlign: "center" }}>
          &copy; {new Date().getFullYear()} SocialNet
        </p>
      </footer>
    </div>
  );
}

export default SignUp;
