import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const username = localStorage.getItem("username");

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
}