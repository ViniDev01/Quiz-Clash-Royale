

export default function ExcluirConta({ setSenha, handleDeletar, setOpen }) {
    return (
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] w-full h-full flex justify-center items-center cursor-pointer" onClick={()=>setOpen(false)}>
            <div className="flex flex-col justify-center items-center bg-card border border-border rounded-2xl p-8 shadow-xl space-y-6 cursor-default" onClick={(e)=> e.stopPropagation()}>
                <h1 className="block text-center text-3xl max-w-[500px] mb-10 font-medium text-foreground">Confirme seus dados para excluir a conta</h1>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Digite seu email..." 
                    className="w-full px-4 py-3 rounded-xl bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Digite sua senha..." 
                    onChange={(e) => setSenha(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button 
                    onClick={()=>handleDeletar()}
                    className="w-full py-3 mt-4 rounded-xl text-lg font-semibold bg-primaria text-primary-foreground hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                    Excluir conta
                </button>
            </div>
        </div>
    )
}