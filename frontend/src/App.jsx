import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Home from "./Home";
import Profile from "./Profile";
import Chat from "./Chat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element= { <ProtectedRoute><Home /> </ProtectedRoute>} />
        <Route path="/profile" element= { <ProtectedRoute><Profile /> </ProtectedRoute>} />
        <Route path="/chat" element= { <ProtectedRoute><Chat /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;