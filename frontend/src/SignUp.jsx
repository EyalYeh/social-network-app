import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";

function SignUp() {

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

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

  if (!username || !password || !email) {
    setError("Please fill out the information!");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Signup successful
      setLoggedInUser(username);
      setError("");
    } else {
      // Backend returned an error
      setError(data.error || "Signup failed");
    }
  } catch (err) {
    setError("Could not connect to server");
    console.error(err);
  }
};


  return (
    <div>
      {/* Hero section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to Our Site</h1>
            <h2>Scroll down to Sign Up / Log In</h2>
          </div>
        </div>
      </section>

      {/* Sign In section */}
      <section className="signup-section" ref={signupRef}>
        {!loggedInUser ? (
          <div className="signup-container">
            <h2 className="gradient-text">Sign Up</h2>
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
              <Button type="submit" variant="outlined">
              {isLogin ? "Login" : "Sign In"}
              </Button>
            </form>
            {error && <p className="error-msg">{error}</p>}
            <p className="login-option">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Button
                className="toggle-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign In" : "Login"}
              </Button>
            </p>
          </div>
        ) : (
          <h2 className="welcome-msg">🎉 Welcome, {loggedInUser}!</h2>
        )}
      </section>
    </div>
  );
}

export default SignUp;
