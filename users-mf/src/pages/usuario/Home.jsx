import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { FaPlus } from "react-icons/fa6";
import ConfigRoutes from "../../routes/ConfigRoutes";
import UsuarioTabla from "./components/UsuarioTabla";
import UsuarioFormModal from "./components/UsuarioFormModal";
import { obtenerUsuarios } from "../../services/usuarioService.jsx";
import { crearUsuario } from "../../services/crearUsuarioService.jsx";

// Estado inicial vacío del formulario
const FORMULARIO_VACIO = {
  usuario: "",
  nombre: "",
  apellido: "",
  correo: "",
  contrasena: "",
  estado: "Activo",
};

// Home recibe las credenciales del admin autenticado como props
function Home({ credenciales }) {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);

  // Estados para manejar la carga y errores de la lista
  const [cargando, setCargando] = useState(true);
  const [errorLista, setErrorLista] = useState("");

  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);

  // Controla si el modal está visible
  const [modalAbierto, setModalAbierto] = useState(false);

  // Guarda el id del usuario que se está editando (null = modo crear)
  const [editando, setEditando] = useState(null);

  // Al montar el componente, carga la lista de usuarios desde Keycloak
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Llama al servicio y actualiza el estado con la lista de usuarios
  const cargarUsuarios = async () => {
    setCargando(true);
    setErrorLista("");
    try {
      const lista = await obtenerUsuarios();
      setUsuarios(lista);
    } catch (error) {
      console.error(error);
      setErrorLista("No se pudo cargar la lista de usuarios");
    } finally {
      setCargando(false);
    }
  };

  // Cerrar sesión: limpia el token y redirige al login
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate(ConfigRoutes.LOGIN);
  };

  // Capturar cambios en los inputs del formulario
  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  // Abrir modal en modo crear
  const abrirModalCrear = () => {
    setFormulario(FORMULARIO_VACIO);
    setEditando(null);
    setModalAbierto(true);
  };

  // Abrir modal en modo editar con los datos del usuario seleccionado
  const abrirModalEditar = (usuario) => {
    setFormulario(usuario);
    setEditando(usuario.id);
    setModalAbierto(true);
  };

  // Cerrar modal y resetear estado del formulario
  const cerrarModal = () => {
    setModalAbierto(false);
    setEditando(null);
    setFormulario(FORMULARIO_VACIO);
  };

  // Guardar: crea un usuario nuevo o actualiza el existente
  const guardarUsuario = async () => {
    if (!formulario.usuario || !formulario.nombre || !formulario.correo) {
      alert("Completa todos los campos");
      return;
    }

    if (editando) {
      // Actualizar: reemplaza el usuario con el id en edición
      const actualizados = usuarios.map((u) =>
        u.id === editando ? { ...u, ...formulario } : u
      );
      setUsuarios(actualizados);
      cerrarModal();
    } else {
      // Crear: llama al servicio y recarga la lista desde Keycloak
      try {
        await crearUsuario(formulario, credenciales.usuario, credenciales.contrasena);
        await cargarUsuarios();
        cerrarModal();
      } catch (error) {
        console.error(error);
        alert("Error al crear el usuario");
      }
    }
  };

  // Eliminar usuario tras confirmación
  const eliminarUsuario = (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  return (
    <div className="home-container">

      {/* ENCABEZADO con título y botón de cerrar sesión */}
      <div className="home-header">
        <h1>Gestión de Usuarios</h1>
        <button className="btn-logout" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      {/* ACCIÓN PRINCIPAL: abrir modal para crear usuario */}
      <div className="home-actions">
        <button className="btn-primary" onClick={abrirModalCrear}>
          <FaPlus /> Crear usuario
        </button>
      </div>

      {/* Estados de carga y error */}
      {cargando && <p className="lista-mensaje">Cargando usuarios...</p>}
      {errorLista && <p className="lista-error">{errorLista}</p>}

      {/* TABLA de usuarios con acciones por fila */}
      {!cargando && !errorLista && (
        <UsuarioTabla
          usuarios={usuarios}
          onEditar={abrirModalEditar}
          onEliminar={eliminarUsuario}
        />
      )}

      {/* MODAL de formulario: visible solo cuando modalAbierto es true */}
      {modalAbierto && (
        <UsuarioFormModal
          formulario={formulario}
          editando={editando}
          onChange={handleChange}
          onGuardar={guardarUsuario}
          onCerrar={cerrarModal}
        />
      )}

    </div>
  );
}

export default Home;
