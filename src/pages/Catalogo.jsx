import productos from "../data/productos.json";
import { addToCart, readCart } from "../lib/cart";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Catalogo() {
  const [items, setItems] = useState(productos);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(readCart().reduce((acc, it) => acc + it.cantidad, 0));
  }, []);

  const handleAdd = (p) => {
    const updated = addToCart({ id: p.id, nombre: p.nombre, precio: p.precio });
    setCartCount(updated.reduce((acc, it) => acc + it.cantidad, 0));
  };

  return (
    <div style={{ padding: 16 }}>
      <h1 data-testid="catalogo-page">Página de Catálogo</h1>

      <div style={{ marginBottom: 12 }}>
        <Link to="/carrito" data-testid="link-carrito">
          Ir al carrito ({cartCount})
        </Link>
      </div>

      <ul data-testid="lista-productos" style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {items.map((p) => (
          <li key={p.id} data-testid={`producto-${p.id}`} style={{ border: "1px solid #444", padding: 12, borderRadius: 8 }}>
            <div><strong>{p.nombre}</strong></div>
            <div>Precio: ${p.precio}</div>
            <div>Stock: {p.stock}</div>
            <button
              data-testid={`btn-agregar-${p.id}`}
              onClick={() => handleAdd(p)}
              disabled={p.stock <= 0}
            >
              Agregar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
