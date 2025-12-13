
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { collection, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom'

function Main() {

  const [quizzesVS, setQuizzesVS] = useState([]);
  const [quizzesGeral, setQuizzesGeral] = useState([]);
  const [quizzesMisturados, setQuizzesMisturados] = useState([]);

  useEffect(() => {
    // ✅ 1. CARREGA DO CACHE PRIMEIRO (APARECE NA HORA NO F5)
    const cacheVS = localStorage.getItem("quizzesVS");
    const cacheGeral = localStorage.getItem("quizzesGeral");

    if (cacheVS) setQuizzesVS(JSON.parse(cacheVS));
    if (cacheGeral) setQuizzesGeral(JSON.parse(cacheGeral));

    try {
      // ✅ 2. VS EM TEMPO REAL + SALVA NO CACHE
      const unsubVS = onSnapshot(collection(db, "vs"), (snapshot) => {
        const vsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          mode: "x1",
        }));

        setQuizzesVS(vsData);
        localStorage.setItem("quizzesVS", JSON.stringify(vsData));
      });

      // ✅ 3. ALEATÓRIOS EM TEMPO REAL + SALVA NO CACHE
      const unsubGeral = onSnapshot(
        collection(db, "geral"),
        (snapshot) => {
          const aleaData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            mode: "geral",
          }));

          setQuizzesGeral(aleaData);
          localStorage.setItem("quizzesGeral", JSON.stringify(aleaData));
        }
        
      );

      return () => {
        unsubVS();
        unsubGeral();
      };
    } catch (error) {
      console.error("Erro ao buscar quizzes:", error);
    }
  }, []);

  useEffect(() => {
    if (quizzesVS.length || quizzesGeral.length) {
      const mistura = [...quizzesVS, ...quizzesGeral].sort(
        () => Math.random() - 0.5
      );

      setQuizzesMisturados(mistura);
    }
  }, [quizzesVS, quizzesGeral]);


  

  return (
    <section className='w-full pt-20 font-poppins bg-primaria pb-20'>
        <div className='max-w-7xl mx-auto px-[2%]'>
            <h1 className='font-bold mb-5 uppercase text-white text-center text-2xl xr:text-[32px] so:text-start'>QUEM CAUSA MAIS DANO </h1>
            <div className='flex items-center justify-center xs:justify-between gap-5 flex-wrap lin-box'>
              {quizzesVS.slice(0, 4).map((quiz) =>(
                  <Link 
                    to={`/quiz/mode/x1/${quiz.id}`} 
                    className='w-3/4 so:w-[calc(50%-20px)] xs:w-[calc(25%-20px)] bg-[#D9D9D9] hover:scale-105 transition-all duration-300 overflow-x-hidden cursor-pointer' 
                    title={quiz.title}
                    key={quiz.id}
                  >
                    <div className='aspect-283/249 overflow-x-hidden'>
                      <img src={quiz.img} alt={quiz.title} className='w-full h-full'/>
                    </div>
                  </Link>                
              ))}
            </div>
            <h1 className='font-bold mt-18 mb-5 uppercase text-white text-center text-2xl xr:mt-24 xr:text-[32px] so:text-start'>Quiz Geral</h1>
            <div className='flex items-center justify-center xs:justify-between gap-5 flex-wrap lin-box'>
                {quizzesMisturados.slice(0, 4).map((quiz) =>(
                  <Link 
                    to={`/quiz/mode/${quiz.mode}/${quiz.id}`} 
                    className='w-3/4 so:w-[calc(50%-20px)] xs:w-[calc(25%-20px)] bg-secundaria rounded-2xl hover:scale-105 transition-all duration-300 overflow-x-hidden cursor-pointer' 
                    key={quiz.id}
                    title={quiz.title}
                  >
                    <div className='aspect-283/249 overflow-x-hidden'>
                      <img src={quiz.img} alt={quiz.title} className='w-full h-full object-cover'/>
                    </div>
                    
                    
                    <h1 className='h-16 leading-16 pl-2 capitalize font-semibold text-white text-[1.5vw] tb:text-base cursor-pointer overflow-hidden'>{quiz.title}</h1>
                  </Link>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Main;
