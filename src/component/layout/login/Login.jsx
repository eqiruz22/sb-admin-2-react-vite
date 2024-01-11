import "./login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../../hooks/useLogin";
const Login = () => {
  const { isError, login } = useLogin();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("username is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async (value) => {
      await login(value["username"], value["password"]);
    },
  });
  return (
    <div className="containers">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="text-center mt-3">
        {isError && <span className="text-danger">{isError}</span>}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="inputs">
          <div className="input">
            <i className="fas fa-regular fa-user"></i>
            <input
              type="text"
              id="username"
              placeholder="example@example.com"
              {...formik.getFieldProps("username")}
            />
          </div>
          <div className="input">
            <i className="fas fa-regular fa-key"></i>
            <input type="password" {...formik.getFieldProps("password")} />
          </div>
        </div>
        <div className="submit-containers">
          <button type="submit" className="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
