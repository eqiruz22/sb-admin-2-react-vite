import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./component/layout/Main";
import Dashboard from "./component/layout/Dashboard";
import MainUser from "./component/layout/user/Main";
import Login from "./component/layout/login/Login";

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
