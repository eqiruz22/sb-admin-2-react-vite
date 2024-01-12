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
  const [typename, setTypename] = useState("");
  const { user, token } = useAuthContext();
  const handleClose = () => setShow(false);

  const getDetail = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/type/${isId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        console.log(response);
        setTypename(response?.result["name"]);
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
      typename: typename,
    },
    validationSchema: Yup.object({
      typename: Yup.string().required("type name field is required"),
    }),
    onSubmit: async (value) => {
      try {
        const res = await fetch(`http://127.0.0.1:4000/type/${isId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: value["typename"],
            userId: user.id,
          }),
        });
        const response = await res.json();
        if (res.ok) {
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
          <Modal.Title>Edit Type</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="typename-input">
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
                placeholder="example@test.com"
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

export default ModalEdit;
