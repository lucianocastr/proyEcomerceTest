import { readLastOrder } from "../lib/order";
import { Link } from "react-router-dom";

export default function Confirmacion() {
  const order = readLastOrder();

  if (!order) {
    return (
      <div style={{ padding: 16 }}>
        <h1 data-testid="confirmacion-page" className="text-4xl font-bold mb-4">
            Página de Confirmación
        </h1>

        <p data-testid="confirmacion-sin-orden">No hay una orden reciente.</p>
        <Link to="/catalogo">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1 data-testid="confirmacion-page">Página de Confirmación</h1>
      <p data-testid="orden-id"><strong>Orden:</strong> {order.id}</p>
      <p data-testid="orden-nombre"><strong>Nombre:</strong> {order.nombre}</p>
      <p data-testid="orden-email"><strong>Email:</strong> {order.email}</p>
      <p data-testid="orden-total"><strong>Total:</strong> ${order.total}</p>

      <ul data-testid="orden-items">
        {order.items.map((it) => (
          <li key={it.id}>
            {it.nombre} × {it.cantidad} — ${it.precio * it.cantidad}
          </li>
        ))}
      </ul>

      <Link to="/catalogo" data-testid="btn-volver">Volver al catálogo</Link>
    </div>
  );
}
