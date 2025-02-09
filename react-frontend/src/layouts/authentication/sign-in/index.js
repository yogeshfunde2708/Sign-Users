import React from "react";
import useForm from "../../../hooks/useForm";
import { GuestApi } from "../../../utils/FunctionAPI";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formObj = {
  login: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const submitLoginForm = async () => {
    try {
      const { data } = await GuestApi.post("/login", values);
      if (data && data.user && data.token) {
        const { user, token } = data;
        let message = "Login Successfull!";
        toast.success(message);

        localStorage.setItem("authenticated_user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));

        authLogin(user, token);
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
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-header text-center">
                <h3>Sign In</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="login"
                      aria-describedby="emailHelp"
                      value={values.login ? values.login : ""}
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
                    Don't have an account? <Link to="/sign-up">Sign Up</Link>
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

export default Login;
