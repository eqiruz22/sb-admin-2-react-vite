/* eslint-disable no-unused-vars */
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

import { useAppContext } from "../hooks/useAppContext";
import { Outlet } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
function Main() {
  const {
    aria,
    col,
    colTwo,
    expand,
    toggleLinkCollapse,
    clickProfile,
    toggleWhileMinimize,
    toggleSidebar,
    toggleMin,
    toggleSide,
    navItem,
    isDropDownOpen,
    handleDropDownToggle,
    drop,
  } = useAppContext();

  return (
    <>
      <div id="wrapper">
        <Sidebar
          collaps={col}
          collapShow={colTwo}
          aria={expand}
          buttonToggle={toggleLinkCollapse}
          toggle={toggleSide}
          iconSide={toggleSidebar}
          toggleMinimize={toggleMin}
        />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar
              navItem={navItem}
              ariaToggle={aria}
              dropDownToggle={drop}
              toggleButton={clickProfile}
              toggleMinimize={toggleWhileMinimize}
            />
            <div className="container-fluid">
              {/* Main Content */}
              <dir>{<Outlet />}</dir>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </>
  );
}

export default Main;
