# Sistema de Autenticación — Refresh Token

## Flujo

Este proyecto implementa el patrón de **refresh token** para mantener la sesión activa automáticamente.

### 1. Login inicial

```javascript
await login(username, password);
// Se guardan en localStorage:
// - token        → access_token (válido por ~5 minutos)
// - refresh_token → (válido por ~30 días)
// - token_expires_at → timestamp de expiración
```

### 2. Operaciones normales

```javascript
const token = await getValidToken();
// getValidToken() verifica:
// ¿Hay token?
//   No → "No hay sesión activa"
// ¿Está próximo a expirar? (< 1 minuto)
//   Sí → Refresca automáticamente con refresh_token
//   No → Usa el token actual
```

### 3. Refresh automático

```javascript
// Cuando el access_token está por expirar:
await refreshToken();
// Keycloak devuelve:
// - Nuevo access_token (otros 5 minutos)
// - Nuevo refresh_token (otros 30 días)
// - Se actualizan en localStorage
```

### 4. Sesión expirada

```javascript
// Si el refresh_token también expiró:
// - Se limpian todos los tokens
// - Se redirige al login
// - Usuario debe autenticarse nuevamente
```

## Tokens en localStorage

```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_expires_at": "1735689600000"
}
```
