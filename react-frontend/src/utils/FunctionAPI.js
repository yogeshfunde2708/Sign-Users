import axios from "axios";

const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;

const GuestApi = axios.create({
  baseURL: REACT_APP_API_URL,
});

let accessToken = null;
if (localStorage.getItem("token") != null) {
  const token = JSON.parse(localStorage.getItem("token"));
  accessToken = token;
}

const AuthApi = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "X-FP-API-KEY": `${REACT_APP_API_KEY}`,
  },
});

export { GuestApi, AuthApi, REACT_APP_API_URL };
