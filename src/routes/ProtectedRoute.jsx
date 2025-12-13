import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  // ❌ Se não estiver logado → manda para Login
  if (!user) return <Navigate to="/login" replace />;

  // ✔️ Se estiver logado → permite acessar
  return children;
}
