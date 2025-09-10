import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function SignUp() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signupRef = useRef();

  // Scroll effect to slide form in
  useEffect(() => {
    const handleScroll = () => {
      if (!signupRef.current) return;
      const top = signupRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight - 100) {
        signupRef.current.classList.add("scrolled");
      } else {
        signupRef.current.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Only require email for signup
    if (!username || !password || (!isLogin && !email)) {
      setError("Please fill out the information!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // If you add a /login endpoint later, this will work for both modes:
      const endpoint = isLogin ? "login" : "signup";
      const body = isLogin
        ? { username, password }
        : { username, email, password };

      const res = await fetch(`http://localhost:5000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // Save something lightweight for the welcome page fallback
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        // Navigate to the separate page
        navigate("/home", { state: { username } });
      } else {
        setError(data.error || "Request failed");
      }
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
      {/* Hero section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to SocialNet</h1>
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
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="outlined" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          {error && <p className="error-msg">{error}</p>}
          <p className="login-option">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
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