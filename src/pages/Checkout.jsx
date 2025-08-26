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
    <div className="max-w-lg mx-auto bg-neutral-800 border border-neutral-700 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>

      {items.length > 0 && (
        <div className="mb-4">
          <ul className="text-sm space-y-1">
            {items.map((it) => (
              <li key={it.id}>
                {it.nombre} × {it.cantidad} — ${it.precio * it.cantidad}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: ${total}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" data-testid="checkout-form">
        <div>
          <label htmlFor="nombre" className="block mb-1 text-sm font-medium">
            Nombre
          </label>
          <input
            id="nombre"
            data-testid="input-nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-600 rounded-md bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            data-testid="input-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-600 rounded-md bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="dni" className="block mb-1 text-sm font-medium">
            DNI
          </label>
          <input
            id="dni"
            data-testid="input-dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-600 rounded-md bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p data-testid="checkout-error" className="text-red-400 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          data-testid="btn-confirmar"
          disabled={items.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow disabled:bg-gray-600"
        >
          Confirmar compra
        </button>
      </form>
    </div>
  );
}
