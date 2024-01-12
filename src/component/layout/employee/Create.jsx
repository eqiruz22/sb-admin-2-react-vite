import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AsyncCreatableSelect from "react-select/async-creatable";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
const CreateEmployee = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [department, setDepartment] = useState(null);
  const [bussines, setBussines] = useState(null);
  const { user, token } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      nik: "",
      full_name: "",
      email: "",
    },
    validationSchema: Yup.object({
      nik: Yup.number()
        .integer("nik employee must be number")
        .required("nik employee is required"),
      full_name: Yup.string().required("name employee is required"),
      email: Yup.string()
        .email("email is not valid")
        .required("email field is required"),
    }),
    onSubmit: async (value) => {
      const data = {
        nik: value["nik"],
        full_name: value["full_name"],
        email: value["email"],
        title: title["value"],
        department: department["value"],
        bussines_unit: bussines["value"],
        userId: user.id,
      };
      try {
        const res = await fetch(`http://127.0.0.1:4000/employee`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const response = await res.json();
        if (res.ok) {
          console.log(response);
          Swal.fire({
            title: "success",
            text: response.result,
            icon: "success",
          });
          navigate("/employee");
        } else {
          Swal.fire({
            title: "something wrong?",
            text: response.result,
            icon: "question",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const getTitle = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/employee/title`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        const opt = response.result.map((item) => ({
          value: item.title,
          label: item.title,
        }));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(opt);
          }, 2000);
        });
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getBussines = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/employee/bussines`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        const opt = response.result.map((item) => ({
          value: item.bussines_unit,
          label: item.bussines_unit,
        }));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(opt);
          }, 2000);
        });
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getDepartment = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/employee/department`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        const opt = response.result.map((item) => ({
          value: item.department,
          label: item.department,
        }));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(opt);
          }, 2000);
        });
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Create new Employee</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="mb-3 mt-3">
            <label htmlFor="nik">NIK Employee</label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.nik && formik.errors.nik
                  ? "is-invalid"
                  : formik.touched.nik
                  ? "is-valid"
                  : ""
              }`}
              id="nik"
              {...formik.getFieldProps("nik")}
            />
            {formik.touched.nik && formik.errors.nik ? (
              <span className="mb-1 invalid-feedback">{formik.errors.nik}</span>
            ) : formik.touched.nik ? (
              <span className="mb-1 valid-feedback">Looks good!</span>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.full_name && formik.errors.full_name
                  ? "is-invalid"
                  : formik.touched.full_name
                  ? "is-valid"
                  : ""
              }`}
              id="full_name"
              {...formik.getFieldProps("full_name")}
            />
            {formik.touched.full_name && formik.errors.full_name ? (
              <span className="mb-1 invalid-feedback">
                {formik.errors.full_name}
              </span>
            ) : formik.touched.full_name ? (
              <span className="mb-1 valid-feedback">Looks good!</span>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email
                  ? "is-invalid"
                  : formik.touched.email
                  ? "is-valid"
                  : ""
              }`}
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="mb-1 invalid-feedback">
                {formik.errors.email}
              </span>
            ) : formik.touched.email ? (
              <span className="mb-1 valid-feedback">Looks good!</span>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <AsyncCreatableSelect
              defaultOptions
              cacheOptions
              loadOptions={getTitle}
              value={title}
              onChange={(value) => setTitle(value)}
              id="title"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="department">Department</label>
            <AsyncCreatableSelect
              defaultOptions
              cacheOptions
              loadOptions={getDepartment}
              value={department}
              onChange={(value) => setDepartment(value)}
              id="department"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="bussines_unit">Bussines Unit</label>
            <AsyncCreatableSelect
              defaultOptions
              cacheOptions
              loadOptions={getBussines}
              value={bussines}
              onChange={(value) => setBussines(value)}
              id="bussines_unit"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
