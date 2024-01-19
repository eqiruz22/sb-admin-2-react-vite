/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import useAuthContext from "../../hooks/useAuthContext";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";

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
  const { user, token } = useAuthContext();
  const [stats, setStats] = useState([]);
  const [detailName, setDetailName] = useState("");
  const [detailSn, setDetailSn] = useState("");
  const [detailManufac, setDetailManufac] = useState("");
  const [detailStatus, setDetailStatus] = useState("");
  const [detailLocation, setDetailLocation] = useState("");
  const handleClose = () => setShow(false);
  let pages = 1;
  let limit = 10;
  const getManufacture = async (value) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:4000/manufacture?page=${pages}&limit=${limit}&query=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      const response = await res.json();
      if (res.ok) {
        console.log(response);
        const opt = response.result.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(opt);
          }, 500);
        });
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const getLocation = async (value) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:4000/peripheral-location?query=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await res.json();
      const opt = response.result.map((item) => ({
        value: item.location,
        label: item.location,
      }));
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(opt);
        }, 500);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getStatus = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      console.log(response.result);
      setStats(response.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getDetail = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/peripheral/${isId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const response = await res.json();
      console.log(response);
      setDetailName(response.result.name);
      setDetailSn(response.result.serial_number);
      setDetailStatus(response.result.stats_id);
      setDetailManufac({
        value: response.result.manufac_id,
        label: response.result.manufacture.name,
      });
      setDetailLocation({
        value: response.result.location,
        label: response.result.location,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpen = () => {
    setShow(true);
    getStatus();
    getDetail();
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: detailName,
      serial_number: detailSn,
      stats_id: detailStatus,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name field is required"),
      serial_number: Yup.string().required("serial number field is required"),
    }),
    onSubmit: async (value) => {
      try {
        const res = await fetch(`http://127.0.0.1:4000/peripheral/${isId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: value["name"],
            serial_number: value["serial_number"],
            stats_id: value["stats_id"],
            manufac_id: detailManufac["value"],
            location: detailLocation["value"],
            userId: user.id,
          }),
        });
        const response = await res.json();
        if (res.ok) {
          await fetch(
            `http://127.0.0.1:4000/peripheral?page=${page}&size=${size}&query=${search}`,
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
              setCountData(res.result.paginate["peripheralCount"]);
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
          <Modal.Title>Edit Peripheral</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="name-input">
              <Form.Label>Type Name</Form.Label>
              <Form.Control
                className={`mb-3 ${
                  formik.touched.name && formik.errors.name
                    ? "is-invalid"
                    : formik.touched.name
                    ? "is-valid"
                    : ""
                }`}
                type="text"
                name="name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <span className="mb-1 invalid-feedback">
                  {formik.errors.name}
                </span>
              ) : formik.touched.name ? (
                <span className="mb-1 valid-feedback">Looks good!</span>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                className={`mb-3 ${
                  formik.touched.serial_number && formik.errors.serial_number
                    ? "is-invalid"
                    : formik.touched.serial_number
                    ? "is-valid"
                    : ""
                }`}
                type="text"
                name="serial_number"
                {...formik.getFieldProps("serial_number")}
              />
              {formik.touched.serial_number && formik.errors.serial_number ? (
                <span className="mb-1 invalid-feedback">
                  {formik.errors.serial_number}
                </span>
              ) : formik.touched.serial_number ? (
                <span className="mb-1 valid-feedback">Looks good!</span>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Manufacture</Form.Label>
              <AsyncSelect
                defaultOptions
                cacheOptions
                loadOptions={getManufacture}
                value={detailManufac}
                onChange={(options) => setDetailManufac(options)}
                className="mb-3"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                {...formik.getFieldProps("stats_id")}
                className="mb-3">
                <option defaultValue={""}>--Choose One--</option>
                {stats.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <AsyncCreatableSelect
                defaultOptions
                cacheOptions
                loadOptions={getLocation}
                value={detailLocation}
                onChange={(value) => setDetailLocation(value)}
              />
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
