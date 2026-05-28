# DOCUMENTACION TECNICA

1. Guardamos una variable "Access_token"

2. Autenticamos a la URL ("http://localhost:8080/realms/master/protocol/openid-connect/token")

3. Ingresamos usuario:admin y contraseña:admin

```bash
export ACCESS_TOKEN=$(curl -d "client_id=admin-cli" -d "username=admin" -d "password=admin" -d "grant_type=password" "http://localhost:8080/realms/master/protocol/openid-connect/token" | jq -r .access_token)
```
- Este es un paso informativo para verificar que el jwt haya sido asignada la variable.
```bash
echo $ACCESS_TOKEN 
```
- <b>-H:</b> Es un encabezado
```bash
curl -s \ 
-H "Authorization: Bearer ${ACCESS_TOKEN}" \
"http://localhost:8080/admin/realms/master/users?first=0&max=20" \
| jq 'type'
```
- Visualizar la lista de usuarios

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
- Creación de usuario

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
