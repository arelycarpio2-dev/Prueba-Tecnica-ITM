const LOGIN_URL = "/auth/realms/master/protocol/openid-connect/token";

// Autentica al usuario y guarda los tokens en localStorage
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
  
  // Guardar access token y refresh token
  localStorage.setItem("token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);
  
  // Opcional: guardar tiempo de expiración para saber cuándo refrescar
  const expiresAt = Date.now() + (response.expires_in * 1000);
  localStorage.setItem("token_expires_at", expiresAt.toString());
}

// Refresca el access token usando el refresh token
export async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  
  if (!refreshToken) {
    throw new Error("No hay refresh token disponible");
  }

  const params = new URLSearchParams();
  params.append("client_id", "admin-cli");
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const request = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!request.ok) {
    // Si el refresh token también expiró, limpiar todo
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expires_at");
    throw new Error("Refresh token expirado");
  }

  const response = await request.json();
  
  // Actualizar tokens
  localStorage.setItem("token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);
  
  const expiresAt = Date.now() + (response.expires_in * 1000);
  localStorage.setItem("token_expires_at", expiresAt.toString());
  
  return response.access_token;
}

// Verifica si el token está próximo a expirar (menos de 1 minuto)
export function isTokenExpiringSoon() {
  const expiresAt = localStorage.getItem("token_expires_at");
  if (!expiresAt) return true;
  
  const timeLeft = parseInt(expiresAt) - Date.now();
  return timeLeft < 60000; // menos de 1 minuto
}

// Obtiene un token válido, refrescándolo si es necesario
export async function getValidToken() {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No hay sesión activa");
  }
  
  // Si el token está próximo a expirar, refrescarlo
  if (isTokenExpiringSoon()) {
    try {
      return await refreshToken();
    } catch {
      throw new Error("Sesión expirada");
    }
  }
  
  return token;
}
