import { useContext } from "react";
import { AppContext } from "./AppContext";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw Error("useAppContext must be inside an AppContextProvider");
  }
  return context;
};
