import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
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