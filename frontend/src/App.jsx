import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Asia from "./pages/Asia";
import Africa from "./pages/Africa";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;