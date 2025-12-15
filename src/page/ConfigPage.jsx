import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { excluirConta } from "../services/ExcluirConta";
import ExcluirConta from "../components/Model/ExcluirConta";

export default function ConfigPage() {
  const [selected, setSelected] = useState("perfil");
  const navigate = useNavigate();
  const { id } = useParams();
  const [senha, setSenha] = useState("");
  const [open, setOpen] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(true);

  const menu = [
    { id: "perfil", label: "Perfil" },
    { id: "creditos", label: "Área de Créditos das Imagens" },
    { id: "privacidade", label: "Política de Privacidade" },
    { id: "termos", label: "Termos de Uso" },
    { id: "excluir", label: "Excluir Perfil Permanentemente" },
    { id: "ranking", label: "Ranking" },
    { id: "modos", label: "Modos dos Quizzes" },
    { id: "voltar", label: "Voltar Home"},
  ];

  const conteudos = {
    perfil: (
        <p>
            Informações do usuário, avatar e opções básicas.
        </p>
    ),
    creditos: (
        <p className="text-lg leading-relaxed text-card-foreground">
            As imagens usadas no app são de fontes livres ou autorizadas. Caso alguma seja sua,
            você pode solicitar crédito ou remoção.
        </p>
    ),
    privacidade: (
        <p className="text-lg leading-relaxed text-card-foreground">
            Coletamos apenas dados essenciais como login, progresso e configurações. Nenhum dado
            é vendido ou compartilhado com terceiros.
        </p>
    ),
    termos: (
        <p className="text-lg leading-relaxed text-card-foreground">
            Ao utilizar o app, você concorda em não divulgar respostas dos quizzes e seguir as regras
            da comunidade.
        </p>
    ),
    excluir: (
        <>
            <p>Ao excluir sua conta, todos os dados serão apagados: progresso, ranking e favoritos. Essa ação é irreversível.</p>
            <button className="text-primary cursor-pointer hover:underline" onClick={()=>setOpen(true)} >Clica aqui</button>
        </>
    ),
    ranking: (
        <p className="text-lg leading-relaxed text-card-foreground">
            O ranking soma seus pontos baseados em quantidade de acertos e velocidade nas respostas.
            Os jogadores com maior pontuação ficam no topo.
        </p>
    ),
    modos: (
        <div className="mt-3 space-y-2">
            <p><strong>Clássico:</strong> Sem limite de tempo.</p>
            <p><strong>Contra o Tempo:</strong> Responda em poucos segundos.</p>
            <p><strong>1v1:</strong> Confronto direto entre cartas.</p>
            <p><strong>Aleatório:</strong> Perguntas misturadas.</p>
        </div>
    ),
  };

  function voltarHome(id) {
    if(id !== "voltar") return;

    navigate("/");
  }
  
  useEffect(()=>{
    if(id) setSelected(id);

  }, [id]);

  async function handleDeletar() {
    const result = await excluirConta(senha);

    if(result.ok) {
        alert("Conta excluída com sucesso!");
        window.location.href = "/";
    } else {
        alert("Erro: " + result.error.message)
    }
  }

  return (
    <div className="flex w-full min-h-screen bg-background text-foreground font-poppins flex-col lg:flex-row">

      {/* === BOTÃO MOBILE === */}
      <div className="flex lg:hidden w-full justify-between items-center px-4 pt-4">
        <h1 className="text-xl font-semibold text-gold">Configurações</h1>

        <button
          onClick={() => setMenuMobileOpen(!menuMobileOpen)}
          className="text-2xl px-3 py-1 rounded-md bg-card border border-border"
        >
          ☰
        </button>
      </div>

      {/* === MENU LATERAL === */}
      <aside className={`
      bg-card border-border rounded-xl
        p-4 my-4 mx-4
        border
        transition-all duration-300
        
        lg:w-76 lg:border-r lg:static lg:block
        ${menuMobileOpen ? "block" : "hidden lg:block"}
      `}>
        <h2 className="text-2xl font-bold mb-6 text-gold hidden lg:block">
          Configurações
        </h2>

        <nav className="
          flex lg:flex-col
          gap-2
          overflow-x-auto
          pb-2
        ">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => {navigate(`/configuracao/${item.id}`); voltarHome(item.id)}}
              className={`
                w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap
                ${
                  selected === item.id
                    ? "bg-royal-blue text-white"
                    : "bg-muted hover:bg-input text-muted-foreground"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* === ÁREA DE CONTEÚDO === */}
      <main className="flex-1 p-8 bg-card m-4 rounded-xl border border-border shadow-lg">
        <h1 className="text-3xl font-semibold mb-4 text-gold">
          {menu.find((m) => m.id === selected)?.label}
        </h1>
          {conteudos[selected]}
      </main>

      {open && (<ExcluirConta setSenha={setSenha} handleDeletar={handleDeletar} setOpen={setOpen} />)}
    </div>
  );
}
