import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

function Home() {
  const { state } = useLocation();
  const [username, setUsername] = useState(state?.username || "");

  // fallback if user refreshed (state lost on reload)
  useEffect(() => {
    if (!username) {
      const saved = localStorage.getItem("username");
      if (saved) setUsername(saved);
    }
  }, [username]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh", // full screen height
      textAlign: "center",
    }}>
       <NavBar/>
      <h1>🎉 Welcome {username ? username : "User"}!</h1>
      <p>This is your separate page after signing up.</p>
    </div>
  );
}

export default Home;