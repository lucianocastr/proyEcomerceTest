import { Link } from "react-router-dom";
import { readCart } from "../lib/cart";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const items = readCart();
    setCartCount(items.reduce((acc, it) => acc + it.cantidad, 0));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold">
            Proyecto de Grado • Mini Ticketera
          </h1>

          <nav className="text-sm sm:text-base flex gap-4 items-center">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/catalogo" className="hover:underline">Catálogo</Link>
            <Link to="/carrito" className="relative hover:underline">
              Carrito
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/checkout" className="hover:underline">Checkout</Link>
            <Link to="/confirmacion" className="hover:underline">Confirmación</Link>
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 text-xs text-gray-400 text-center">
            Desarrollado para <strong>Proyecto de Grado – Ingeniería de Sistemas</strong> · 2025
        </div>
      </footer>

    </div>
  );
}
