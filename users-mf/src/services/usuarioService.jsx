const USUARIOS_URL = "/auth/admin/realms/master/users";

// Obtiene la lista de usuarios desde Keycloak
export async function obtenerUsuarios() {
  const token = localStorage.getItem("token");

  const request = await fetch(`${USUARIOS_URL}?first=0&max=20`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!request.ok) throw new Error("Error al obtener los usuarios");

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
