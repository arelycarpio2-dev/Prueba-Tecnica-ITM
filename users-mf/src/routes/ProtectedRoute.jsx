import { Navigate, Outlet } from "react-router-dom";
import ConfigRoutes from "./ConfigRoutes";

// Guardia de rutas privadas.
// Solo permite el acceso si existe un token en localStorage.
// Si no hay token, redirige al login y reemplaza el historial
// para que el usuario no pueda volver atrás con el botón del navegador.
function ProtectedRoute() {
  // Leer el token guardado por Keycloak al iniciar sesión
  const token = localStorage.getItem("token");

  // Sin token: redirigir al login
  if (!token) {
    return <Navigate to={ConfigRoutes.LOGIN} replace />;
  }

  // Con token: renderizar la página hija (Outlet)
  return <Outlet />;
}

export default ProtectedRoute;