# Sistema de Refresh Token

## ¿Cómo funciona?

Este proyecto implementa el patrón de **refresh token** para mantener la sesión activa automáticamente, similar a Facebook, Gmail, etc.

## Flujo de autenticación

### 1. Login inicial
```javascript
// Usuario hace login
await login(username, password);

// Se guardan en localStorage:
// - access_token (válido por ~5 minutos)
// - refresh_token (válido por ~30 días)
// - token_expires_at (timestamp de expiración)
```

### 2. Operaciones normales
```javascript
// Cada operación llama a getValidToken()
const token = await getValidToken();

// getValidToken() verifica:
// - ¿Hay token?
// - ¿Está próximo a expirar? (< 1 minuto)
//   - SÍ → Refresca automáticamente con refresh_token
//   - NO → Usa el token actual
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

## Ventajas

✅ **Sesión persistente**: El usuario no tiene que volver a hacer login cada 5 minutos  
✅ **Seguridad**: El access_token de corta duración limita el riesgo si es robado  
✅ **Transparente**: El refresh ocurre automáticamente, sin interrumpir al usuario  
✅ **Estándar OAuth2**: Sigue las mejores prácticas de la industria

## Configuración en Keycloak

Los tiempos de expiración se configuran en Keycloak:

- **Access Token Lifespan**: 5 minutos (por defecto)
- **Refresh Token Lifespan**: 30 días (configurable)
- **SSO Session Idle**: Tiempo de inactividad antes de cerrar sesión

## Tokens guardados en localStorage

```javascript
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_expires_at": "1735689600000"
}
```

## Seguridad

⚠️ **localStorage vs cookies**:
- localStorage es vulnerable a XSS (Cross-Site Scripting)
- Para máxima seguridad, considera usar cookies HttpOnly
- En este proyecto usamos localStorage por simplicidad

🔒 **Mejores prácticas implementadas**:
- Tokens de corta duración
- Refresh automático antes de expirar
- Limpieza completa al cerrar sesión
- Validación en cada operación
