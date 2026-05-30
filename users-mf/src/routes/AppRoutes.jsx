import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/usuario/Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import ConfigRoutes from "./ConfigRoutes.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas: solo accesibles sin sesión activa */}
      <Route element={<PublicRoute />}>
        <Route path={ConfigRoutes.LOGIN} element={<Login />} />
      </Route>

      {/* Rutas privadas: solo accesibles con sesión activa */}
      <Route element={<ProtectedRoute />}>
        <Route path={ConfigRoutes.HOME} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
