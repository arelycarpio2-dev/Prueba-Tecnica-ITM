import { login } from "./authService.jsx";

const USUARIOS_URL = "/auth/admin/realms/master/users";

// Actualiza un usuario existente en Keycloak.
// Recibe el formulario con los datos actualizados y las credenciales del admin.
export async function actualizarUsuario(formulario, adminUsername, adminPassword) {
  // Paso 1: autenticar con las credenciales del admin para obtener el token
  await login(adminUsername, adminPassword);

  // Paso 2: leer el token recién guardado
  const token = localStorage.getItem("token");

  const body = {
    firstName: formulario.nombre,
    lastName: formulario.apellido,
    email: formulario.correo,
    enabled: formulario.estado === "Activo",
  };

  // Paso 3: actualizar el usuario con PUT usando su id
  const request = await fetch(`${USUARIOS_URL}/${formulario.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!request.ok) throw new Error("Error al actualizar el usuario");
}
