import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/usuario/Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import ConfigRoutes from "./ConfigRoutes.jsx";

// Recibe las credenciales del admin y el callback para guardarlas desde Login
function AppRoutes({ credenciales, onLogin }) {
  return (
    <Routes>
      {/* Rutas públicas: solo accesibles sin sesión activa */}
      <Route element={<PublicRoute />}>
        <Route path={ConfigRoutes.LOGIN} element={<Login onLogin={onLogin} />} />
      </Route>

      {/* Rutas privadas: solo accesibles con sesión activa */}
      <Route element={<ProtectedRoute />}>
        <Route
          path={ConfigRoutes.HOME}
          element={<Home credenciales={credenciales} />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
