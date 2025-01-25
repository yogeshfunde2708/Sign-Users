import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authToken, isLoading } = useAuth();

  const tokenExists = localStorage.getItem("authToken");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !authToken || !tokenExists) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}

export default ProtectedRoute;
