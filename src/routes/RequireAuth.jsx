import { isLoggedIn } from "../lib/session";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const loc = useLocation();
  if (!isLoggedIn()) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}
