import { FaPen, FaTrash } from "react-icons/fa6";
import "./ActionButtons.css";

function ActionButtons({ onEdit, onDelete, editLabel = "Editar", deleteLabel = "Eliminar" }) {
  return (
    <div className="action-buttons LIB-ARELIS">
      {onEdit && (
        <button
          className="btn-action btn-edit"
          onClick={onEdit}
          title={editLabel}
        >
          <FaPen />
        </button>
      )}
      {onDelete && (
        <button
          className="btn-action btn-delete"
          onClick={onDelete}
          title={deleteLabel}
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
}

export default ActionButtons;
