import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user, expired, dispatch } = useAuthContext();
  const time = Math.floor(Date.now() / 1000);
  const navigate = useNavigate();
  if (expired && expired < time) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expired");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  if (!user) {
    return <p>Loading...</p>;
  }
  return <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>;
};

export default Dashboard;
