import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function RedefinirSenha({ setModelRedefinir }) {
    const [resetEmail, setResetEmail] = useState("");
    const [resetError, setResetError] = useState("");

    async function handleResetPassword() {
        if(!resetEmail.trim() === "") {
            setResetError("Digite seu email!");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            alert("Email enviado! Verifique sua caixa de entrada.");
            await setModelRedefinir(false);
        }catch (err) {
            if (err.code === "auth/user-not-found") {
                setResetError("Este email não está cadastrado.");
            } else {
                setResetError("Erro ao enviar email.");
            }
        }
    }

    return (
        <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] cursor-pointer" onClick={()=>setModelRedefinir(false)}>
            <div className="bg-card border border-border rounded-2xl p-8 shadow-xl cursor-default" onClick={(e)=>e.stopPropagation()}>
                <h2 className="text-lg text-foreground font-bold">Recuperar senha</h2>

                <input 
                    type="email"
                    placeholder="Digite seu email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="rounded-md px-3 py-2 w-full mt-3 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {resetError && (
                    <p className="text-red-500 text-sm mt-2">{resetError}</p>
                )}

                <button 
                    onClick={handleResetPassword}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-full mt-4 cursor-pointer"
                >
                    Enviar email de recuperação
                </button>
            </div>
        </div>
    )
}