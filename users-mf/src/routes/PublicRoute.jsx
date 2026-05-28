import { Navigate, Outlet } from "react-router-dom";
import ConfigRoutes from "./ConfigRoutes";

// Guardia de rutas públicas.
// Solo permite el acceso si NO existe un token en localStorage.
// Si el usuario ya inició sesión, lo redirige directo al Home
// para evitar que vuelva a ver el login estando autenticado.
function PublicRoute() {
  // Leer el token guardado por Keycloak al iniciar sesión
  const token = localStorage.getItem("token");

  // Con token → ya está autenticado, redirigir al Home
  if (token) {
    return <Navigate to={ConfigRoutes.HOME} replace />;
  }

  // Sin token → renderizar la página hija (Outlet), ej: Login
  return <Outlet />;
}

export default PublicRoute;
