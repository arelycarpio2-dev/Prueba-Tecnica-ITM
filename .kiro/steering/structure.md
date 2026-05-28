# Project Structure

```
Microfrontends/
└── users-mf/               # Users microfrontend (Vite + React)
    ├── public/             # Static assets (favicon, icons)
    ├── src/
    │   ├── assets/         # Images and SVGs imported in components
    │   ├── pages/          # Page-level components, co-located with their CSS
    │   │   ├── Login.jsx
    │   │   ├── login.css
    │   │   └── usuario/    # Sub-folder per user role/section
    │   │       ├── Home.jsx
    │   │       └── home.css
    │   ├── routes/
    │   │   ├── AppRoutes.jsx       # Route definitions
    │   │   ├── ConfigRoutes.jsx    # Centralized route path constants (static class)
    │   │   └── ProtectedRoute.jsx  # Auth guard using Outlet
    │   ├── App.jsx         # Root component — renders AppRoutes
    │   ├── App.css
    │   ├── main.jsx        # Entry point — mounts BrowserRouter + App
    │   └── index.css
    ├── vite.config.js
    ├── eslint.config.js
    └── package.json
```

## Conventions

- **Route paths** are defined as static class properties in `ConfigRoutes.jsx`. Always reference `ConfigRoutes.*` instead of hardcoding path strings.
- **Pages** live in `src/pages/`. Group pages by role or section in sub-folders (e.g., `usuario/`).
- **CSS is co-located** with its component file in the same folder. Import it directly in the component (`import "./component.css"`).
- **Components use named function declarations** (`function MyComponent() {}`) and are exported as `export default`.
- **Protected pages** are wrapped with `<ProtectedRoute />` in `AppRoutes.jsx`. Auth check reads `localStorage.getItem("token")`.
- New microfrontends should be added as sibling folders to `users-mf/` at the repo root.
