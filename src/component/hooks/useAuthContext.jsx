import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be an inside AuthContextProvider");
  }
  return context;
};

export default useAuthContext;
