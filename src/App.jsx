import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./component/layout/Main";
import Dashboard from "./component/layout/Dashboard";

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
          path: "/test",
          element: (
            <>
              <h1>Test lah</h1>
            </>
          ),
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
