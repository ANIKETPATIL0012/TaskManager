import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return user ? children : <Navigate to="/" />;
git commit -m "updated login and profile fix"}
