/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [navItem, setNavItem] = useState("");
  const [aria, setAria] = useState(false);
  const [drop, setDrop] = useState("");
  const [toggleMin, setToggleMin] = useState("");
  const [toggleSide, setToggleSide] = useState("");
  const [cols, setCols] = useState("");
  const [arias, setArias] = useState(false);
  const [classCols, setClassCols] = useState("");

  const clickProfile = () => {
    setNavItem(navItem === "show" ? "" : "show");
    setAria(!aria);
    setDrop(drop === "show" ? "" : "show");
  };

  const toggleWhileMinimize = () => {
    setToggleMin(toggleMin === "toggled-sidebar" ? "" : "toggled-sidebar");
  };

  const toggleSidebar = () => {
    setToggleSide(toggleSide === "toggled" ? "" : "toggled");
  };

  const clickCollapse = () => {
    setCols(cols === "collapsed" ? "" : "collapsed");
    setArias(!arias);
    setClassCols(classCols === "collapse" ? "collapse show" : "collapse");
  };

  return (
    <AppContext.Provider
      value={{
        navItem,
        aria,
        drop,
        toggleMin,
        toggleSide,
        cols,
        arias,
        classCols,
        clickProfile,
        clickCollapse,
        toggleSidebar,
        toggleWhileMinimize,
      }}>
      {children}
    </AppContext.Provider>
  );
};
