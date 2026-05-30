import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import ConfigRoutes from "../routes/ConfigRoutes";
import { login } from "../services/authService.jsx";

// Recibe onLogin para notificar al padre las credenciales al autenticarse
function Login({ onLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      // Pasar las credenciales al componente padre (App)
      onLogin({ usuario: username, contrasena: password });
      navigate(ConfigRoutes.HOME);
    } catch (err) {
      console.log(err);
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <label>Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu usuario"
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
