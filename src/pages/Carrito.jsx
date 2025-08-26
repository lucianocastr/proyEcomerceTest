import { readCart, clearCart } from "../lib/cart";
import { useEffect, useState } from "react";

export default function Carrito() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const total = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);

  return (
    <div style={{ padding: 16 }}>
      <h1 data-testid="carrito-page">Página de Carrito</h1>

      {items.length === 0 ? (
        <p data-testid="carrito-vacio">Tu carrito está vacío</p>
      ) : (
        <div>
          <ul data-testid="carrito-lista" style={{ listStyle: "none", padding: 0 }}>
            {items.map((it) => (
              <li key={it.id} data-testid={`carrito-item-${it.id}`} style={{ marginBottom: 8 }}>
                {it.nombre} × {it.cantidad} — ${it.precio * it.cantidad}
              </li>
            ))}
          </ul>
          <p data-testid="carrito-total"><strong>Total: ${total}</strong></p>
        </div>
      )}

      <button data-testid="carrito-limpiar" onClick={() => { clearCart(); setItems([]); }}>
        Vaciar carrito
      </button>
    </div>
  );
}
