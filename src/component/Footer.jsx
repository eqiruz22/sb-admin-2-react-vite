/* eslint-disable no-unused-vars */
import React from "react";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      {/* Footer */}
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>{`Copyright © Your Website ${year}`}</span>
          </div>
        </div>
      </footer>
      {/* End of Footer */}
    </>
  );
}

export default Footer;
