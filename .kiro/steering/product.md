# Product Overview

This is a **microfrontend** project for user management. The current microfrontend (`users-mf`) provides:

- **Authentication** via Keycloak (OpenID Connect / password grant flow)
- **User management UI**: create, edit, and delete users in a table view
- **Protected routing**: unauthenticated users are redirected to login

The app is written in Spanish (UI labels, comments, variable names). Maintain this convention when adding new UI text or code comments.

The backend identity provider is **Keycloak**, running locally at `http://localhost:8080`, using the `master` realm and `admin-cli` client.
