import { getValidToken } from "./authService.jsx";

const USUARIOS_URL = "/auth/admin/realms/master/users";

// Actualiza un usuario existente en Keycloak usando el token actual.
export async function actualizarUsuario(usuario) {
  // Obtiene un token válido, refrescándolo automáticamente si es necesario
  const token = await getValidToken();

  const body = {
    firstName: usuario.nombre,
    lastName: usuario.apellido,
    email: usuario.correo,
    enabled: usuario.estado === "Activo",
  };

  const request = await fetch(`${USUARIOS_URL}/${usuario.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!request.ok) {
    if (request.status === 401) {
      throw new Error("Sesión expirada");
    }
    throw new Error("Error al actualizar el usuario");
  }
}
