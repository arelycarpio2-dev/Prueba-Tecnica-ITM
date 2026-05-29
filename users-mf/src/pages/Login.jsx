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

    // Se guarda la URL del Login de nuestro KEYCLOACK
    const LOGIN_URL = "/auth/realms/master/protocol/openid-connect/token";

    // Se guardan los parametros para la autenticación del login
    const params = new URLSearchParams();
    params.append("client_id", "admin-cli");  
    params.append("username", username.trim());
    params.append("password", password);
    params.append("grant_type", "password");

    /*
     * Request en español significa peticion 
     * ¿Qué es una peticion?
     * Es un mensaje que se le envia al servidor
     * para solicitar datos
     */
    try {
      const request = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        body: params,
      });

      // Aqui se valida la peticion
      if (!request.ok) {
        setError("Credenciales incorrectas");
        return;
      }
      
      // Esto es lo que nos devuelve el servidor 
      const response = await request.json();

      // Por medio de la respuesta guardamos el token en localStorage
      localStorage.setItem("token", response.access_token);

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