/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ModalDetail(props) {
  const { isId } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const getDetail = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/product/${isId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setShow(true);
    getDetail();
  };

  return (
    <>
      <Button onClick={handleOpen} className="btn mr-1 btn-sm btn-success">
        <i className="fas fa-fw fa-eye"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        centered>
        <Modal.Header>
          <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDetail;
