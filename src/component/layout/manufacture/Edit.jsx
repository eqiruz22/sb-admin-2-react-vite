/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import useAuthContext from "../../hooks/useAuthContext";

function ModalEdit(props) {
  const {
    isId,
    page,
    size,
    search,
    setData,
    setPage,
    setSize,
    setPages,
    setCountData,
  } = props;
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const { user, token } = useAuthContext();
  const handleClose = () => setShow(false);

  const getDetail = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/manufacture/${isId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        console.log(response);
        setName(response?.result["name"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setShow(true);
    getDetail();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      manufacture: name,
    },
    validationSchema: Yup.object({
      manufacture: Yup.string().required("Manufacture Name is required"),
    }),
    onSubmit: async (value) => {
      console.log(value);
      try {
        const res = await fetch(`http://127.0.0.1:4000/manufacture/${isId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: value["manufacture"],
            userId: user.id,
          }),
        });
        const response = await res.json();
        if (res.ok) {
          await fetch(
            `http://127.0.0.1:4000/manufacture?page=${page}&size=${size}&query=${search}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("token")
                )}`,
              },
            }
          )
            .then((res) => res.json())
            .then((res) => {
              setData(res.result.data);
              setPage(res.result.paginate["page"]);
              setSize(res.result.paginate["pageSize"]);
              setPages(res.result.paginate["totalPage"]);
              setCountData(res.result.paginate["manufactureCount"]);
            });
          setShow(false);
          Swal.fire({
            title: "Success",
            text: response.result,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "something wrong?",
            text: response.result || response.error,
            icon: "question",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Button onClick={handleOpen} className="btn btn-sm btn-warning">
        <i className="fas fa-fw fa-edit"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        centered>
        <Modal.Header>
          <Modal.Title>Edit Manufacture</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="manufacture-input">
              <Form.Label>Mnufacture</Form.Label>
              <Form.Control
                className={`mb-3 ${
                  formik.touched.manufacture && formik.errors.manufacture
                    ? "is-invalid"
                    : formik.touched.manufacture
                    ? "is-valid"
                    : ""
                }`}
                type="text"
                name="manufacture"
                {...formik.getFieldProps("manufacture")}
                placeholder="DELL"
              />
              {formik.touched.manufacture && formik.errors.manufacture ? (
                <span className="mb-1 invalid-feedback">
                  {formik.errors.manufacture}
                </span>
              ) : formik.touched.manufacture ? (
                <span className="mb-1 valid-feedback">Looks good!</span>
              ) : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalEdit;
