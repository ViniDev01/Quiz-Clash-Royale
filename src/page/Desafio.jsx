import React,{ useState, useEffect } from "react";

import { Crown, Zap, Trophy, RefreshCw, RefreshCcw, Undo2 } from "lucide-react";
 
import Header from "../components/Desafio/ui/header";
import Title from "../components/Desafio/ui/title";
import Respostas from "../components/Desafio/ui/respostas";
import { useNavigate } from "react-router-dom";

// Firebase imports
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";

import { useParams } from "react-router-dom";

function Desafio() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, userData } = useAuth();
  const [quiz, setQuiz] = useState([]);
  const [quizStarted, setQuizStarted] = useState('start'); // 'start', 'quiz', 'result'
  const [indexAtual, setIndexAtual] = useState(0); // Índice da pergunta atual
  const [showFeedback, setShowFeedback] = useState(false); // Mostrar feedback de resposta
  const [selectedOption, setSelectedOption] = useState(null); // Opção selecionada pelo usuário
  const [score, setScore] = useState(0); // Pontuação de acertos
  const [points, setPoints] = useState(2); // Pontuação para o ranking

  // Função para iniciar o quiz
  const startQuiz = () => {
    setQuizStarted('quiz');
    setIndexAtual(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setPoints(2);
  }

  const resetQuiz = () => {
    setQuizStarted('start');
    setIndexAtual(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setPoints(2);
  }

  // Banco de perguntas do quiz
  useEffect(()=>{
    const fetchAllQuizzes = async () => {
      try {
        // Buscar quizzes aleatórios
        const aleaSnapshop = await getDocs(collection(db, "geral", id, "questions"));
        const aleaData = aleaSnapshop.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
        }));

        setQuiz(aleaData);

      }catch (error) {
        console.error("Error fetching quizzes: ", error);
      }
    }

    fetchAllQuizzes();
  }, []);

  // Pergunta atual baseada no índice
  const perguntaAtual = quiz[indexAtual];

  // Função para lidar com a seleção de resposta
  const handleAnswerClick = (optionIndex) => {
    if (showFeedback) return; // Impede múltiplos cliques
    setShowFeedback(true);
    setSelectedOption(optionIndex);

    // Verifica se a resposta está correta
    if (optionIndex === perguntaAtual.respostaCerta) {
      setScore(prev => prev + 1);

      if(user) {
        setPoints(prev => prev + 2);
      }
    }
    const nextIndex = indexAtual + 1;

    setTimeout(() => {
      if (nextIndex < quiz.length) {
        setIndexAtual(nextIndex);
        setShowFeedback(false);
        setSelectedOption(null);
      } else {
        // Quiz finalizado
        verificarPoints();
        setQuizStarted('result');    
      }
    }, 1500);
  }

  // Verificar se o user ja tenha feito esse quiz
  function verificarPoints() {
    if(!user || !userData) return;

    const pontosAtuais = userData.pointsQuizzes?.[id] || 0;

    if (points > pontosAtuais) {
      const userRef = doc(db, "users", user.uid);

      updateDoc(userRef, {
        [`pointsQuizzes.${id}`]: points
      });
    }

  };

  // Função para obter a classe CSS da resposta com base no estado
  const getAnswerClass = (optionIndex) => {

    if(!showFeedback) {
      return "bg-card hover:bg-card/80 border-2 border-border hover:border-primary transition-all duration-300 hover:scale-105";
    }

    if(optionIndex === perguntaAtual.respostaCerta) {
      return"bg-correct border-2 border-correct scale-105";
    }

    if(optionIndex === selectedOption) {
      return "bg-incorrect border-2 border-incorrect scale-95";
    }

    return "bg-card border-2 border-border opacity-50";
  }

  const percentage = (score / quiz.length) * 100;
  const newIndexAtual = indexAtual + 1;
  const barraPercentage = (newIndexAtual / quiz.length) * 100;
  let message = "";
  let emoji = "";

  if (percentage === 100) {
    message = "Perfeito! Você é um mestre do Clash Royale!";
    emoji = "👑";
  } else if (percentage >= 70) {
    message = "Muito bem! Você manja bastante!";
    emoji = "🏆";
  } else if (percentage >= 50) {
    message = "Bom trabalho! Continue praticando!";
    emoji = "⚔️";
  } else {
    message = "Você pode melhorar! Jogue mais e tente novamente!";
    emoji = "💪";
  }

  function handleBack() {
    if(window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center items-center">
        <button onClick={handleBack}>
          <Undo2 className="absolute top-3 left-4 cursor-pointer hover:text-gold duration-300"/>
        </button>
        <RefreshCcw 
          className="absolute top-3 left-16 cursor-pointer hover:text-gold duration-300"
          onClick={resetQuiz}
        />
        <div className="max-w-2xl w-full p-8 md:p-12 text-center flex flex-col justify-center items-center backdrop-blur bg-card/95 border-2 border-primary/30 shadow-2xl rounded-2xl">
          {quizStarted === "start" && (
              <>
                <Crown className="w-20 h-20 mx-auto text-gold mb-4 animate-pulse"/>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gold bg-clip-text text-transparent">Quiz Clash Royale</h1>
                <p className="mb-8 text-xl text-muted-foreground">Teste seus conhecimentos sobre o jogo!</p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center justify-center gap-4 text-foreground/80">
                    <Zap className="w-6 h-6 text-gold" />
                    <span className="text-lg">{quiz.length} {quiz.length > 1 ? "perguntas desafiadoras" : "pergunta desafiadora"}</span>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-foreground/80">
                    <Trophy className="w-6 h-6 text-gold" />
                    <span className="text-lg">Descubra seu nível de conhecimento</span>
                  </div>
                </div>

                <button 
                className="bg-gold text-background font-bold text-xl px-12 py-3 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-gold/50 rounded-2xl cursor-pointer"
                onClick={startQuiz}
                >
                  Iniciar Quiz
                </button>
              </>
          )}

          {quizStarted === "result" && (
            <>
                
                  <div className="mb-4">
                    <div className="text-7xl mb-6 animate-bounce">{emoji}</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gold bg-clip-text text-transparent">
                      Quiz Finalizado!
                    </h2>
                    <p className="text-2xl text-foreground mb-8">{message}</p>
                  </div>

                  <div className="w-full bg-royal-blue rounded-xl p-8 mb-8 border-2 border-gold/30">
                    <div className="text-6xl font-bold text-gold mb-2">
                      {score}/{quiz.length}
                    </div>
                    <div className="text-xl text-foreground/80">
                      {percentage.toFixed(0)}% de acertos
                    </div>
                  </div>

                  <button
                    onClick={startQuiz}
                    size="lg"
                    className="bg-gold text-background rounded-2xl flex items-center font-bold text-xl px-12 py-3 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-gold/50 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" /> 
                    Jogar Novamente
                  </button>
            </>
          )}

          {quizStarted === "quiz" && (
            <>
              <Header indexAtual={indexAtual} quiz={quiz} score={score} />
              <progress value={barraPercentage} max={100} className="w-full h-3 rounded-full mb-6"/>
              <Title question={perguntaAtual.title} />
              <Respostas options={perguntaAtual.options} handleAnswerClick={handleAnswerClick} getAnswerClass={getAnswerClass} />
            </>
          )}
            

        </div>
    </div>
  );
}

export default Desafio;