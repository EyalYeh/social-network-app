import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Home from "./Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element=
          { <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;