/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../assets/app.css";
function Sidebar(props) {
  const {
    collaps,
    collapShow,
    aria,
    buttonToggle,
    toggle,
    iconSide,
    toggleMinimize,
  } = props;
  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          toggle ? toggle : toggleMinimize
        }`}
        id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="#">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Interface</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className={`nav-link ${collaps}`}
            onClick={buttonToggle}
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded={aria}
            aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog" />
            <span>Components</span>
          </a>
          <div
            id="collapseTwo"
            className={collapShow}
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <a className="collapse-item" href="#">
                Buttons
              </a>
              <a className="collapse-item" href="#">
                Cards
              </a>
            </div>
          </div>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={iconSide}
          />
        </div>
      </ul>
    </>
  );
}

export default Sidebar;
