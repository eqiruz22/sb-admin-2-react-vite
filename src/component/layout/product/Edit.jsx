import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { formatOnlyDate } from "../../../helper/formatDate";
import useAuthContext from "../../hooks/useAuthContext";
const EditProduct = () => {
  const [manufac, setManufac] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const [sn, setSn] = useState("");
  const [host, setHost] = useState("");
  const [name, setName] = useState("");
  const [spec, setSpec] = useState("");
  const [warranty, setWarranty] = useState("");
  const [opt, setOpt] = useState([]);
  const [stats, setStats] = useState("");
  const [buy, setBuy] = useState("");
  const { id } = useParams();
  const { user, token } = useAuthContext();
  let page = 1;
  let limit = 10;

  const getDetail = useCallback(async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/product/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        setSn(response.result.data.serial_number);
        setHost(response.result.data.hostname);
        setSpec(response.result.data.spesification);
        setName(response.result.data.product_name);
        setManufac({
          value: response.result.data.manufactureId,
          label: response.result.data.manufacture.name,
        });
        setType({
          value: response.result.data.typeId,
          label: response.result.data.type.name,
        });
        setStats({
          value: response.result.data.statsId,
          label: response.result.data.statsasset.name,
        });
        setOpt(
          response.result.stats.map((item) => ({
            value: item.id,
            label: item.name,
          }))
        );
        setWarranty(formatOnlyDate(response.result.data.warranty));
        setBuy(formatOnlyDate(response.result.data.buy_date));
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    getDetail();
  }, [getDetail]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sn: sn,
      host: host,
      name: name,
      spesification: spec,
      warranty: warranty,
      buydate: buy,
    },
    validationSchema: Yup.object({
      sn: Yup.string().required("Serial number is required"),
      host: Yup.string().required("Hostname is required"),
      name: Yup.string().required("Product name is required"),
      spesification: Yup.string().required("Spesification is required"),
    }),
    onSubmit: async (value) => {
      const data = {
        serial_number: value["sn"],
        hostname: value["host"],
        product_name: value["name"],
        manufactureId: manufac["value"],
        typeId: type["value"],
        spesification: value["spesification"],
        warranty: value["warranty"],
        buy_date: value["buydate"],
        userId: user.id,
      };
      try {
        const res = await fetch(`http://127.0.0.1:4000/product/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const response = await res.json();
        if (res.ok) {
          Swal.fire({
            title: "success",
            text: response.result,
            icon: "success",
          });
          navigate("/product");
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
  const getManufacture = async (value) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:4000/manufacture?page=${page}&limit=${limit}&query=${value}`,
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
          label: item.name,
        }));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(opt);
          }, 1000);
        });
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getType = async (value) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:4000/type?page=${page}&limit=${limit}&query=${value}`,
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
          label: item.name,
        }));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(opt);
          }, 1000);
        });
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Edit Product</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="mb-3 mt-3">
            <label htmlFor="serial_number">Serial Number</label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.sn && formik.errors.sn
                  ? "is-invalid"
                  : formik.touched.sn
                  ? "is-valid"
                  : ""
              }`}
              id="serial_number"
              {...formik.getFieldProps("sn")}
            />
            {formik.touched.sn && formik.errors.sn ? (
              <span className="mb-1 invalid-feedback">{formik.errors.sn}</span>
            ) : formik.touched.sn ? (
              <span className="mb-1 valid-feedback">Looks good!</span>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="hostname">Hostname</label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.host && formik.errors.host
                  ? "is-invalid"
                  : formik.touched.host
                  ? "is-valid"
                  : ""
              }`}
              id="hostname"
              {...formik.getFieldProps("host")}
            />
            {formik.touched.host && formik.errors.host ? (
              <span className="mb-1 invalid-feedback">
                {formik.errors.host}
              </span>
            ) : formik.touched.host ? (
              <span className="mb-1 valid-feedback">Looks good!</span>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="productname">Product Name</label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.name && formik.errors.name
                  ? "is-invalid"
                  : formik.touched.name
                  ? "is-valid"
                  : ""
              }`}
              id="productname"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="mb-1 invalid-feedback">
                {formik.errors.name}
              </span>
            ) : formik.touched.name ? (
              <span className="mb-1 valid-feedback">Looks good!</span>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="spesification">Spesification</label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.spesification && formik.errors.spesification
                  ? "is-invalid"
                  : formik.touched.spesification
                  ? "is-valid"
                  : ""
              }`}
              id="spesification"
              {...formik.getFieldProps("spesification")}
            />
            {formik.touched.spesification && formik.errors.spesification ? (
              <span className="mb-1 invalid-feedback">
                {formik.errors.spesification}
              </span>
            ) : formik.touched.spesification ? (
              <span className="mb-1 valid-feedback">Looks good!</span>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="manufacture">Manufacture</label>
            <AsyncSelect
              defaultOptions
              cacheOptions
              loadOptions={getManufacture}
              value={manufac}
              onChange={(options) => setManufac(options)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="status">Status</label>
            <Select
              options={opt}
              value={stats}
              onChange={(options) => setStats(options)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="manufacture">Type</label>
            <AsyncSelect
              defaultOptions
              cacheOptions
              loadOptions={getType}
              value={type}
              onChange={(options) => setType(options)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="warranty">Warranty</label>
            <input
              type="date"
              className="form-control"
              id="warranty"
              {...formik.getFieldProps("warranty")}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="buydate">Buy Date</label>
            <input
              type="date"
              className="form-control"
              id="buydate"
              {...formik.getFieldProps("buydate")}
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

export default EditProduct;
