const LOGIN_URL = "/auth/realms/master/protocol/openid-connect/token";

// Autentica al usuario y guarda el token en localStorage
export async function login(username, password) {
  const params = new URLSearchParams();
  params.append("client_id", "admin-cli");
  params.append("username", username.trim());
  params.append("password", password);
  params.append("grant_type", "password");

  const request = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!request.ok) throw new Error("Credenciales incorrectas");

  const response = await request.json();
  localStorage.setItem("token", response.access_token);
}
