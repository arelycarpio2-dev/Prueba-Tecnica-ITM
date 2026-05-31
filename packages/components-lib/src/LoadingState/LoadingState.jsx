import "./LoadingState.css";

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
