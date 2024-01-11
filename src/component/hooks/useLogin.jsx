import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

export const useLogin = () => {
  const [isError, setIsError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsError(null);
    const data = {
      username: username,
      password: password,
    };

    try {
      const res = await fetch(`http://127.0.0.1:4000/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setIsError("Failed to login");
        return;
      }

      const response = await res.json();
      const { data: user, token, expiresIn: expired } = response.result;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("expired", JSON.stringify(expired));

      dispatch({ type: "LOGIN", payload: { user, token, expired } });
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsError("An error occurred");
    }
  };

  return { isError, login };
};
