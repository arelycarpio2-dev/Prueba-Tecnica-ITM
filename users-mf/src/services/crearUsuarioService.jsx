import { getValidToken } from "./authService.jsx";

const USUARIOS_URL = "/auth/admin/realms/master/users";

// Crea un nuevo usuario en Keycloak usando el token actual.
export async function crearUsuario(formulario) {
  // Obtiene un token válido, refrescándolo automáticamente si es necesario
  const token = await getValidToken();

  const body = {
    username: formulario.usuario,
    firstName: formulario.nombre,
    lastName: formulario.apellido,
    email: formulario.correo,
    enabled: formulario.estado === "Activo",
    credentials: [
      {
        type: "password",
        value: formulario.contrasena,
        temporary: false,
      },
    ],
  };

  const request = await fetch(USUARIOS_URL, {
    method: "POST",
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
    throw new Error("Error al crear el usuario");
  }
}
