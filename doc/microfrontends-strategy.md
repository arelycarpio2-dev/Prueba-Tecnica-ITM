# Estrategia de Microfrontends y Componentes Compartidos

## Situación Actual

Actualmente tenemos un solo microfrontend (`users-mf/`) que contiene:
- Componentes reutilizables (`src/components/common/`)
- Lógica de negocio (servicios, páginas)
- Estilos

Si creamos nuevos microfrontends (ej: `products-mf`, `orders-mf`), cada uno duplicaría los componentes comunes (`DataTable`, `PageHeader`, `LoadingState`, `ActionButtons`).

## Objetivo

Crear un proyecto separado que albergue los **componentes compartidos** y que cada microfrontend los consuma, evitando duplicación y garantizando consistencia visual.

---

## Opciones Arquitectónicas

### Opción 1: Monorepo 

Crear un monorepo con dos paquetes: una librería de componentes y los microfrontends.

```
Prueba-Tecnica-ITM-main/
├── packages/
│   ├── components-lib/        # 📦 Librería de componentes compartidos
│   │   ├── src/
│   │   │   ├── DataTable/
│   │   │   ├── PageHeader/
│   │   │   ├── LoadingState/
│   │   │   ├── ActionButtons/
│   │   │   └── index.js       # Barril de exportaciones
│   │   └── package.json       # name: "@itm/components-lib"
│   ├── users-mf/              # Microfrontend actual
│   └── products-mf/           # Futuro microfrontend
├── package.json               # workspaces: ["packages/*"]
└── README.md
```

**Ventajas:**
- Los componentes se importan como `import { DataTable } from "@itm/components-lib"`
- Los cambios en la librería se reflejan al instante (workspace symlink)
- Un solo repo, un solo `npm install`
- Fácil de publicar como paquete privado después

**Desventajas:**
- Todos los microfrontends comparten el mismo `node_modules`
- Hay que configurar bien los builds

**Configuración básica:**

```json
// package.json (raíz)
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

---

### Comandos

```bash
# Instalar todo (raíz del proyecto)
npm install

# Build de la librería de componentes
npm run build -w packages/components-lib

# Dev del microfrontend users
npm run dev -w packages/users-mf

# Build de users
npm run build -w packages/users-mf
```

---

## Conclusión

El monorepo con npm workspaces es la opción más equilibrada para este proyecto:
- **Simplicidad**: No requiere infraestructura adicional
- **Velocidad**: Los cambios se reflejan instantáneamente
- **Escalabilidad**: Funciona tanto para 2 como para 10 microfrontends
- **Cero overhead operativo**: No hay que publicar/versionar paquetes
