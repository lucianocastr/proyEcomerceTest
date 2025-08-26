import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import Confirmacion from "./pages/Confirmacion";

function App() {
  return (
    <Router>
      <nav style={{ padding: 12 }}>
        <Link to="/login">Login</Link> {" | "}
        <Link to="/catalogo">Catalogo</Link> {" | "}
        <Link to="/carrito">Carrito</Link> {" | "}
        <Link to="/checkout">Checkout</Link> {" | "}
        <Link to="/confirmacion">Confirmacion</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
      </Routes>
    </Router>
  );
}

export default App;
