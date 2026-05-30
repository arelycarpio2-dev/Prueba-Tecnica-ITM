import { useState } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  // Credenciales del admin guardadas al iniciar sesión
  // Se pasan como props a los componentes que las necesiten
  const [credenciales, setCredenciales] = useState({ usuario: "", contrasena: "" });

  return (
    <AppRoutes
      credenciales={credenciales}
      onLogin={setCredenciales}
    />
  );
}

export default App;
