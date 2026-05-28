import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import ConfigRoutes from "../routes/ConfigRoutes";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Aquí va la URL de tu Keycloak (ajústala a tu entorno)
    const KEYCLOAK_URL =
      "/auth/realms/master/protocol/openid-connect/token";

    const params = new URLSearchParams();
    params.append("client_id", "admin-cli");  
    params.append("username", username);
    params.append("password", password);
    params.append("grant_type", "password");

    try {
      const response = await fetch(KEYCLOAK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        body: params,
      });

      if (!response.ok) {
        setError("Credenciales incorrectas");
        return;
      }

      const data = await response.json();
      console.log(data);

      // Guardamos el token en localStorage
      localStorage.setItem("token", data.access_token);

      // Redirige al Home
      navigate(ConfigRoutes.HOME);
    } catch (error) {
      console.log(error);
      setError("Error al conectar con el servidor");
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