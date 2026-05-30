import { login } from "./authService.jsx";

const USUARIOS_URL = "/auth/admin/realms/master/users";

// Crea un nuevo usuario en Keycloak.
// Recibe el formulario del usuario a crear y las credenciales del admin
// (username, password) para obtener un token fresco antes de la petición.
export async function crearUsuario(formulario, adminUsername, adminPassword) {
  // Paso 1: autenticar con las credenciales del admin para obtener el token
  await login(adminUsername, adminPassword);

  // Paso 2: leer el token recién guardado
  const token = localStorage.getItem("token");

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

  console.log(body);
  // Paso 3: crear el usuario con el token obtenido
  const request = await fetch(USUARIOS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!request.ok) throw new Error("Error al crear el usuario");
}
