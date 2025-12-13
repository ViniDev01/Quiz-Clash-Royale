import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      
      <AlertTriangle className="w-24 h-24 text-terciaria mb-6 animate-bounce" />

      <h1 className="text-6xl font-bold mb-4 text-primaria">
        404
      </h1>

      <p className="text-xl text-gray-300 mb-8 text-center max-w-md">
        Ops! A página que você está procurando não foi encontrada.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-primaria text-white hover:bg-secundaria transition-all"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
