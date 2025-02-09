import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthApi } from "../../utils/FunctionAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UsersData() {
  const [usersArr, setUsersArr] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [tableMeta, setTableMeta] = useState({ per_page: 25, total: 0 });

  const handleRequestSort = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setTableMeta((prevState) => ({
      ...prevState,
      per_page: parseInt(event.target.value, 10),
    }));
    setPage(0);
  };

  const getUsers = async () => {
    const { per_page } = tableMeta;
    const sortBy = `${order === "desc" ? "-" : ""}${orderBy}`;
    try {
      const { data } = await AuthApi.get(
        `/users-list?per_page=${per_page}&sort=${sortBy}&page=${page + 1}`
      );
      if (data?.status && data?.users) {
        const { users } = data;
        setUsersArr(users.data || []);
        setTableMeta((prevState) => ({
          ...prevState,
          total: users.total || 0,
        }));
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await AuthApi.delete(`/delete-user/${id}`);
      if (data?.status) {
        toast.success("User deleted successfully!");
        getUsers();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  useEffect(() => {
    getUsers();
  }, [tableMeta.per_page, page, orderBy, order]);

  
  return (
    <div
      className="users-data-container d-flex flex-column"
      style={{
        height: "100vh",
        position: "relative",
        padding: "20px",
      }}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}
      >
        <h3 className="m-0">Users List</h3>
        <Link to="/create-user">
          <button className="btn btn-primary">Create User</button>
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersArr.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No users available.
              </td>
            </tr>
          ) : (
            usersArr.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1 + page * tableMeta.per_page}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link
                      className="btn btn-warning btn-sm"
                      to={`/edit-user/${user.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <label>
            Rows per page:
            <select
              value={tableMeta.per_page}
              onChange={(e) => handleChangeRowsPerPage(e)}
            >
              {[5, 10, 25].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <button
            className="btn btn-light btn-sm"
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <span className="mx-2">
            Page {page + 1} of{" "}
            {Math.ceil(tableMeta.total / tableMeta.per_page)}
          </span>
          <button
            className="btn btn-light btn-sm"
            onClick={() => handleChangePage(page + 1)}
            disabled={
              page + 1 >= Math.ceil(tableMeta.total / tableMeta.per_page)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsersData;

