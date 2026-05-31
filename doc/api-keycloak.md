# API Keycloak - Referencia Rápida

Este documento contiene los comandos curl para interactuar directamente con la API REST de Keycloak.

## Requisitos

- Keycloak corriendo en `http://localhost:8080`
- `jq` instalado para formatear JSON
- `curl` instalado

## 1. Obtener Access Token

```bash
export ACCESS_TOKEN=$(curl -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  "http://localhost:8080/realms/master/protocol/openid-connect/token" \
  | jq -r .access_token)
```

Verificar que se asignó correctamente:

```bash
echo $ACCESS_TOKEN
```

## 2. Listar Usuarios

```bash
curl -s \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "http://localhost:8080/admin/realms/master/users?first=0&max=20" \
  | jq 'type'
```

Formato tabular:

```bash
curl -s \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  "http://localhost:8080/admin/realms/master/users?first=0&max=20" \
  | jq -r '
    .[] |
    [
      .id,
      .username,
      (.firstName // "-"),
      (.lastName // "-"),
      (.email // "-"),
      (if .enabled then "ACTIVE" else "DISABLED" end)
    ] | @tsv
  '
```

## 3. Crear Usuario

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
    "credentials": [
      {
        "type": "password",
        "value": "initial_password",
        "temporary": false
      }
    ]
  }'
```

## Notas

- `-H` es un encabezado HTTP
- El token JWT tiene una validez limitada (configurable en Keycloak)
- El realm usado es `master` y el cliente es `admin-cli`
