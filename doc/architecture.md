# Arquitectura del Proyecto

## Visión General

```
Prueba-Tecnica-ITM-main/
├── doc/                     # Documentación del proyecto
├── packages/
│   ├── components-lib/      # 📦 Componentes React reutilizables (Vite lib)
│   │   ├── src/
│   │   │   ├── DataTable/
│   │   │   ├── PageHeader/
│   │   │   ├── LoadingState/
│   │   │   └── ActionButtons/
│   │   └── package.json     # @itm/components-lib
│   ├── users-mf/            # 👤 Microfrontend de gestión de usuarios
│   └── ...
│       ├── src/
│       │   ├── pages/       # Páginas de la aplicación
│       │   ├── routes/      # Configuración de rutas y guards
│       │   └── services/    # Capa de servicios (API calls)
│       └── package.json
├── package.json             # workspaces: ["packages/*"]
└── README.md
```

## Convenciones

- Los componentes reutilizables están en `packages/components-lib/` y se importan como `@itm/components-lib`
- Cada microfrontend es un paquete independiente dentro de `packages/`
- Para ejecutar un microfrontend: `npm run dev -w packages/<nombre>`
- Para build de la librería: `npm run build -w packages/components-lib`

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19.x | UI components |
| Vite | 8.x | Build tool & dev server |
| React Router DOM | 7.x | Client-side routing |
| react-icons | 5.x | Iconos (Fa6 subset) |
| Keycloak | - | Identity provider (REST) |
| ESLint | 10.x | Linting |

## Flujo de Autenticación

```
Login → Keycloak (password grant) → access_token + refresh_token
                                          ↓
                                   localStorage
                                          ↓
                              getValidToken() en cada request
                                          ↓
                              ¿Token próximo a expirar (< 1 min)?
                              ┌─ Sí → refresh automático
                              └─ No → usa token actual
```

## Enrutamiento

- **PublicRoute**: Solo accesible sin sesión activa (redirige a Home si ya hay sesión)
- **ProtectedRoute**: Solo accesible con sesión activa (redirige a Login si no hay token)

## Capa de Servicios

Cada servicio en `src/services/` se encarga de una operación CRUD contra la API de Keycloak:

| Servicio | Método | Endpoint |
|---|---|---|
| `authService.jsx` | POST | `/auth/realms/master/protocol/openid-connect/token` |
| `usuarioService.jsx` | GET | `/auth/admin/realms/master/users` |
| `crearUsuarioService.jsx` | POST | `/auth/admin/realms/master/users` |
| `actualizarUsuarioService.jsx` | PUT | `/auth/admin/realms/master/users/{id}` |
| `eliminarUsuarioService.jsx` | DELETE | `/auth/admin/realms/master/users/{id}` |

## Proxy de Desarrollo

Vite proxy configurado para redirigir `/auth/*` → `http://localhost:8080/*`

```javascript
// vite.config.js
proxy: {
  "/auth": {
    target: "http://localhost:8080",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/auth/, ""),
  },
}
```
