import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./component/layout/Main";
import Dashboard from "./component/layout/Dashboard";
import MainUser from "./component/layout/user/Main";
import Login from "./component/layout/login/Login";
import MainType from "./component/layout/type/Main";
import MainManufacture from "./component/layout/manufacture/Main";
import MainProduct from "./component/layout/product/Main";
import CreateProduct from "./component/layout/product/Create";
import EditProduct from "./component/layout/product/Edit";
import MainAsset from "./component/layout/asset/Main";
import MainEmployee from "./component/layout/employee/Main";
import CreateEmployee from "./component/layout/employee/Create";
import EditEmployee from "./component/layout/employee/Edit";
import CreateAsset from "./component/layout/asset/Create";
import EditAsset from "./component/layout/asset/Edit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/user",
          element: <MainUser />,
        },
        {
          path: "/type",
          element: <MainType />,
        },
        {
          path: "/manufacture",
          element: <MainManufacture />,
        },
        {
          path: "/product",
          element: <MainProduct />,
        },
        {
          path: "/product/create",
          element: <CreateProduct />,
        },
        {
          path: "/product/edit/:id",
          element: <EditProduct />,
        },
        {
          path: "/asset",
          element: <MainAsset />,
        },
        {
          path: "/asset/create",
          element: <CreateAsset />,
        },
        {
          path: "/asset/edit/:id",
          element: <EditAsset />,
        },
        {
          path: "/employee",
          element: <MainEmployee />,
        },
        {
          path: "/employee/create",
          element: <CreateEmployee />,
        },
        {
          path: "/employee/edit/:id",
          element: <EditEmployee />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <div>
          <h1>Not Found...</h1>
        </div>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
