import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw Error("useAppContext must be inside an AppContextProvider");
  }
  return context;
};
