import React, { useState, useEffect } from "react";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";

import { Link } from "react-router-dom";
import { Undo2 } from "lucide-react";


export default function Quizzes() {

    const [quizzes, setQuizzes] = useState([]);

    useEffect(()=>{
        const vsCache = localStorage.getItem("quizzesVS");
        const geralCache = localStorage.getItem("quizzesGeral");
        if(vsCache && geralCache) {
            const vs = JSON.parse(vsCache);
            const geral = JSON.parse(geralCache);

            setQuizzes([...vs, ...geral].sort(() => Math.random() - 0.5));
        }

        
    }, []);

    return (
        <>
            <Header />

            <Link to="/">
                <Undo2 className="absolute top-28 left-4 cursor-pointer hover:text-gold duration-300"/>
            </Link>

            <main className="max-w-5xl mx-auto flex justify-around items-center gap-2.5 flex-wrap my-20">
                
                {quizzes.map((quiz, index) => (
                    <Link to={`/quiz/mode/${quiz.mode}/${quiz.id}`} key={index} className="w-3/4 so:w-[calc(50%-20px)] xs:w-[calc(25%-20px)] bg-secundaria rounded-2xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer mt-5">
                        <div className='aspect-283/249 overflow-x-hidden'>
                            <img src={quiz.img} alt={quiz.title} className="w-full h-full object-cover" />
                        </div>
                        <h1 className="m-2 h-8 text-white xr:text-base xs:text-[1.5vw] tb:text-2xl overflow-hidden" title={quiz.title}>{quiz.title}</h1>
                        <p className="mt-2 ml-2.5 mb-5 text-white text-xs">Criado por: {quiz?.creator || "SVINICIOS"}</p>
                    </Link>
                ))}
                
            </main>

            <Footer />
        
        </>
    )
}