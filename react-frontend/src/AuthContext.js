import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        authToken: action.payload.token,
        authenticatedUser: action.payload.user,
        isLoading: false,
      };
    case "SET_AUTH_TOKEN":
      return { ...state, authToken: action.payload };
    case "SET_AUTHENTICATED_USER":
      return { ...state, authenticatedUser: action.payload };
    case "AUTH_COMPLETE":
      return { ...state, isLoading: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const initialState = {
  isAuthenticated: false,
  authToken: null,
  authenticatedUser: null,
  isLoading: true,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("authenticatedUser"))
    ? JSON.parse(localStorage.getItem("authenticatedUser"))
    : null;

    if (token && user) {
      dispatch({ type: "LOGIN", payload: { token, user } });
    } else {
      console.log("No auth data in localStorage");
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authenticatedUser", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const register = (user, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authenticatedUser", JSON.stringify(user));
    dispatch({ type: "REGISTER", payload: { user, token } });
  };

  const setAuthToken = (token) => {
    localStorage.setItem("authToken", token);
    dispatch({ type: "SET_AUTH_TOKEN", payload: token });
  };

  const setAuthenticatedUser = (user) => {
    localStorage.setItem("authenticatedUser", JSON.stringify(user));
    dispatch({ type: "SET_AUTHENTICATED_USER", payload: user });
  };

  const value = useMemo(
    () => ({
      ...state,
      login,
      register,
      setAuthToken,
      setAuthenticatedUser,
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
