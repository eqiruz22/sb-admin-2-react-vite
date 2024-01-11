import { Routes, Route } from "react-router-dom";
import Main from "./component/layout/Main.jsx";
import Dashboard from "./component/layout/Dashboard.jsx";
import MainUser from "./component/layout/user/Main.jsx";
import Login from "./component/layout/login/Login.jsx";
import MainType from "./component/layout/type/Main.jsx";
import MainManufacture from "./component/layout/manufacture/Main.jsx";
import MainProduct from "./component/layout/product/Main.jsx";
import CreateProduct from "./component/layout/product/Create.jsx";
import EditProduct from "./component/layout/product/Edit.jsx";
import MainAsset from "./component/layout/asset/Main.jsx";
import MainEmployee from "./component/layout/employee/Main.jsx";
import CreateEmployee from "./component/layout/employee/Create.jsx";
import EditEmployee from "./component/layout/employee/Edit.jsx";
import CreateAsset from "./component/layout/asset/Create.jsx";
import EditAsset from "./component/layout/asset/Edit.jsx";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />}>
        <Route index element={<Dashboard />} />
        <Route path="/user" element={<MainUser />} />
        <Route path="/type" element={<MainType />} />
        <Route path="/manufacture" element={<MainManufacture />} />
        <Route path="/product" element={<MainProduct />} />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/asset" element={<MainAsset />} />
        <Route path="/asset/create" element={<CreateAsset />} />
        <Route path="/asset/edit/:id" element={<EditAsset />} />
        <Route path="/employee" element={<MainEmployee />} />
        <Route path="/employee/create" element={<CreateEmployee />} />
        <Route path="/employee/edit/:id" element={<EditEmployee />} />
      </Route>
      <Route
        path="*"
        element={
          <div>
            <h1>Not Found...</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
