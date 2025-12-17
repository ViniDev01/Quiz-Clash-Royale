
import React, { useState, useEffect } from "react";
import { Crown, Zap, Trophy, RefreshCw, RefreshCcw, Undo2 } from "lucide-react";

import Header from "../components/X1/header";
import Title from "../components/X1/title";


// Firebase imports
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";


function X1() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, userData } = useAuth();
  const [quizStarted, setQuizStarted] = useState('start'); // 'start', 'quiz', 'result'
  const [currentQuestion ,setCurrentQuestion] = useState([]); // Pergunta atual
  const [indexAtual, setIndexAtual] = useState(0); // Índice da pergunta atual
  const [showFeedback, setShowFeedback] = useState(false); // Mostrar feedback de resposta
  const [selectedOption, setSelectedOption] = useState(null); // Opção selecionada pelo usuário
  const [score, setScore] = useState(0); // Pontuação do usuário
  const [points, setPoints] = useState(1);

  const startQuiz = () => {
    setQuizStarted('quiz');
    setIndexAtual(0);
    setScore(0);
    setPoints(1);
  }

  const resetQuiz = () => {
    setQuizStarted('start');
    setScore(0);
    setPoints(1);
  }

  // Buscar pergunta atual do quiz
  useEffect(() => {
    const fetchQuestion = async () => {
      const colRef = await getDocs (collection(db, "vs", id, "questions"));
      const snapshot = colRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setCurrentQuestion(snapshot);
      
    };
    fetchQuestion();
  }, []);

  const perguntaAtual = currentQuestion?.[indexAtual];

  const handleAnswerClick = (i) => {
    if(showFeedback)return;
    setShowFeedback(true);
    setSelectedOption(i);

    if(i === perguntaAtual.respostaCerta){
      setScore(score + 1);

      if(!user) {
        setPoints(prev => prev + 1);
      }
    }

    const nextIndex = indexAtual + 1;

    setTimeout(() => {

      if(nextIndex < currentQuestion.length){
        setIndexAtual(nextIndex);
        setShowFeedback(false);
        setSelectedOption(null);
      } else {
        verificarPoints();
        setQuizStarted('result');
      }
    }, 1000);
  }


  // Verificar se o user ja tenha feito esse quiz

  function verificarPoints() {
    if(!user || !userData) return;

    const pointsAtuais = userData.pointsGeral?.[id] || 0;

    if (points > pointsAtuais) {
      const userRef = doc(db, "users", user.uid);

      updateDoc(userRef, {
        [`pointsGeral.${id}`]: points
      });
    }
  }

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

  const percentage = (score / currentQuestion.length) * 100;
  const newIndexAtual = indexAtual + 1;
  const barraPercentage = (newIndexAtual / currentQuestion.length) * 100;
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

  const img1 = perguntaAtual?.options?.[0];
  const img2 = perguntaAtual?.options?.[1];

  function handleBack() {
    if(window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center items-center px-[4%]">
      <Helmet>
        <title>X1 | Quiz Clash Royale</title>
        <meta
          name="description"
          content="Desafie outros jogadores no modo X1 do Quiz Clash Royale e prove seus conhecimentos em duelos diretos."
        />
      </Helmet>
        <button onClick={handleBack}>
          <Undo2 className="absolute top-3 left-4 cursor-pointer hover:text-gold duration-300"/>
        </button>
        <RefreshCcw 
          className="absolute top-3 left-16 cursor-pointer hover:text-gold duration-300"
          onClick={resetQuiz}
        />
        <div className="max-w-3xl w-full p-4 xr:p-8 md:p-12 text-center flex flex-col justify-center items-center backdrop-blur bg-card/95 border-2 border-primary/30 shadow-2xl rounded-2xl">
          {quizStarted === "start" && ( 
            <>
              <Crown className="w-20 h-20 mx-auto text-gold mb-4 animate-pulse"/>
              <h1 className="text-3xl so:text-5xl md:text-7xl font-bold mb-4 bg-gold bg-clip-text text-transparent">Quiz Clash Royale</h1>
              <p className="mb-8 so:text-xl text-muted-foreground">Mostre quem vence nos confrontos 1v1!</p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-center gap-4 text-foreground/80">
                  <Zap className="w-6 h-6 text-gold" />
                  <span className="so:text-lg">{currentQuestion.length} {currentQuestion.length > 1 ? "perguntas desafiadoras" : "pergunta desafiadora" }</span>
                </div>

                <div className="flex items-center justify-center gap-4 text-foreground/80">
                  <Trophy className="min-w-6 h-6 text-gold" />
                  <span className="so:text-lg">Prove que você entende tudo sobre duelos de cartas!</span>
                </div>
              </div>

              <button 
              className="bg-gold text-background font-bold text-xl px-6 py-3 so:px-12 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-gold/50 rounded-2xl cursor-pointer"
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
                      {score}/{currentQuestion.length}
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
              <Header indexAtual={indexAtual} quiz={currentQuestion} score={score} />
              <progress value={barraPercentage} max={100} className="w-full h-3 rounded-full mb-6"/>
              <Title title={perguntaAtual.title} />
              
              <div 
                  className="flex justify-between items-center mb-8 w-full"
              >
                  <img 
                    src={img1} 
                    alt="" 
                    className={`${getAnswerClass(0)} rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 w-[43.034%] xr:w-[45.99%] xs:w-[283px] xs:h-[249px]`}
                    onClick={()=>handleAnswerClick(0)}
                  />
                  <h1 className="text-2xl select-none">X</h1>
                  <img 
                    src={img2} 
                    alt="" 
                    className={`${getAnswerClass(1)} rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 w-[43.034%] xr:w-[45.99%] xs:w-[283px] xs:h-[249px]`}
                    onClick={()=>handleAnswerClick(1)}
                  />
                </div>                
              
            </>
          )}
            

        </div>
    </div>
  );
}

export default X1;