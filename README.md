# Prueba Técnica ITM — Microfrontends

Monorepo de microfrontends con React 19 + Vite 8, autenticados contra Keycloak.

## Stack

**React 19** · **Vite 8** · **React Router 7** · **Keycloak (REST)** · **npm workspaces**

## Quick Start

```bash
# Comando para instalar librerias
npm install 

# Comando para compilar nuestras librerias de componentes
npm run build -w packages/components-lib

# 
npm run dev -w packages/users-mf
```

> Requiere **Keycloak** en `http://localhost:8080`. Ver [`doc/users-mf.md`](doc/users-mf.md) para cómo levartarlo con Docker.

## Documentación

| Documento | Descripción |
|---|---|
| [`doc/users-mf.md`](doc/users-mf.md) | Cómo levantar Keycloak con Docker, iniciar el microfrontend y API curl |
| [`doc/components-lib.md`](doc/components-lib.md) | Documentación y uso de los componentes compartidos |
| [`doc/architecture.md`](doc/architecture.md) | Arquitectura del proyecto |
| [`doc/auth-flow.md`](doc/auth-flow.md) | Flujo de autenticación y refresh token |
| [`doc/microfrontends-strategy.md`](doc/microfrontends-strategy.md) | Estrategia de microfrontends |
