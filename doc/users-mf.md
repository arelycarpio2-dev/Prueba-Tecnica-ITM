# users-mf — Microfrontend de Usuarios

Microfrontend para la gestión de usuarios contra Keycloak.

## Requisitos

- Node.js 18+
- Keycloak corriendo en `http://localhost:8080`
- Navegador moderno

## Levantar Keycloak con Docker

```bash
docker run -p 8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.0.0 \
  start-dev
```

Esto inicia Keycloak con:
- URL: `http://localhost:8080`
- Usuario admin: `admin`
- Contraseña: `admin`
- Realm por defecto: `master`

## Iniciar el Microfrontend

```bash
# Desde la raíz del proyecto
npm run dev -w packages/users-mf
```

Abre `http://localhost:5173` en el navegador.

## API Keycloak — Referencia Rápida

### Obtener Access Token

```bash
export ACCESS_TOKEN=$(curl -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  "http://localhost:8080/realms/master/protocol/openid-connect/token" \
  | jq -r .access_token)
```

### Listar Usuarios

```bash
curl -s \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  "http://localhost:8080/admin/realms/master/users?first=0&max=20" \
  | jq -r '
    .[] | [
      .id,
      .username,
      (.firstName // "-"),
      (.lastName // "-"),
      (.email // "-"),
      (if .enabled then "ACTIVE" else "DISABLED" end)
    ] | @tsv
  '
```

### Crear Usuario

```bash
curl -X POST "http://localhost:8080/admin/realms/master/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "username": "newuser",
    "enabled": true,
    "firstName": "Areli",
    "lastName": "Carpio",
    "email": "arelicarpio@example.com",
    "credentials": [{
      "type": "password",
      "value": "initial_password",
      "temporary": false
    }]
  }'
```

## Build de Producción

```bash
npm run build -w packages/users-mf
```

El output se genera en `packages/users-mf/dist/`.
