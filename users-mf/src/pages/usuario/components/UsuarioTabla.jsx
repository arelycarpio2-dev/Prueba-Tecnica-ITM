import UsuarioAcciones from "./UsuarioAcciones";
import "../home.css";

// Tabla que lista todos los usuarios.
// Delega los botones de cada fila a UsuarioAcciones.
function UsuarioTabla({ usuarios, onEditar, onEliminar }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u) => (
          <tr key={u.id}>
            <td>{u.usuario}</td>
            <td>{u.nombre}</td>
            <td>{u.correo}</td>
            <td>{u.estado}</td>

            {/* Acciones: editar y eliminar */}
            <UsuarioAcciones
              usuario={u}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsuarioTabla;
