# Tech Stack

## Core
- **React 19** with JSX (`.jsx` files)
- **React Router DOM v7** for client-side routing
- **Vite 8** as the build tool and dev server
- **ESLint 10** with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`

## Libraries
- `react-icons` (v5, `fa6` subset) — icon components
- `react-router-dom` — `BrowserRouter`, `Routes`, `Route`, `Navigate`, `Outlet`, `useNavigate`

## Auth
- Keycloak via direct REST calls (no Keycloak JS adapter)
- Token stored in `localStorage` under the key `"token"`
- Vite dev proxy rewrites `/auth/*` → `http://localhost:8080/*`

## Common Commands

```bash
# Start dev server (run manually in terminal)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

All commands must be run from the `users-mf/` directory.

## Notes
- No test framework is currently configured.
- ESM modules (`"type": "module"` in package.json).
- No TypeScript — plain JS/JSX only.
