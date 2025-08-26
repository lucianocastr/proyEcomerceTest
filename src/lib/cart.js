const KEY = "cartItems";

export function readCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function writeCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(item) {
  const current = readCart();
  const existing = current.find((i) => i.id === item.id);
  if (existing) {
    existing.cantidad += 1;
  } else {
    current.push({ ...item, cantidad: 1 });
  }
  writeCart(current);
  return current;
}

export function clearCart() {
  writeCart([]);
}
