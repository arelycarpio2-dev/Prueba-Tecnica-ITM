import "../home.css";

// Modal compartido para crear y editar usuarios.
function UsuarioFormModal({ formulario, editando, onChange, onGuardar, onCerrar }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editando ? "Editar usuario" : "Crear usuario"}</h2>

        <div className="modal-form">
          <label>Usuario</label>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={formulario.usuario}
            onChange={onChange}
          />

          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formulario.nombre}
            onChange={onChange}
          />

          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formulario.apellido}
            onChange={onChange}
          />

          <label>Correo</label>
          <input
            type="email"
            name="correo"
            placeholder="correo@ejemplo.com"
            value={formulario.correo}
            onChange={onChange}
          />

          {/* Campos solo visibles al crear */}
          {!editando && (
            <>
              <label>Contraseña</label>
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={formulario.contrasena}
                onChange={onChange}
              />
            </>
          )}

          <label>Estado</label>
          <select
            name="estado"
            value={formulario.estado}
            onChange={onChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCerrar}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={onGuardar}>
            {editando ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsuarioFormModal;
