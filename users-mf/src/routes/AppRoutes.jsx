import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/usuario/Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ConfigRoutes from "./ConfigRoutes.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path={ConfigRoutes.LOGIN} element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path={ConfigRoutes.HOME} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;