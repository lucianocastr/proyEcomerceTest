import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold">
            Proyecto de Grado • Mini Ticketera
          </h1>

          <nav className="text-sm sm:text-base space-x-4">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/catalogo" className="hover:underline">Catálogo</Link>
            <Link to="/carrito" className="hover:underline">Carrito</Link>
            <Link to="/checkout" className="hover:underline">Checkout</Link>
            <Link to="/confirmacion" className="hover:underline">Confirmación</Link>
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 text-xs text-gray-400">
          Proyecto de Grado – Ingeniería de Sistemas · Demo E2E + CI/CD
        </div>
      </footer>
    </div>
  );
}
