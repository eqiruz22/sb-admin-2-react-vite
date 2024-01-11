import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import { useEffect, useState } from "react";
const CreateAsset = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState("");
  const [product, setProduct] = useState("");
  const [spec, setSpec] = useState("");
  const [sn, setSn] = useState("");
  const [manufac, setManufac] = useState("");
  const [type, setType] = useState("");
  const [tagId, setTagId] = useState("");
  let page = 1;
  let limit = 10;
  const formik = useFormik({
    initialValues: {
      location: "",
    },
    validationSchema: Yup.object({
      location: Yup.string().required("location is required"),
    }),
    onSubmit: async (value) => {
      const data = {
        employeeId: employee["value"],
        productId: product["value"],
        location: value["location"],
        tag_id: tagId["label"],
        used_by: employee["label"],
        userId: 1,
      };
      try {
        const res = await fetch(`http://127.0.0.1:4000/asset`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(data),
        });
        const response = await res.json();
        if (res.status === 200) {
          Swal.fire({
            title: "success",
            text: response.result,
            icon: "success",
          });
          navigate("/asset");
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

  const getEmployee = async (value) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:4000/employee?page=${page}&size=${limit}&query=${value}`,
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
        const opt = response.result.data.map((item) => ({
          value: item.id,
          label: item.full_name,
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

  const fetchTag = async (value) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:4000/asset-fetch?page=${page}&size=${limit}&query=${value}`,
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
        const opt = response.result.data.map((item) => ({
          value: item.id,
          label: item.tag_id,
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

  const getProduct = async (value) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:4000/product-available?page=${page}&size=${limit}&query=${value}`,
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
        const opt = response.result.data.map((item) => ({
          value: item.id,
          label: item.product_name,
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

  useEffect(() => {
    const detailProduct = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:4000/product/${product["value"]}`,
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
          setSpec(response?.result?.data?.spesification);
          setSn(response?.result?.data?.serial_number);
          setManufac(response?.result?.data?.manufacture?.name);
          setType(response?.result?.data?.type?.name);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (product !== "") {
      detailProduct();
    }
  }, [product]);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Create new Asset</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="mb-3 mt-3">
            <label htmlFor="name">Employee Name</label>
            <AsyncSelect
              defaultOptions
              cacheOptions
              loadOptions={getEmployee}
              value={employee}
              onChange={(options) => setEmployee(options)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="product">List Product</label>
            <AsyncSelect
              defaultOptions
              cacheOptions
              loadOptions={getProduct}
              value={product}
              onChange={(options) => setProduct(options)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="tag">Tag ID</label>
            <AsyncCreatableSelect
              defaultOptions
              cacheOptions
              loadOptions={fetchTag}
              value={tagId}
              onChange={(value) => setTagId(value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="manufacture">Manufacture</label>
            <div className="form-control">{manufac}</div>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="spec">Spesification</label>
            <div className="form-control">{spec}</div>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="serial_number">Serial Number</label>
            <div className="form-control">{sn}</div>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="type">Type</label>
            <div className="form-control">{type}</div>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.location && formik.errors.location
                  ? "is-invalid"
                  : formik.touched.location
                  ? "is-valid"
                  : ""
              }`}
              id="location"
              {...formik.getFieldProps("location")}
            />
            {formik.touched.location && formik.errors.location ? (
              <span className="mb-1 invalid-feedback">
                {formik.errors.location}
              </span>
            ) : formik.touched.location ? (
              <span className="mb-1 valid-feedback">Looks good!</span>
            ) : null}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAsset;
