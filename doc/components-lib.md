# @itm/components-lib — Librería de Componentes

Librería de componentes React reutilizables, construida con Vite en modo librería.

## Instalación

Como es un workspace del monorepo, se declara como dependencia en el `package.json` del microfrontend:

```json
{
  "dependencies": {
    "@itm/components-lib": "*"
  }
}
```

Luego desde la raíz del proyecto:

```bash
npm install
```

## Componentes Disponibles

### PageHeader

Encabezado de página con título y botón de acción opcional.

```jsx
import { PageHeader } from "@itm/components-lib";

<PageHeader
  title="Gestión de Usuarios"
  actionLabel="Cerrar sesión"
  onAction={handleLogout}
/>
```

| Prop | Tipo | Descripción |
|---|---|---|
| `title` | `string` | Título de la página |
| `actionLabel` | `string?` | Texto del botón (opcional) |
| `onAction` | `function?` | Callback al hacer clic (opcional) |

---

### DataTable

Tabla genérica configurable por props.

```jsx
import { DataTable, ActionButtons } from "@itm/components-lib";

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "correo", label: "Correo" },
];

const renderActions = (item) => (
  <ActionButtons onEdit={() => edit(item)} onDelete={() => del(item.id)} />
);

<DataTable
  columns={columns}
  data={usuarios}
  renderActions={renderActions}
  emptyMessage="No hay datos"
/>
```

| Prop | Tipo | Descripción |
|---|---|---|
| `columns` | `array` | `[{ key, label }]` |
| `data` | `array` | Arreglo de objetos con `id` |
| `renderActions` | `function?` | Renderiza acciones por fila |
| `emptyMessage` | `string` | Mensaje cuando no hay datos |

---

### LoadingState

Maneja estados de carga y error.

```jsx
import { LoadingState } from "@itm/components-lib";

<LoadingState loading={cargando} error={errorMsg} loadingMessage="Cargando...">
  <DataTable ... />
</LoadingState>
```

| Prop | Tipo | Descripción |
|---|---|---|
| `loading` | `boolean` | Muestra mensaje de carga |
| `error` | `string` | Muestra mensaje de error |
| `loadingMessage` | `string` | Texto personalizado de carga |
| `children` | `node` | Contenido cuando no hay loading/error |

---

### ActionButtons

Botones de acción (editar, eliminar) con iconos.

```jsx
import { ActionButtons } from "@itm/components-lib";

<ActionButtons
  onEdit={() => handleEdit(item)}
  onDelete={() => handleDelete(item.id)}
  editLabel="Editar"
  deleteLabel="Eliminar"
/>
```

| Prop | Tipo | Descripción |
|---|---|---|
| `onEdit` | `function?` | Callback de editar |
| `onDelete` | `function?` | Callback de eliminar |
| `editLabel` | `string` | Tooltip del botón editar |
| `deleteLabel` | `string` | Tooltip del botón eliminar |

## Estilos

La librería genera un archivo CSS separado. Debes importarlo en tu aplicación:

```jsx
import "@itm/components-lib/style.css";
```

## Build

```bash
# Desde la raíz del proyecto
npm run build -w packages/components-lib
```

Genera en `packages/components-lib/dist/`:
- `index.js` (ESM)
- `index.umd.cjs` (CommonJS)
- `index.css` (Estilos)
