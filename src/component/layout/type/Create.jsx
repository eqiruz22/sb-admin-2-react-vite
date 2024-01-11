/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

function ModalCreate(props) {
  const {
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

  const handleClose = () => setShow(false);

  const handleOpen = () => {
    setShow(true);
  };

  const formik = useFormik({
    initialValues: {
      typename: "",
    },
    validationSchema: Yup.object({
      typename: Yup.string().required("type name field is required"),
    }),
    onSubmit: async (value, { resetForm }) => {
      console.log(value);
      try {
        const res = await fetch("http://127.0.0.1:4000/type", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify({
            name: value["typename"],
          }),
        });
        const response = await res.json();
        if (res.ok) {
          console.log(response);
          resetForm();
          await fetch(
            `http://127.0.0.1:4000/type?page=${page}&size=${size}&query=${search}`,
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
              setCountData(res.result.paginate["typeCount"]);
            });
          setShow(false);
          Swal.fire({
            title: "Success",
            text: response.result,
            icon: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Button
        onClick={handleOpen}
        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
        <i className="fas fa-fw fa-plus"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        centered>
        <Modal.Header>
          <Modal.Title>Create New Type</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="name-input">
              <Form.Label>Type Name</Form.Label>
              <Form.Control
                className={`mb-3 ${
                  formik.touched.typename && formik.errors.typename
                    ? "is-invalid"
                    : formik.touched.typename
                    ? "is-valid"
                    : ""
                }`}
                type="text"
                name="typename"
                {...formik.getFieldProps("typename")}
                placeholder="Hardware/Software"
              />
              {formik.touched.typename && formik.errors.typename ? (
                <span className="mb-1 invalid-feedback">
                  {formik.errors.typename}
                </span>
              ) : formik.touched.typename ? (
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

export default ModalCreate;
