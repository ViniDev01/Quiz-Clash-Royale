
import React, {useEffect, useState} from 'react';
import BannerImg from '../../assets/Banner.png';
import banner1280 from "../../assets/Banner1280.png";
import { Link } from 'react-router-dom';

import {db} from "../../firebase/firebaseConfig";
import { onSnapshot, collection } from 'firebase/firestore';

function Banner() {

  const [quizzesVS, setQuizzesVS] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false); 

  useEffect(()=>{
    async function idVsAll() {
      const VsRef = onSnapshot(collection(db, "vs"), (snapshot) => {
        const vsData = snapshot.docs.map(doc => ({
          id: doc.id
        }))

        setQuizzesVS(vsData);
      });
    }

    idVsAll();
  }, []);


  useEffect(()=>{
    if(quizzesVS.length === 0) return;
    const interval = setInterval(() => {
      

      setIndexAtual(prev => {
        if(prev < quizzesVS.length) {
          return  prev + 1;
        }else {
          return 0
        }
      })
    }, 100000);

    return () => {clearInterval(interval)}

  }, [quizzesVS]);

  const nextId = quizzesVS[indexAtual]?.id;


  return (
    <section className='w-full section-banner relative'>
      {!imgLoaded && (
        <div className="w-full h-[530px] flex items-center justify-center bg-primaria border-b border-foreground absolute top-0 left-0 z-20">
          <div className="text-white text-2xl font-bold animate-pulse">
            Carregando...
          </div>
        </div>
      )}

      <picture>
        <source media="(max-width: 1280px)" srcSet={banner1280} />
        <source media='(min-width: 1280px)' srcSet={BannerImg} />
        <img 
          src={banner1280} 
          alt="Banner Clash Royale" 
          className='w-full h-auto object-cover relative' 
          draggable={false}
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity .3s" }}
        /> 
      </picture>
      
      <Link 
        to={`/quiz/mode/x1/${nextId}`} 
        className='btn-banner absolute bottom-[25%] left-[50%] transform -translate-x-1/2 px-12 py-2 bg-terciaria text-white cursor-pointer rounded-2xl text-[20px] font-semibold transition-all duration-500 hover:scale-110'
      >
        Iniciar
      </Link>
    </section>
  )
}

export default Banner