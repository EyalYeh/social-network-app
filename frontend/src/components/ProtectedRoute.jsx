import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const username = localStorage.getItem("username");

  // If no username saved → redirect to login/signup page
  if (!username) {
    return <Navigate to="/" replace />;
  }

  // Otherwise show the protected page
  return children;
}