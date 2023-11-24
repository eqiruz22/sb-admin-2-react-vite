/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

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
  const [col, setCol] = useState("collapsed");
  const [colTwo, setColTwo] = useState("collapse");
  const [expand, setExpand] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

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
  const toggleLinkCollapse = () => {
    setCol(col === "collapsed" ? "" : "collapsed");
    setColTwo(colTwo === "collapse" ? "collapse show" : "collapse");
    setExpand(true);
  };

  return (
    <AppContext.Provider
      value={{
        navItem,
        aria,
        drop,
        toggleMin,
        toggleSide,
        col,
        colTwo,
        expand,
        arias,
        classCols,
        clickProfile,
        toggleLinkCollapse,
        toggleSidebar,
        toggleWhileMinimize,
      }}>
      {children}
    </AppContext.Provider>
  );
};
