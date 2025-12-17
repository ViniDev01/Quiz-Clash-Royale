
import React,{useState, useEffect, useRef} from 'react'
import { CircleUserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext';
import { logoutUsuario } from '../../auth/logout';

import imgUser from '../../assets/user.jpg'

function Header() {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      // Se clicar fora do nav E fora da imagem, fecha
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  async function handleLogout() {
    await logoutUsuario();
    navigate('/');
  }

  return (
    <header className='h-[100px] relative bg-secundaria text-white'>
        <h1 className='logo flex justify-center items-center'>
          <Link to="/" className='leading-[100px] font-poppins font-bold text-2xl cursor-pointer xr:text-4xl'>Quiz Clash Royale</Link>
        </h1>
        {user ? (
          <div>
            <div ref={avatarRef} className='absolute top-1/2 right-5 -translate-y-1/2 w-8 h-8' onClick={()=>setOpen(!open)}>
              <img src={imgUser} alt="" className='w-full h-full rounded-full cursor-pointer' />
            </div>

              <nav ref={menuRef} className={`
                absolute top-[100px] right-0 w-30 h-20 bg-secundaria z-10
                transition-all duration-200 ease-out
                ${open 
                  ? "opacity-100 scale-100 pointer-events-auto" 
                  : "opacity-0 scale-95 pointer-events-none"}
              `}>
                <ul>
                  <li className='text-white flex border-b border-gray-300 hover:bg-gray-700 transition-colors'>
                    <Link to="/configuracao/perfil" className='w-full h-full p-2 cursor-pointer'>Perfil</Link>
                  </li>
                  <li className='text-white flex hover:bg-gray-700 cursor-pointer transition-colors'>
                    <button onClick={handleLogout} className='w-full h-full p-2 cursor-pointer text-start'>Sair</button>
                  </li>
                </ul>
              </nav>
          </div>
        ) : (
          <Link 
            to='/login' 
            className='absolute top-1/2 right-5 -translate-y-1/2' 
            aria-label="Ir para a página de login"
          >
            <CircleUserRound className='text-terciaria cursor-pointer' aria-hidden="true" />
          </Link>
        )}
    </header>
  )
}

export default Header