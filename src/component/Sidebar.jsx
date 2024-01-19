/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../assets/app.css";
import { Link } from "react-router-dom";
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
          {/* <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div> */}
          <div className="sidebar-brand-text mx-3">Asset</div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
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
              <h6 className="collapse-header">Sub Menu :</h6>
              <Link className="collapse-item" to="/user">
                User
              </Link>
              <Link className="collapse-item" to="/manufacture">
                Manufacture
              </Link>
              <Link className="collapse-item" to="/type">
                Type Product
              </Link>
              <Link className="collapse-item" to="/product">
                Product
              </Link>
              <Link className="collapse-item" to="/asset">
                Asset
              </Link>
              <Link className="collapse-item" to="/peripheral">
                Peripheral
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/employee">
            <i className="fas fa-fw fa-solid fa-user-tie" />
            <span>Employee</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/log">
            <i className="fas fa-fw fa-solid fa-list" />
            <span>Activity Log</span>
          </Link>
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
