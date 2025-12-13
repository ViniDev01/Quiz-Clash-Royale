import { Trophy } from "lucide-react";

function Header({ indexAtual, quiz, score }) {
  return (
    <header className="w-full flex justify-between items-center mb-6">
      <p className="text-muted-foreground">Perguntas <span>{indexAtual + 1}</span>/ {quiz.length}</p>

      <button className="flex items-center gap-2 bg-gold text-accent-foreground px-4 py-2 rounded-full">
        <Trophy />
        <span className="font-bold">
          {score}
        </span>
      </button>
    </header>
  );
}

export default Header;