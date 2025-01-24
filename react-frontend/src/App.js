import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import SignUp from "./layouts/authentication/sign-up";
import SignIn from "./layouts/authentication/sign-in";
import AuthProvider from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./views/Sidebar/Sidebar";
import UsersData from "./views/Users/UsersData";
import CreateorUpdateUser from "./views/Users/CreateorUpdateUser";

function App() {
  const location = useLocation();

  const isAuthRoute =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

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

        <div
          className={`content flex-grow-1`}
          style={{
            marginLeft: !isAuthRoute ? "225px" : "0", 
            padding: !isAuthRoute ? "20px" : "0",
          }}
        >
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usersdata"
              element={
                <ProtectedRoute>
                  <UsersData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-user"
              element={
                <ProtectedRoute>
                  <CreateorUpdateUser />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
