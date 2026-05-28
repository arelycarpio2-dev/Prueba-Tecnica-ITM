import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { FaTrash, FaPen, FaPlus } from "react-icons/fa6";
import ConfigRoutes from "../../routes/ConfigRoutes";

function Home() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate(ConfigRoutes.LOGIN);
  };
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      usuario: "admin",
      nombre: "Ana López",
      correo: "ana@test.com",
      estado: "Activo",
    },
  ]);

  const [formulario, setFormulario] = useState({
    usuario: "",
    nombre: "",
    correo: "",
    estado: "Activo",
  });

  const [editando, setEditando] = useState(null);

  // Capturar cambios
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // Crear o actualizar usuario
  const guardarUsuario = () => {
    if (
      !formulario.usuario ||
      !formulario.nombre ||
      !formulario.correo
    ) {
      alert("Completa todos los campos");
      return;
    }

    // EDITAR
    if (editando) {
      const actualizados = usuarios.map((u) =>
        u.id === editando
          ? { ...u, ...formulario }
          : u
      );

      setUsuarios(actualizados);
      setEditando(null);
    } else {
      // CREAR
      const nuevoUsuario = {
        id: Date.now(),
        ...formulario,
      };

      setUsuarios([...usuarios, nuevoUsuario]);
    }

    // Limpiar formulario
    setFormulario({
      usuario: "",
      nombre: "",
      correo: "",
      estado: "Activo",
    });
  };

  // Editar
  const editarUsuario = (usuario) => {
    setFormulario(usuario);
    setEditando(usuario.id);
  };

  // Eliminar
  const eliminarUsuario = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este usuario?"
    );

    if (!confirmar) return;

    const filtrados = usuarios.filter((u) => u.id !== id);

    setUsuarios(filtrados);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <center>
          <h1>Gestión de Usuarios</h1>
        </center>
        <button className="btn-logout" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      {/* FORMULARIO */}
      <div className="form-container">
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={formulario.usuario}
          onChange={handleChange}
        />

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={handleChange}
        />

        <button className="btn-primary" onClick={guardarUsuario}>
          <FaPlus />
          {editando ? " Actualizar" : " Crear usuario"}
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
                  onClick={() => editarUsuario(u)}
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
    </div>
  );
}

export default Home;