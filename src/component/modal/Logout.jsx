/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
function Logout() {
  const [show, setShow] = useState(false);
  function handleOpen() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }
  return (
    <>
      <a
        className="dropdown-item cursor-pointer"
        role="button"
        onClick={handleOpen}>
        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
        Logout
      </a>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
