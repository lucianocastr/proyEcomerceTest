import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readCart } from "../lib/cart";
import { createOrder } from "../lib/order";

export default function Checkout() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const items = readCart();
  const total = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validaciones mínimas
    if (!nombre.trim() || !email.trim() || !dni.trim()) {
      setError("Completa todos los campos");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email inválido");
      return;
    }
    if (!/^\d{7,9}$/.test(dni)) {
      setError("DNI inválido");
      return;
    }
    if (items.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    try {
      createOrder({ nombre, email, dni });
      navigate("/confirmacion");
    } catch (err) {
      setError(err.message || "Error al crear la orden");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1 data-testid="checkout-page">Página de Checkout</h1>

      {items.length === 0 ? (
        <p data-testid="checkout-sin-items">No hay items en el carrito.</p>
      ) : (
        <div>
          <ul data-testid="checkout-resumen" style={{ listStyle: "none", padding: 0 }}>
            {items.map((it) => (
              <li key={it.id}>
                {it.nombre} × {it.cantidad} — ${it.precio * it.cantidad}
              </li>
            ))}
          </ul>
          <p data-testid="checkout-total"><strong>Total: ${total}</strong></p>
        </div>
      )}

      <form onSubmit={handleSubmit} data-testid="checkout-form" style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" data-testid="input-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input id="email" data-testid="input-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="dni">DNI</label>
        <input id="dni" data-testid="input-dni" value={dni} onChange={(e) => setDni(e.target.value)} />

        <button type="submit" data-testid="btn-confirmar" disabled={items.length === 0}>
          Confirmar compra
        </button>
      </form>

      {error && <p data-testid="checkout-error" style={{ color: "tomato" }}>{error}</p>}
    </div>
  );
}
