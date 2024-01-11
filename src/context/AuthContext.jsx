/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const expired = JSON.parse(localStorage.getItem("expired"));
    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token,
          expired,
        },
      });
    } else if (!user && !token) {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    }
  }, [navigate]);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
