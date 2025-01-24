import React from "react";
import { Link } from "react-router-dom";

function UsersData() {
  return (
    <div
      className="users-data-container d-flex flex-column"
      style={{
        height: "100vh",
        position: "relative",
        padding: "20px",
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}
      >
        <h3 className="m-0">Users List</h3>
        <Link to="/create-user">
          <button className="btn btn-primary">Create User</button>
        </Link>
      </div>

      <div className="flex-grow-1">
        <p>No users available.</p>
      </div>
    </div>
  );
}

export default UsersData;
