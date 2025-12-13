import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  // ❌ Se já estiver logado → manda para a Home
  if (user) return <Navigate to="/" replace />;

  // ✔️ Se não estiver logado → permite acessar
  return children;
}
