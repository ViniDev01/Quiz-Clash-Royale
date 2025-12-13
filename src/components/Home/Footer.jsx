
import React from 'react'

import { Link } from "react-router-dom";

function Footer() {

  return (
    <footer className='relative z-40 w-full text-white bg-secundaria font-poppins'>
        <div className='max-w-7xl mx-auto py-10 flex justify-around xs:justify-between items-start gap-5 flex-wrap xs:flex-nowrap px-[2%]'>
            <ul className='flex flex-col justify-center items-center xs:items-start gap-2'>
                <h4 className='font-bold text-2xl mb-2 select-none'>Links rápidos</h4>
                <li className='font-medium text-[18px]'><Link to="/" className='cursor-pointer hover:underline transition-all duration-500'>Home</Link></li>
                <li className='font-medium text-[18px]'><Link to="/quizzes" className='cursor-pointer hover:underline transition-all duration-500'>Quizzes</Link></li>
                <li className='font-medium text-[18px]'><Link to="/ranking" className='cursor-pointer hover:underline transition-all duration-500'>Ranking</Link></li>
                <li className='font-medium text-[18px]'><Link to="/contato" className='cursor-pointer hover:underline transition-all duration-500'>Contato</Link></li>
            </ul>
            <ul className='flex flex-col justify-center items-center xs:items-start gap-2'>
                <h4 className='font-bold text-2xl mb-2 select-none'>Redes sociais</h4>
                <li className='font-medium text-[18px]'><a href="#" target='blank' rel='noopener noreferrer' className='cursor-pointer hover:underline transition-all duration-500'>Instagram</a></li>
                <li className='font-medium text-[18px]'><a href="#" target='blank' rel='noopener noreferrer' className='cursor-pointer hover:underline transition-all duration-500'>Twitter</a></li>
                <li className='font-medium text-[18px]'><a href="#" target='blank' rel='noopener noreferrer' className='cursor-pointer hover:underline transition-all duration-500'>Facebook</a></li>
                <li className='font-medium text-[18px]'><a href="#" target='blank' rel='noopener noreferrer' className='cursor-pointer hover:underline transition-all duration-500'>Youtube</a></li>
            </ul>

            <ul className='flex flex-row justify-center items-center gap-10 mt-5 flex-wrap xs:flex-col xs:gap-2 xs:mt-0 xs:flex-nowrap xs:items-start'>
                <li className='font-medium text-[18px]'><Link to="/configuracao/creditos" className='cursor-pointer hover:underline transition-all duration-500'>Créditos das imagens</Link></li>
                <li className='font-medium text-[18px]'><Link to="/configuracao/privacidade" className='cursor-pointer hover:underline transition-all duration-500'>Política de privacidade</Link></li>
                <li className='font-medium text-[18px]'><Link to="/configuracao/termos" className='cursor-pointer hover:underline transition-all duration-500'>Termos de uso</Link></li>
            </ul>
        </div>
        <hr />
        <div className='flex justify-center'>
            <a href='https://portfolio-vini-dev01.vercel.app/' target='blank' className='inline-block text-center my-5 cursor-cursor'>© 2025 Vinicios.S. Todos os direitos reservados.</a>
        </div>
    </footer>
  )
}

export default Footer