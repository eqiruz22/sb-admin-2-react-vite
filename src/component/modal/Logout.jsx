/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
function Logout() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  function handleOpen() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expired");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }
  return (
    <>
      <button
        className="dropdown-item cursor-pointer"
        role="button"
        onClick={handleOpen}>
        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
        Logout
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Are you sure want leave this page?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={logout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
