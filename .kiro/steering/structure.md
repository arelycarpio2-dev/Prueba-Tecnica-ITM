# Project Structure

```
Microfrontends/
└── users-mf/               # Users microfrontend (Vite + React)
    ├── public/             # Static assets (favicon, icons)
    ├── src/
    │   ├── assets/         # Images and SVGs imported in components
    │   ├── components/
    │   │   └── common/     # Reusable components across the app
    │   │       ├── PageHeader.jsx       # Page header with title and action button
    │   │       ├── DataTable.jsx        # Generic data table component
    │   │       ├── LoadingState.jsx     # Loading and error state handler
    │   │       └── ActionButtons.jsx    # Action buttons (edit, delete)
    │   ├── pages/          # Page-level components, co-located with their CSS
    │   │   ├── Login.jsx
    │   │   ├── login.css
    │   │   └── usuario/    # User management section
    │   │       ├── UsersPage.jsx        # Main users page
    │   │       ├── UsersPage.css
    │   │       └── components/          # Page-specific components
    │   │           ├── UserFormModal.jsx
    │   │           └── UserFormModal.css
    │   ├── routes/
    │   │   ├── AppRoutes.jsx       # Route definitions
    │   │   ├── ConfigRoutes.jsx    # Centralized route path constants (static class)
    │   │   ├── ProtectedRoute.jsx  # Auth guard using Outlet
    │   │   └── PublicRoute.jsx     # Public route guard
    │   ├── services/       # API service layer
    │   │   ├── authService.jsx              # Authentication & token management
    │   │   ├── usuarioService.jsx           # Get users
    │   │   ├── crearUsuarioService.jsx      # Create user
    │   │   ├── actualizarUsuarioService.jsx # Update user
    │   │   └── eliminarUsuarioService.jsx   # Delete user
    │   ├── App.jsx         # Root component — renders AppRoutes
    │   ├── App.css
    │   ├── main.jsx        # Entry point — mounts BrowserRouter + App
    │   └── index.css
    ├── vite.config.js
    ├── eslint.config.js
    └── package.json
```

## Conventions

### Naming
- **Pages**: Use descriptive names ending with "Page" (e.g., `UsersPage.jsx`)
- **Components**: Use PascalCase for component names (e.g., `DataTable.jsx`, `PageHeader.jsx`)
- **Common components**: Place reusable components in `src/components/common/`
- **Page-specific components**: Place in `src/pages/{section}/components/`

### Component Organization
- **Reusable components** (`src/components/common/`):
  - `PageHeader` - Page header with title and optional action button
  - `DataTable` - Generic table that accepts columns and data
  - `LoadingState` - Handles loading, error, and success states
  - `ActionButtons` - Reusable edit/delete buttons for tables

- **Page-specific components** (`src/pages/{section}/components/`):
  - Components used only within a specific page or section
  - Example: `UserFormModal` is only used in `UsersPage`

### Route Paths
- **Route paths** are defined as static class properties in `ConfigRoutes.jsx`
- Always reference `ConfigRoutes.*` instead of hardcoding path strings

### CSS
- **CSS is co-located** with its component file in the same folder
- Import it directly in the component (`import "./Component.css"`)
- Each component has its own CSS file for better maintainability

### Component Structure
- **Components use named function declarations** (`function MyComponent() {}`)
- Export as `export default MyComponent`
- Keep components focused and single-responsibility

### Protected Routes
- **Protected pages** are wrapped with `<ProtectedRoute />` in `AppRoutes.jsx`
- Auth check reads tokens from `localStorage`
- Automatic token refresh using refresh tokens

### Services
- All API calls go through service files in `src/services/`
- Services handle authentication, token refresh, and error handling
- Use `getValidToken()` from `authService` to ensure valid tokens

### New Microfrontends
- Add new microfrontends as sibling folders to `users-mf/` at the repo root
- Follow the same structure and conventions

