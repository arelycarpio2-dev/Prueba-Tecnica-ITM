import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { FaTrash, FaPen, FaPlus } from "react-icons/fa6";
import ConfigRoutes from "../../routes/ConfigRoutes";

function Home() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([{}]);

  const [formulario, setFormulario] = useState({ });

  // Controla si el modal está abierto o cerrado
  const [modalAbierto, setModalAbierto] = useState(false);

  const [editando, setEditando] = useState(null);

  // Cerrar sesión: limpia el token y redirige al login
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate(ConfigRoutes.LOGIN);
  };

  // Capturar cambios en los inputs del formulario
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // Abrir modal para crear un nuevo usuario
  const abrirModalCrear = () => {
    setFormulario({ usuario: "", nombre: "", correo: "", estado: "Activo" });
    setEditando(null);
    setModalAbierto(true);
  };

  // Abrir modal para editar un usuario existente
  const abrirModalEditar = (usuario) => {
    setFormulario(usuario);
    setEditando(usuario.id);
    setModalAbierto(true);
  };

  // Cerrar modal y limpiar estado
  const cerrarModal = () => {
    setModalAbierto(false);
    setEditando(null);
    setFormulario({ usuario: "", nombre: "", correo: "", estado: "Activo" });
  };

  // Guardar: crea o actualiza según si hay un id en edición
  const guardarUsuario = () => {
    if (!formulario.usuario || !formulario.nombre || !formulario.correo) {
      alert("Completa todos los campos");
      return;
    }

    if (editando) {
      // EDITAR: reemplaza el usuario con el id correspondiente
      const actualizados = usuarios.map((u) =>
        u.id === editando ? { ...u, ...formulario } : u
      );
      setUsuarios(actualizados);
    } else {
      // CREAR: agrega un nuevo usuario con id único
      const nuevoUsuario = { id: Date.now(), ...formulario };
      setUsuarios([...usuarios, nuevoUsuario]);
    }

    cerrarModal();
  };

  // Eliminar usuario con confirmación
  const eliminarUsuario = (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  return (
    <div className="home-container">

      {/* ENCABEZADO */}
      <div className="home-header">
        <h1>Gestión de Usuarios</h1>
        <button className="btn-logout" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      {/* BOTÓN CREAR */}
      <div className="home-actions">
        <button className="btn-primary" onClick={abrirModalCrear}>
          <FaPlus /> Crear usuario
        </button>
      </div>

      {/* TABLA */}
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
              <td>
                <button
                  className="btn-edit"
                  onClick={() => abrirModalEditar(u)}
                >
                  <FaPen />
                </button>
                <button
                  className="btn-delete"
                  onClick={() => eliminarUsuario(u.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL FORMULARIO */}
      {modalAbierto && (
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
                onChange={handleChange}
              />

              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formulario.nombre}
                onChange={handleChange}
              />

              <label>Correo</label>
              <input
                type="email"
                name="correo"
                placeholder="correo@ejemplo.com"
                value={formulario.correo}
                onChange={handleChange}
              />

              <label>Estado</label>
              <select
                name="estado"
                value={formulario.estado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={guardarUsuario}>
                {editando ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
