import "./PageHeader.css";

// Encabezado reutilizable con título y acción opcional (ej: cerrar sesión)
function PageHeader({ title, actionLabel, onAction }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {actionLabel && onAction && (
        <button className="btn-logout" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default PageHeader;
