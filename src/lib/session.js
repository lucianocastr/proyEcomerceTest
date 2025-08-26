export function getSessionUser() {
  try { return JSON.parse(localStorage.getItem("sessionUser")); } catch { return null; }
}
export function isLoggedIn() { return !!getSessionUser(); }
export function logout() { localStorage.removeItem("sessionUser"); }
