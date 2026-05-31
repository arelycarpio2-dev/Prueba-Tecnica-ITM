# Componentes Reutilizables

Esta carpeta contiene componentes genéricos y reutilizables que pueden usarse en cualquier parte de la aplicación.

## 📦 Componentes Disponibles

### 1. PageHeader

Encabezado de página con título y botón de acción opcional.

**Props:**
- `title` (string, requerido) - Título de la página
- `actionLabel` (string, opcional) - Texto del botón de acción
- `onAction` (function, opcional) - Callback al hacer clic en el botón

**Ejemplo:**
```jsx
<PageHeader
  title="Gestión de Usuarios"
  actionLabel="Cerrar sesión"
  onAction={handleLogout}
/>
```

---

### 2. DataTable

Tabla de datos genérica y configurable.

**Props:**
- `columns` (array, requerido) - Definición de columnas: `[{ key: 'nombre', label: 'Nombre' }, ...]`
- `data` (array, requerido) - Datos a mostrar: `[{ id: 1, nombre: 'Juan', ... }, ...]`
- `renderActions` (function, opcional) - Función que renderiza acciones por fila: `(item) => <ActionButtons ... />`
- `emptyMessage` (string, opcional) - Mensaje cuando no hay datos (default: "No hay datos disponibles")

**Ejemplo:**
```jsx
const columns = [
  { key: "usuario", label: "Usuario" },
  { key: "nombre", label: "Nombre" },
  { key: "correo", label: "Correo" },
];

const renderActions = (item) => (
  <ActionButtons
    onEdit={() => handleEdit(item)}
    onDelete={() => handleDelete(item.id)}
  />
);

<DataTable
  columns={columns}
  data={usuarios}
  renderActions={renderActions}
  emptyMessage="No hay usuarios registrados"
/>
```

---

### 3. LoadingState

Maneja estados de carga, error y éxito de forma declarativa.

**Props:**
- `loading` (boolean, requerido) - Indica si está cargando
- `error` (string, opcional) - Mensaje de error a mostrar
- `loadingMessage` (string, opcional) - Mensaje de carga (default: "Cargando...")
- `children` (ReactNode, requerido) - Contenido a mostrar cuando no hay carga ni error

**Ejemplo:**
```jsx
<LoadingState
  loading={isLoading}
  error={errorMessage}
  loadingMessage="Cargando usuarios..."
>
  <DataTable columns={columns} data={data} />
</LoadingState>
```

---

### 4. ActionButtons

Botones de acción reutilizables (editar, eliminar) para tablas.

**Props:**
- `onEdit` (function, opcional) - Callback para editar
- `onDelete` (function, opcional) - Callback para eliminar
- `editLabel` (string, opcional) - Tooltip del botón editar (default: "Editar")
- `deleteLabel` (string, opcional) - Tooltip del botón eliminar (default: "Eliminar")

**Ejemplo:**
```jsx
<ActionButtons
  onEdit={() => handleEdit(item)}
  onDelete={() => handleDelete(item.id)}
/>
```

---

## 🎨 Estilos

Cada componente tiene su propio archivo CSS co-localizado. Los estilos están diseñados para ser consistentes y reutilizables.

### Clases CSS principales:
- `.page-header` - Encabezado de página
- `.data-table` - Tabla de datos
- `.loading-message` - Mensaje de carga
- `.error-message` - Mensaje de error
- `.action-buttons` - Contenedor de botones de acción
- `.btn-action`, `.btn-edit`, `.btn-delete` - Botones de acción

---

## 🔧 Cómo agregar nuevos componentes reutilizables

1. Crea el componente en esta carpeta: `ComponentName.jsx`
2. Crea su CSS: `ComponentName.css`
3. Hazlo genérico y configurable mediante props
4. Documenta las props y ejemplos de uso en este README
5. Usa nombres descriptivos en inglés para mantener consistencia

---

## 📝 Buenas prácticas

✅ **Hacer:**
- Mantener componentes pequeños y enfocados
- Usar props para configuración
- Documentar props y ejemplos
- Incluir valores por defecto razonables
- Usar PropTypes o TypeScript para validación (futuro)

❌ **Evitar:**
- Lógica de negocio específica de una página
- Dependencias de estado global
- Estilos inline (usar CSS modules)
- Componentes demasiado complejos o acoplados
