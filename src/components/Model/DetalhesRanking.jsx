
import { X } from "lucide-react";


export default function DetalhesRanking({ setIsOpen, boxRef }) {
    
    return (
        <div 
            ref={boxRef}
            className="absolute top-10 left-1/2 -translate-x-1/2 w-[60%] h-[80%] overflow-auto text-foreground bg-card p-5">
            
            <h2 className="text-2xl flex justify-between items-center font-bold">Sistema de Ranking – Detalhes <X className="cursor-pointer" onClick={() => setIsOpen(false)}/></h2>
            
            
            <h4 className="mt-8 text-xl font-semibold">Requisitos para pontuar</h4>
            <ul className="mt-3">
                <li className="text-sm mt-1">É obrigatório estar logado para participar do ranking.</li>
                <li className="text-sm mt-1">Usuários não logados podem jogar, mas não pontuam.</li>
                <li className="text-sm mt-1">Cada conta possui um ranking único (não é por dispositivo).</li>
            </ul>

            <hr className="mt-8" />

            <h2 className="mt-8 text-2xl font-bold">Modos de jogo e pontuação</h2>
            <h4 className="mt-4 text-xl font-semibold">Modo X1</h4>
            <ul className="mt-3">
                <li className="text-sm mt-1">Cada vitória no modo X1 vale +1 ponto.</li>
                <li className="text-sm mt-1">Derrota não soma pontos.</li>
                <li className="text-sm mt-1">Ideal para partidas rápidas e competitivas.</li>
            </ul>
            <h4 className="mt-4 text-xl font-semibold">Modo Conhecimento</h4>
            <ul className="mt-3">
                <li className="text-sm mt-1">Cada vitória no Modo Geral vale +2 pontos.</li>
                <li className="text-sm mt-1">Modo focado em progressão no ranking.</li>
                <li className="text-sm mt-1">Pode envolver mais perguntas ou dificuldade maior.</li>
            </ul>

            <hr className="mt-8" />

            <h2 className="mt-8 text-2xl font-bold">Tempo de resposta</h2>
            <ul className="mt-3">
                <li className="text-sm mt-1"><strong>Nenhum modo possui tempo limite</strong> para escolher a resposta.</li>
                <li className="text-sm mt-1">O foco do ranking é conhecimento, não velocidade.</li>
                <li className="text-sm mt-1">O usuário pode responder com calma, sem penalidades por demora.</li>
            </ul>

            <hr className="mt-8" />

            <h2 className="mt-8 text-2xl font-bold">Cálculo do Ranking</h2>
            <ul className="mt-3">
                <li className="text-sm mt-1">A posição no ranking é baseada em:</li>
                <ol>
                    <li className="text-sm mt-1">Total de pontos</li>
                    <li className="text-sm mt-1">Em caso de empate:</li>
                    <dd>Maior número de vitórias</dd>
                    <dd>Data da última vitória (quem pontuou mais recentemente fica acima)</dd>
                </ol>
            </ul>

            <hr className="mt-8" />

            <h2 className="mt-8 text-2xl font-bold">Perfil no Ranking</h2>
            <h4 className="mt-4 text-xl font-semibold">Cada jogador possui:</h4>
            <ul className="mt-3">
                <li className="text-sm mt-1">Nome / Nickname</li>
                <li className="text-sm mt-1">Foto de perfil (se exist ir)</li>
                <li className="text-sm mt-1">Pontuação total</li>
                <li className="text-sm mt-1">Vitórias no X1</li>
                <li className="text-sm mt-1">Vitórias no Modo Geral</li>
                <li className="text-sm mt-1">Posição atual no ranking</li>
            </ul>

            <hr className="mt-8" />

            <h2 className="mt-8 text-2xl">Observação importante</h2>
            <p className="text-sm mt-4">O ranking reflete apenas partidas finalizadas com sucesso. Abandonar a partida não gera pontos.</p>
        </div>
    )
}