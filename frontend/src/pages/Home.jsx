import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Feed from "../components/Feed";
import Button from "@mui/material/Button";

function Home() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(state?.username || "");

  // fallback if user refreshed (state lost on reload)
  useEffect(() => {
    if (!username) {
      const saved = localStorage.getItem("username");
      if (saved) setUsername(saved);
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("username"); // clear saved user
    navigate("/"); // go back to SignUp/Login page
  };

  return (
    <>
      <div >
        <NavBar />
        <h1>🎉 Welcome {username ? username : "User"}!</h1>
        <Feed currentUser={username}/>
      </div>
    </>
  );
}

export default Home;