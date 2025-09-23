import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Feed from "../components/Feed";
import Button from "@mui/material/Button";
import './Home.css'

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

        <h1 className="continent-heading">Whats on your mind {username ? username : "User"}? </h1>
        <div className="image-container">
          
          <div className="image-wrapper">
            <NavLink to="/asia" className="asia-card-link">
              <div className="image-card">
                <img src="asia.png" alt="Asia" className="image-card-img"/>
                <div className="image-card-overlay">
                  <h2 className="image-card-title">Asia</h2>
                </div>
              </div>
            </NavLink>
          </div>

          <div className="image-wrapper">
            <NavLink to="/africa" className="africa-card-link">
              <div className="image-card">
                <img src="africa.png" alt="Asia" className="image-card-img"/>
                <div className="image-card-overlay">
                  <h2 className="image-card-title">Africa</h2>
                </div>
              </div>
            </NavLink>
          </div>

          <div className="image-wrapper">
            <NavLink to="/europe" className="europe-card-link">
              <div className="image-card">
                <img src="europe.png" alt="Asia" className="image-card-img"/>
                <div className="image-card-overlay">
                  <h2 className="image-card-title">Europe</h2>
                </div>
              </div>
            </NavLink>
          </div>

          <div className="image-wrapper">
            <NavLink to="/africa" className="south-america-card-link">
              <div className="image-card">
                <img src="south-america.png" alt="Asia" className="image-card-img"/>
                <div className="image-card-overlay">
                  <h2 className="image-card-title">South America</h2>
                </div>
              </div>
            </NavLink>
          </div>

        </div>

        <div className="image-container">
            <div className="image-wrapper">
            <NavLink to="/north-america" className="north-america-card-link">
              <div className="image-card">
                <img src="north-america.png" alt="Asia" className="image-card-img"/>
                <div className="image-card-overlay">
                  <h2 className="image-card-title">North America</h2>
                </div>
              </div>
            </NavLink>
          </div>
            <div className="image-wrapper">
            <NavLink to="/oceania" className="oceania-card-link">
              <div className="image-card">
                <img src="oceania.png" alt="Asia" className="image-card-img"/>
                <div className="image-card-overlay">
                  <h2 className="image-card-title">Oceania</h2>
                </div>
              </div>
            </NavLink>
          </div>
            <div className="image-wrapper">
            <NavLink to="/antarctica" className="antarctica-card-link">
              <div className="image-card">
                <img src="antarctica.png" alt="Asia" className="image-card-img"/>
                <div className="image-card-overlay">
                  <h2 className="image-card-title">Antarctica</h2>
                </div>
              </div>
            </NavLink>
          </div>

        </div>
        
        <Feed currentUser={username}/>
      </div>
    </>
  );
}

export default Home;