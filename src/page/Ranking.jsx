import { useState, useEffect, useRef } from "react";

import Header from "../components/Home/Header";
import DetalhesRanking from "../components/Model/DetalhesRanking";

import Ouro from "../assets/ouro.webp";
import Prata from "../assets/prata.webp";
import Bronze from "../assets/bronze.webp";
import Trofeu from "../assets/trofeu.png";

import { useNavigate } from "react-router-dom";
import { Trophy, MoveRight, Undo2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Helmet } from "react-helmet-async";

export default function Ranking() {
    const navigate = useNavigate();
    const {user, userData} = useAuth();
    const [pointsGeral, setPointsGeral] = useState(null); // Os pontos geral do user individual 
    const [ranking, setRanking] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const boxRef = useRef();
    const containerRef = useRef();

    // Somar os Pontos dos quizzes
    useEffect(()=>{
        if(!userData?.pointsQuizzes) return;

        const total = Object.values(userData.pointsQuizzes)
        .reduce((total, value) => total + value, 0);

        setPointsGeral(total);
        
        
        if (userData.pointsGeral === total) {
            return;
        };

        const savePointsGeral = async () => {
            try {
                await updateDoc(doc(db, "users", user.uid), {
                    pointsGeral: total,
                    pointsUpdatedAt: serverTimestamp()
                })
            }catch (error) {
                console.error("Erro ao salvar pointsGeral:", error);
            }
        }

        savePointsGeral();
    }, [user, userData?.pointsQuizzes]);

    // Chama o getUserRank e coloca no estado setUserRank
    useEffect(()=>{
        if(pointsGeral === null) return;

        let isMounted = true;

        const fetchRank = async () => {
            const rank = await getUserRank(pointsGeral);
            if (isMounted) {
                setUserRank(rank);
            }
        }

        fetchRank();
        
        return () => {
            isMounted = false;
        };
    }, [pointsGeral]);

    // Coloca o rank do usuario
    async function getUserRank(pointsGeral) {
        if(pointsGeral === null) return;

        const q =  query(
            collection(db, "users"),
            where("pointsGeral", ">", pointsGeral)
        );

        const snapshot = await getDocs(q);

        const rank = snapshot.size + 1;

        return rank;
    }

    useEffect(()=>{
        const q = query(
            collection(db, "users"),
            orderBy("pointsGeral", "desc"),
            limit(10)
        );      
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setRanking(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            );
        });

            
        return () => {
            unsubscribe();
        }

    }, []);


    // Funçao para voltar aba
    function handleBack() {
        if(window.history.length > 2) {
        navigate(-1);
        } else {
        navigate("/");
        }
    }

    // Clicar fora do model fecha ele
    useEffect(() => {
        function handleClickOutside(e) {
          // Se clicar fora do nav E fora da imagem, fecha
          if (
            boxRef.current &&
            !boxRef.current.contains(e.target) &&
            containerRef.current &&
            !containerRef.current.contains(e.target)
          ) {
            setIsOpen(false);
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

    

    return (
        <>
            <Helmet>
                <title>Ranking | Quiz Clash Royale</title>
                <meta
                name="description"
                content="Veja o ranking do Quiz Clash Royale, acompanhe os melhores jogadores e dispute as primeiras posições."
                />
            </Helmet>
            <Header />

            <div className="w-full min-h-[calc(100vh-100px)] flex xs:flex-row flex-col gap-5 py-10 xs:pt-20 px-[2%] bg-background relative">
                {/* Volta uma aba */}
                <button onClick={handleBack}>
                    <Undo2 className="absolute top-3 left-4 cursor-pointer text-white hover:text-gold duration-300"/>
                </button>

                
                <div className="w-full xs:w-1/2">
                    <div className="w-full flex flex-col border bg-muted text-white p-5 rounded-sm">
                        <div className="flex justify-between mb-10">
                            <h2 className="text-2xl">Regras do Jogo</h2>
                            <button 
                                ref={containerRef}
                                className="cursor-pointer flex items-center gap-2 hover:text-accent transition-colors duration-300"
                                onClick={() => setIsOpen(true)}
                            >
                                Detalhes 
                                <MoveRight />
                            </button>
                        </div>

                        <div className="text-gray-400">
                            <p>Requisitos para pontuar</p>
                            <p>É obrigatório estar logado para participar do ranking.</p>
                            <p>Usuários não logados podem jogar, mas não pontuam.</p>
                            <p>Cada conta possui um ranking único (não é por dispositivo)...</p>

                        </div>
                    </div>
                    {user && (
                        <div className="w-full flex justify-between text-white gap-5 mt-5">
                            <div className="w-1/2 bg-muted border flex flex-col justify-center items-center gap-1 p-2.5 rounded-sm">
                                <span>Total de pontos</span>
                                <span className="text-gray-400 flex">
                                    <img src={Trofeu} alt="" className="w-7" />
                                    {pointsGeral}
                                </span>
                            </div>
                            <div className="w-1/2 bg-muted border flex flex-col justify-center items-center gap-1 p-2.5 rounded-sm">
                                <span>  Seu lugar no ranking</span>
                                <span className="text-gray-400 flex gap-1"> <Trophy className="text-accent" /> {userRank}</span>
                            </div>
                        </div>
                    )}
                    
                </div>

                <div className="w-full xs:w-1/2 h-fit bg-muted border text-white p-5 rounded-sm">
                    <header className="w-full h-10 flex justify-between items-center">
                        <h1>Ranking</h1>
                        <p>Atualizado há 21 horas</p>
                    </header>

                    <ul className="mt-5">
                        {ranking.map((user, index) => (
                            <li key={user.id} className="w-full flex justify-between items-center gap-2 xr:gap-5">
                                {index === 0 && <img src={Ouro} alt="Ouro" className="w-6 h-6" />}
                                {index === 1 && <img src={Prata} alt="Prata" className="w-6 h-6" />}
                                {index === 2 && <img src={Bronze} alt="Bronze" className="w-6 h-6" />}
                                {index >= 3 && <span>{index + 1}º</span>}
                                <span className="flex-5 xr:flex-8 text-[20px] xr:text-2xl">{user.username}</span>

                                <span className="flex-2 flex items-center justify-end">
                                    {user.pointsGeral}
                                    <img src={Trofeu} alt="Trofeu de pontos" className="w-7" />
                                </span>
                            </li>
                        ))}
                        
                    </ul>
                </div>

                {isOpen && (
                    <DetalhesRanking setIsOpen={setIsOpen} boxRef={boxRef} />
                )}
            </div>
        </>
    )
}