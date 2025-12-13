import { X } from "lucide-react";


export default function ModelContato({ setOpen }) {
    return  (
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full flex justify-center items-center">
            <div className="max-w-[500px] bg-card border border-border rounded-2xl p-8 shadow-xl relative">
                <X className="absolute top-2 right-2 cursor-pointer hover:text-accent" onClick={() => setOpen(false)} />
                <p className="max-w-[500px] my-5 text-[19px]">Olá! No momento, este formulário não está funcionando. Mas, se você quiser, pode entrar em contato diretamente com o criador do site.</p>
                <a href="https://portfolio-vini-dev01.vercel.app/contato" target="blank" className="cursor-pointer text-primary text-[19px]">Clica aqui</a>
            </div>
        </div>
    )
}