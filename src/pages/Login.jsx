import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuarios from "../data/usuarios.json";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const found = usuarios.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (found) {
      // sesión mínima para futuras pantallas
      localStorage.setItem("sessionUser", JSON.stringify({ email: found.email, nombre: found.nombre }));
      navigate("/catalogo");
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1 data-testid="login-page">Página de Login</h1>

      <form onSubmit={handleSubmit} data-testid="login-form" style={{ display: "grid", gap: 8, maxWidth: 360 }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          data-testid="input-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          data-testid="input-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" data-testid="btn-login">Ingresar</button>
      </form>

      {error && (
        <p data-testid="login-error" style={{ color: "tomato", marginTop: 8 }}>
          {error}
        </p>
      )}
    </div>
  );
}
