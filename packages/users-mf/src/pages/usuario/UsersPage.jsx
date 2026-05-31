import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import ConfigRoutes from "../../routes/ConfigRoutes";
import { PageHeader, DataTable, LoadingState, ActionButtons } from "@itm/components-lib";
import "@itm/components-lib/style.css";
import UserFormModal from "./components/UserFormModal";
import { obtenerUsuarios } from "../../services/usuarioService.jsx";
import { crearUsuario } from "../../services/crearUsuarioService.jsx";
import { actualizarUsuario } from "../../services/actualizarUsuarioService.jsx";
import { eliminarUsuario as eliminarUsuarioService } from "../../services/eliminarUsuarioService.jsx";
import "./UsersPage.css";

// Estado inicial vacío para un usuario
const EMPTY_USER = {
  usuario: "",
  nombre: "",
  apellido: "",
  correo: "",
  contrasena: "",
  estado: "Activo",
};

// Definición de columnas para la tabla
const TABLE_COLUMNS = [
  { key: "usuario", label: "Usuario" },
  { key: "nombre", label: "Nombre" },
  { key: "correo", label: "Correo" },
  { key: "estado", label: "Estado" },
];

function UsersPage() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorLista, setErrorLista] = useState("");
  const [usuario, setUsuario] = useState(EMPTY_USER);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(null);

  // Helper para manejar sesión expirada
  const manejarSesionExpirada = () => {
    alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expires_at");
    navigate(ConfigRoutes.LOGIN);
  };

  // Carga la lista de usuarios desde el servicio
  const cargarUsuarios = async () => {
    setCargando(true);
    setErrorLista("");
    try {
      const lista = await obtenerUsuarios();
      setUsuarios(lista);
    } catch (error) {
      console.error(error);
      if (error.message === "Sesión expirada") {
        manejarSesionExpirada();
        return;
      }
      setErrorLista("No se pudo cargar la lista de usuarios");
    } finally {
      setCargando(false);
    }
  };

  // Manejo de cambios en los campos del usuario
  const handleUsuarioChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  // Abrir modal para crear un nuevo usuario
  const handleCrearUsuario = () => {
    setUsuario(EMPTY_USER);
    setEditando(null);
    setModalAbierto(true);
  };

  // Abrir modal para editar un usuario existente
  const handleEditarUsuario = (usuarioSeleccionado) => {
    setUsuario(usuarioSeleccionado);
    setEditando(usuarioSeleccionado.id);
    setModalAbierto(true);
  };

  // Cerrar modal y limpiar estado
  const handleCerrarModal = () => {
    setModalAbierto(false);
    setEditando(null);
    setUsuario(EMPTY_USER);
  };

  // Guardar usuario (crear o actualizar)
  const handleGuardarUsuario = async () => {
    if (!usuario.usuario || !usuario.nombre || !usuario.correo) {
      alert("Completa todos los campos");
      return;
    }

    try {
      if (editando) {
        await actualizarUsuario(usuario);
      } else {
        await crearUsuario(usuario);
      }
      await cargarUsuarios();
      handleCerrarModal();
    } catch (error) {
      console.error(error);
      if (error.message === "Sesión expirada") {
        manejarSesionExpirada();
        return;
      }
      alert(editando ? "Error al actualizar el usuario" : "Error al crear el usuario");
    }
  };

  // Eliminar usuario con confirmación
  const handleEliminarUsuario = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;

    try {
      await eliminarUsuarioService(id);
      await cargarUsuarios();
    } catch (error) {
      console.error(error);
      if (error.message === "Sesión expirada") {
        manejarSesionExpirada();
        return;
      }
      alert("Error al eliminar el usuario");
    }
  };

  // Cerrar sesión y limpiar tokens
  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expires_at");
    navigate(ConfigRoutes.LOGIN);
  };

  // Renderiza los botones de acción para cada fila
  const renderUsuarioActions = (usuarioFila) => (
    <ActionButtons
      onEdit={() => handleEditarUsuario(usuarioFila)}
      onDelete={() => handleEliminarUsuario(usuarioFila.id)}
    />
  );

  // Al montar el componente, carga la lista de usuarios
  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      setErrorLista("");
      try {
        const lista = await obtenerUsuarios();
        setUsuarios(lista);
      } catch (error) {
        console.error(error);
        if (error.message === "Sesión expirada") {
          manejarSesionExpirada();
          return;
        }
        setErrorLista("No se pudo cargar la lista de usuarios");
      } finally {
        setCargando(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="users-page">
      <PageHeader
        title="Gestión de Usuarios"
        actionLabel="Cerrar sesión"
        onAction={handleCerrarSesion}
      />

      <div className="page-actions">
        <button className="btn-primary" onClick={handleCrearUsuario}>
          <FaPlus /> Crear usuario
        </button>
      </div>

      <LoadingState
        loading={cargando}
        error={errorLista}
        loadingMessage="Cargando usuarios..."
      >
        <DataTable
          columns={TABLE_COLUMNS}
          data={usuarios}
          renderActions={renderUsuarioActions}
          emptyMessage="No hay usuarios registrados"
        />
      </LoadingState>

      {modalAbierto && (
        <UserFormModal
          usuario={usuario}
          editando={editando}
          onChange={handleUsuarioChange}
          onGuardar={handleGuardarUsuario}
          onCerrar={handleCerrarModal}
        />
      )}
    </div>
  );
}

export default UsersPage;
