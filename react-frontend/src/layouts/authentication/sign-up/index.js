import React from "react";
import useForm from "../../../hooks/useForm";
import { GuestApi } from "../../../utils/FunctionAPI";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formObj = {
  name: "",
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
};

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const submitLoginForm = async () => {
    try {
      const { data } = await GuestApi.post("/register", values);
      if (data && data.user && data.token) {
        const { user, token } = data;

        let message = "Registration Successful!";
        toast.success(message);

        localStorage.setItem("authenticated_user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));

        register(data.user, data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      let message = "Something went wrong!!";
      if (error?.response?.data) {
        message = error.response.data.message || message;
      }
      toast.error(message);
    }
  };
  const { handleChange, handleSubmit, values } = useForm(
    submitLoginForm,
    formObj
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5 custom-width" >
            <div className="card shadow-lg">
              <div className="card-header text-center">
                <h3>Sign Up</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      aria-describedby="nameHelp"
                      value={values.name ? values.name : ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
                      value={values.email ? values.email : ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      aria-describedby="usernameHelp"
                      value={values.username ? values.username : ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
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

                  <div className="mb-3">
                    <label
                      htmlFor="password_confirmation"
                      className="form-label"
                    >
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
                <div className="mt-3 text-center">
                  <p>
                  Already have an account? <Link to="/sign-in">Sign In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
