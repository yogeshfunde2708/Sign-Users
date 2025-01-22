import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./layouts/authentication/sign-up";
import Dashboard from "./views/Dashboard/Dashboard";
import AuthProvider from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
