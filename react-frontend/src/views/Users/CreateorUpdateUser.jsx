import React, { useEffect } from "react";
import useForm from "../../hooks/useForm";
import { AuthApi } from "../../utils/FunctionAPI";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formObj = {
  name: "",
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
};

function CreateorUpdateUser() {
  const navigate = useNavigate();
  const { user_id = null } = useParams();

  const submitForm = async () => {
    try {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key] !== null ? values[key] : "");
      }
      const { data } = await AuthApi.post(`/save-user-data`, formData);
      if (data && data.status && data.user) {
        let message = "User saved Successfully!";
        toast.success(message);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    } catch (error) {
      let message = "Something went wrong!";
      if (error?.response?.data) {
        let responseMsg = error.response.data.message
          ? error.response.data.message
          : null;
        message = responseMsg ? responseMsg : message;
      }
      toast.error(message);
    }
  };

  const getUserById = async () => {
    try {
      const { data } = await AuthApi.get(`/get-user/${user_id}`);
      if (data && data.status && data.user) {
        const { user } = data;
        setValues({
          ...formObj,
          id: user_id,
          name: user.name,
          email: user.email,
          username: user.username,
        });
      }
    } catch (error) {
      let message = "Something went wrong!!";
      if (error?.response?.data) {
        let responseMsg = error.response.data.message
          ? error.response.data.message
          : null;
        message = responseMsg ? responseMsg : message;
      }
      toast.error(message);
    } 
  };

  const getAddUserData = async () => {
    try {
      const { data } = await AuthApi.get(`/add-user-data`);
      if (data && data.status && data.roles) {
      }
    } catch (error) {
      let message = "Something went wrong!";
      if (error?.response?.data) {
        let responseMsg = error.response.data.message
          ? error.response.data.message
          : null;
        message = responseMsg ? responseMsg : message;
      }
      toast.error(message);
    }
  };
  const { handleChange, handleSubmit, values, setValues } = useForm(submitForm, formObj);
  useEffect(() => {
    getAddUserData();
    if (user_id) {
      getUserById();
    }
  }, [user_id]);
  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} />
    <div
      className="createusers-data-container d-flex flex-column"
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
        <h3 className="m-0">Create User</h3>
      </div>

      <div className="container mt-5">
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={values.name ? values.name : ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={values.email ? values.email : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={values.username ? values.username : ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={values.password ? values.password : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password_confirmation"
                name="password_confirmation"
                value={
                  values.password_confirmation
                    ? values.password_confirmation
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default CreateorUpdateUser;
