import { readCart, clearCart } from "./cart";

const ORDER_KEY = "lastOrder";

export function createOrder({ nombre, email, dni }) {
  const items = readCart();
  if (!items.length) throw new Error("El carrito está vacío");

  const total = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);

  const order = {
    id: Date.now().toString(), // mock
    nombre,
    email,
    dni,
    items,
    total,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  clearCart();
  return order;
}

export function readLastOrder() {
  try {
    return JSON.parse(localStorage.getItem(ORDER_KEY));
  } catch {
    return null;
  }
}
