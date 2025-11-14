import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token"); // or whatever you store

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
