import productos from "../data/productos.json";
import { addToCart, readCart } from "../lib/cart";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Catalogo() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(readCart().reduce((acc, it) => acc + it.cantidad, 0));
  }, []);

  const handleAdd = (p) => {
    const updated = addToCart({ id: p.id, nombre: p.nombre, precio: p.precio });
    setCartCount(updated.reduce((acc, it) => acc + it.cantidad, 0));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>

      <div className="mb-6">
        <Link
          to="/carrito"
          data-testid="link-carrito"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          Ir al carrito ({cartCount})
        </Link>
      </div>

      <div
        data-testid="lista-productos"
        className="grid gap-6 grid-cols-1 sm:grid-cols-2"
      >
        {productos.map((p) => (
          <div
            key={p.id}
            data-testid={`producto-${p.id}`}
            className="bg-neutral-800 border border-neutral-700 rounded-lg shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{p.nombre}</h2>
              <p className="text-gray-400">Precio: ${p.precio}</p>
              <p className="text-gray-500">Stock: {p.stock}</p>
            </div>
            <button
              data-testid={`btn-agregar-${p.id}`}
              onClick={() => handleAdd(p)}
              disabled={p.stock <= 0}
              className="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 px-3 rounded-md shadow"
            >
              {p.stock > 0 ? "Agregar" : "Sin stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
