/* eslint-disable react/prop-types */
import Logout from "./modal/Logout";

function Navbar(props) {
  const { navItem, ariaToggle, dropDownToggle, toggleButton, toggleMinimize } =
    props;
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div className="form-inline">
          <button
            id="sidebarToggleTop"
            onClick={toggleMinimize}
            className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars" />
          </button>
        </div>
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block" />
          <li className={`nav-item dropdown no-arrow ${navItem}`}>
            <a
              className="nav-link dropdown-toggle"
              onClick={toggleButton}
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={`${ariaToggle}`}>
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                Douglas McGee
              </span>
              <img
                className="img-profile rounded-circle"
                src="img/undraw_profile.svg"
              />
            </a>
            <div
              className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${dropDownToggle}`}
              aria-labelledby="userDropdown">
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </a>
              <div className="dropdown-divider" />
              <Logout />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
