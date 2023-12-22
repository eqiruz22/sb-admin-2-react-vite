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
      username: "",
      password: "",
      fullname: "",
      role: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Username must be 5 characters")
        .required("Username field is required"),
      password: Yup.string()
        .min(5, "Password must be 5 characters")
        .required("Password field is required"),
      fullname: Yup.string().required("Full Name field is required"),
    }),
    onSubmit: async (value, { resetForm }) => {
      console.log(value);
      try {
        const res = await fetch("http://127.0.0.1:4000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: value["username"],
            password: value["password"],
            full_name: value["fullname"],
            role: value["role"],
          }),
        });
        const response = await res.json();
        if (res.ok) {
          console.log(response);
          resetForm();
          await fetch(
            `http://127.0.0.1:4000/user?page=${page}&size=${size}&query=${search}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((res) => {
              setData(res.result.data);
              setPage(res.result.paginate["page"]);
              setSize(res.result.paginate["pageSize"]);
              setPages(res.result.paginate["totalPage"]);
              setCountData(res.result.paginate["userCount"]);
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
          <Modal.Title>Create New Data</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="username-input">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={`mb-3 ${
                  formik.touched.username && formik.errors.username
                    ? "is-invalid"
                    : formik.touched.username
                    ? "is-valid"
                    : ""
                }`}
                type="text"
                name="username"
                {...formik.getFieldProps("username")}
                placeholder="example@test.com"
              />
              {formik.touched.username && formik.errors.username ? (
                <span className="mb-1 invalid-feedback">
                  {formik.errors.username}
                </span>
              ) : formik.touched.username ? (
                <span className="mb-1 valid-feedback">Looks good!</span>
              ) : null}
            </Form.Group>
            <Form.Group controlId="password-input">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={`mb-3 ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : formik.touched.password
                    ? "is-valid"
                    : ""
                }`}
                type="password"
                name="password"
                {...formik.getFieldProps("password")}
                placeholder="*****"
              />
              {formik.touched.password && formik.errors.password ? (
                <span className="mb-1 invalid-feedback">
                  {formik.errors.password}
                </span>
              ) : formik.touched.username ? (
                <span className="mb-1 valid-feedback">Looks good!</span>
              ) : null}
            </Form.Group>
            <Form.Group controlId="fullname-input">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                className={`mb-3 ${
                  formik.touched.fullname && formik.errors.fullname
                    ? "is-invalid"
                    : formik.touched.fullname
                    ? "is-valid"
                    : ""
                }`}
                type="text"
                name="fullname"
                {...formik.getFieldProps("fullname")}
                placeholder="John Wick"
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <span className="mb-1 invalid-feedback">
                  {formik.errors.fullname}
                </span>
              ) : formik.touched.fullname ? (
                <span className="mb-1 valid-feedback">Looks good!</span>
              ) : null}
            </Form.Group>
            <Form.Group controlId="user_id">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                {...formik.getFieldProps("role")}>
                <option defaultValue={""}>-- Choose one---</option>
                <option value={"administrator"}>Administrator</option>
                <option value={"user"}>User</option>
              </Form.Control>
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
