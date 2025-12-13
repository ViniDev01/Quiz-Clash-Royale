import { useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";
import { useState } from "react";
import ModelContato from "../components/Model/Contato";

export default function Contato() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    function handleBack() {
        if(window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/");
        }
    }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-16 font-poppins">
        <button onClick={handleBack}>
            <Undo2 className="absolute top-3 left-4 cursor-pointer hover:text-gold duration-300"/>
        </button>
        <div className="w-full max-w-3xl bg-card border border-border rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold text-center mb-6 text-primaria">Contato</h1>
            <p className="text-center text-lg mb-10 text-muted-foreground">
            Tem alguma dúvida, sugestão ou deseja falar com a equipe? Envie sua mensagem abaixo.
            </p>

            <form className="space-y-6">
                <div>
                    <label className="block mb-2 font-medium text-foreground">Nome</label>
                    <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Seu nome"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium text-foreground">Email</label>
                    <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seuemail@gmail.com"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium text-foreground">Mensagem</label>
                    <textarea
                    className="w-full px-4 py-3 h-40 rounded-xl bg-input text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Digite sua mensagem..."
                    ></textarea>
                </div>

                <button
                    type="button"
                    className="w-full py-3 mt-4 rounded-xl text-lg font-semibold bg-primaria text-primary-foreground hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    Enviar Mensagem
                </button>
            </form>
        </div>

        {open && (
            <ModelContato setOpen={setOpen} />
        )}
    </div>
  );
}
