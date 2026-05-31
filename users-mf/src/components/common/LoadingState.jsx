import "./LoadingState.css";

// Componente reutilizable para mostrar estados de carga y error
function LoadingState({ loading, error, loadingMessage = "Cargando...", children }) {
  if (loading) {
    return <p className="loading-message">{loadingMessage}</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return <>{children}</>;
}

export default LoadingState;
