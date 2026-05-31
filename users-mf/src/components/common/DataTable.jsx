import "./DataTable.css";

// Tabla de datos genérica y reutilizable
// columns: [{ key: 'nombre', label: 'Nombre' }, ...]
// data: [{ id: 1, nombre: 'Juan', ... }, ...]
// renderActions: (item) => <ActionButtons ... />
function DataTable({ columns, data, renderActions, emptyMessage = "No hay datos disponibles" }) {
  if (data.length === 0) {
    return <p className="table-empty">{emptyMessage}</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {renderActions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
            {renderActions && <td>{renderActions(item)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
