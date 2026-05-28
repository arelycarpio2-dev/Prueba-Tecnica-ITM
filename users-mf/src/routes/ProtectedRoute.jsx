import { Navigate, Outlet } from "react-router-dom";
import ConfigRoutes from "./ConfigRoutes";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={ConfigRoutes.LOGIN} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;