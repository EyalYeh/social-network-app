import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Asia from "./pages/Continents/Asia";
import Africa from "./pages/Continents/Africa";
import Europe from "./pages/Continents/Europe";
import NorthAmerica from "./pages/Continents/NorthAmerica";
import SouthAmerica from "./pages/Continents/SouthAmerica";
import Oceania from "./pages/Continents/Oceania";
import Antarctica from "./pages/Continents/Antarctica";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element= { <ProtectedRoute><Home /> </ProtectedRoute>} />
        <Route path="/profile" element= { <ProtectedRoute><Profile /> </ProtectedRoute>} />
        <Route path="/chat" element= { <ProtectedRoute><Chat /> </ProtectedRoute>} />
        <Route path="/asia" element= { <ProtectedRoute><Asia /> </ProtectedRoute>} />
        <Route path="/africa" element= { <ProtectedRoute><Africa /> </ProtectedRoute>} />
        <Route path="/europe" element= { <ProtectedRoute><Europe /> </ProtectedRoute>} />
        <Route path="/north-america" element= { <ProtectedRoute><NorthAmerica /> </ProtectedRoute>} />
        <Route path="/south-america" element= { <ProtectedRoute><SouthAmerica /> </ProtectedRoute>} />
        <Route path="/oceania" element= { <ProtectedRoute><Oceania /> </ProtectedRoute>} />
        <Route path="/antarctica" element= { <ProtectedRoute><Antarctica /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;