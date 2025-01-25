import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../../AuthContext";

function Sidebar() {
  const { setAuthToken, setAuthenticatedUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authenticatedUser");

    setAuthToken(null);
    setAuthenticatedUser(null);

    window.location.href = "/sign-in";
  };
  return (
    <div className="d-flex flex-column justify-content-between p-4 h-100">
      <div>
        <Link to="/" className="d-flex " style={{ textDecoration: "none" }}>
          <span className="fs-4 align-items-center">SignUsers</span>
        </Link>
        <hr className="text-secondary mt-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
          <li className="nav-item p-1">
            <Link to="/" className="nav-link text-white">
              <MdDashboard />
              <span className="ms-2"> Dashboard</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link to="usersdata" className="nav-link text-white">
              <FaUser />
              <span className="ms-2"> Users</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <span
              className="nav-link text-white"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              <CiLogout />
              <span className="ms-2"> Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
