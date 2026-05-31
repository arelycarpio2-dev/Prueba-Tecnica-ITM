import { getValidToken } from "./authService.jsx";

const USUARIOS_URL = "/auth/admin/realms/master/users";

// Obtiene la lista de usuarios desde Keycloak usando el token actual.
export async function obtenerUsuarios() {
  // Obtiene un token válido, refrescándolo automáticamente si es necesario
  const token = await getValidToken();

  const request = await fetch(`${USUARIOS_URL}?first=0&max=20`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!request.ok) {
    // Si el token expiró, lanzar error específico
    if (request.status === 401) {
      throw new Error("Sesión expirada");
    }
    throw new Error("Error al obtener los usuarios");
  }

  const data = await request.json();

  return data.map((u) => ({
    id: u.id,
    usuario: u.username,
    nombre: u.firstName || "-",
    apellido: u.lastName || "-",
    correo: u.email || "-",
    estado: u.enabled ? "Activo" : "Inactivo",
  }));
}
