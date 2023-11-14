import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function ModalCreate() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleOpen = () => {
    setShow(true);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
        Create new data
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Create New Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
              <Form.Group controlId="body-input">
                <Form.Label>Body</Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="..." />
              </Form.Group>
              <Form.Group controlId="title-input">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  placeholder="example"
                />
              </Form.Group>
              <Form.Group controlId="user_id">
                <Form.Label>User ID</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="success">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreate;
