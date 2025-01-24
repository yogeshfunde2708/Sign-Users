import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import SignUp from "./layouts/authentication/sign-up";
import SignIn from "./layouts/authentication/sign-in";
import AuthProvider from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./views/Sidebar/Sidebar";

function App() {
  const location = useLocation();

  const isAuthRoute =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  const isDashboardRoute = location.pathname === "/";

  return (
    <AuthProvider>
      <div className="d-flex">
        {!isAuthRoute && (
          <div
            className="sidebar bg-dark text-white position-fixed vh-100"
            style={{ width: "225px" }}
          >
            <Sidebar />
          </div>
        )}

        {isDashboardRoute ? (
          <div
            className="content flex-grow-1"

          >
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
