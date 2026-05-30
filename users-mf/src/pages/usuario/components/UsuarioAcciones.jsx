import { FaPen, FaTrash } from "react-icons/fa6";
import "../home.css";

// Botones de acción por fila: editar y eliminar.
// Recibe el usuario de la fila y los callbacks correspondientes.
function UsuarioAcciones({ usuario, onEditar, onEliminar }) {
  return (
    <td>
      {/* Botón editar: abre el modal con los datos del usuario */}
      <button
        className="btn-edit"
        onClick={() => onEditar(usuario)}
      >
        <FaPen />
      </button>

      {/* Botón eliminar: solicita confirmación antes de borrar */}
      <button
        className="btn-delete"
        onClick={() => onEliminar(usuario.id)}
      >
        <FaTrash />
      </button>
    </td>
  );
}

export default UsuarioAcciones;
