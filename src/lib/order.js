// src/lib/order.js
import { readCart, clearCart } from "./cart";

const ORDER_KEY = "lastOrder";

/** Crea y persiste la última orden + timestamp */
export function createOrder({ nombre, email, dni }) {
  const items = readCart();
  if (!items.length) throw new Error("El carrito está vacío");

  const total = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);

  const order = {
    id: Date.now().toString(), // mock simple
    nombre,
    email,
    dni,
    items,
    total,
    createdAt: new Date().toISOString(), // 👈 timestamp para validar “frescura”
  };

  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  clearCart(); // vaciar carrito al comprar
  return order;
}

export function readLastOrder() {
  try {
    return JSON.parse(localStorage.getItem(ORDER_KEY));
  } catch {
    return null;
  }
}

/** Borra la última orden (útil al salir de confirmación) */
export function clearLastOrder() {
  localStorage.removeItem(ORDER_KEY);
}

/** ¿Existe una orden y es reciente? (por defecto, 10 minutos) */
export function hasFreshOrder(maxMinutes = 10) {
  const o = readLastOrder();
  if (!o || !o.createdAt) return false;
  const ageMs = Date.now() - new Date(o.createdAt).getTime();
  return ageMs <= maxMinutes * 60 * 1000;
}
