import { getValidToken } from "./authService.jsx";

const USUARIOS_URL = "/auth/admin/realms/master/users";

// Elimina un usuario existente en Keycloak usando el token actual.
export async function eliminarUsuario(userId) {
  // Obtiene un token válido, refrescándolo automáticamente si es necesario
  const token = await getValidToken();

  const request = await fetch(`${USUARIOS_URL}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!request.ok) {
    if (request.status === 401) {
      throw new Error("Sesión expirada");
    }
    throw new Error("Error al eliminar el usuario");
  }
}
