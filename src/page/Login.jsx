
import React, {useState} from 'react';
import { UserRound, LockKeyhole, Undo2, EyeClosed, Eye, Mail } from 'lucide-react';

// Firebase imports
import { registerUser } from "../auth/register";
import { loginComUsernameOuEmail } from "../auth/login";

import { useNavigate, Link } from 'react-router-dom';
import RedefinirSenha from '../components/Model/RedefinirSenha';
import { Helmet } from "react-helmet-async";


function Login() {  
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [modelRedefinir, setModelRedefinir] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [error, setError] = useState("");
    const [errorRegister, setErrorRegister] = useState("")
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (!username || !email || !senha) return;

        setLoading(true);
        setErro("");

        try {
            await registerUser(email, senha, username);
            navigate("/");
            

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorRegister("Este email já está cadastrado");
            }
            else if (error.code === "functions/already-exists") {
                setErrorRegister("Username já existe");
            } else {
                setErrorRegister("Erro ao cadastrar");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin(e) {
        e.preventDefault();

        if(login.trim() === "") {
            setError("O username/email está vazio!");
            return;
        }
        if(password.trim() === "") {
            setError("A senha está vazia!");
            return;
        }

        try {
        await loginComUsernameOuEmail(login, password);
        navigate("/");

        } catch (err) {
            setError("Erro: Email/Senha não encontrada.");
        }
    }



    
    return (
        <div className="bg-[#f5f5f5] flex justify-center items-center min-h-screen font-poppins relative px-4">

            <Helmet>
                <title>Login | Quiz Clash Royale</title>
                <meta
                name="description"
                content="Faça login no Quiz Clash Royale para salvar seu progresso, participar do ranking e competir com outros jogadores."
                />
            </Helmet>
            {/* Botão voltar */}
            <Link to="/">
                <Undo2 className="absolute top-3 left-4 cursor-pointer hover:text-gold duration-300"/>
            </Link>

            {/* FORM LOGIN */}
            {!open && (
                <form 
                    onSubmit={handleLogin} 
                    className="bg-[#ffffff] flex flex-col p-8 sm:p-10 rounded-lg w-full max-w-sm sm:max-w-md shadow-md"
                >
                    <h2 className="text-3xl font-semibold uppercase mb-5">Login</h2>

                    {/* USERNAME */}
                    <label className="relative w-full">
                        
                        <input 
                            type="text" 
                            name="username" 
                            value={login}
                            onChange={(e)=>setLogin(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === " ") e.preventDefault();
                            }}
                            placeholder="username ou email" 
                            className="border border-gray-300 rounded-md w-full h-12 pl-10"
                            required
                        />
                        
                        <UserRound className='absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5' />
                    </label>

                    {/* SENHA */}
                    <label className={`relative w-full ${error === "" ? "my-5" : "mt-5"}`}>
                        
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                            onKeyDown={(e) => {
                                if (e.key === " ") e.preventDefault();
                            }}
                            placeholder="senha" 
                            className="border border-gray-300 rounded-md w-full h-12 px-10"
                            autoComplete="current-password" 
                            minLength={6}
                            required
                        />

                        {/* Olho */}
                        <button
                            type='button'
                            onClick={()=>setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            className='absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 cursor-pointer'
                            title={!showPassword ? "Mostrar senha" : "Ocultar senha"}
                        >
                            {!showPassword ? <EyeClosed className='w-full h-full' /> : <Eye className='w-full h-full'/>}
                        </button>
                        <LockKeyhole className='absolute top-1/2 left-2 -translate-y-1/2 w-5 h-5' />
                    </label>

                    {error && <p className="text-red-500 text-sm mb-5">{error}</p>}

                    {/* BOTÃO LOGIN */}
                    <button 
                        type="submit"
                        className='w-full h-11 bg-primary text-[#ffffff] font-semibold rounded-md hover:bg-background transition-colors cursor-pointer'
                    >
                        Acessar
                    </button>
                    
                    {/* LINK ESQUECEU */}
                    <button 
                        className="text-sm text-blue-500 hover:underline mt-3 self-center cursor-pointer"
                        onClick={()=>setModelRedefinir(true)}
                    >
                        Esqueceu sua senha?
                    </button>
                    
                    {/* LINK REGISTRAR */}
                    <p className="text-sm mt-4 self-center">
                        Não tem uma conta? 
                        <button 
                            className="text-blue-500 hover:underline ml-1 cursor-pointer" 
                            onClick={() => setOpen(true)}
                        >
                            Registre-se
                        </button>
                    </p>
                </form>
            )}

            {/* FORM REGISTRO */}
            {open && (
                <form 
                    onSubmit={handleRegister} 
                    className="bg-white flex flex-col p-8 sm:p-10 rounded-lg w-full max-w-sm sm:max-w-md shandow-md"
                >
                    <h2 className="text-3xl font-semibold uppercase mb-5">Registre-se</h2>

                    {/* USERNAME */}
                    <label className="relative w-full">
                        
                        <input 
                            type="text" 
                            name="username" 
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === " ") e.preventDefault();
                            }}
                            placeholder="Username" 
                            className="border border-gray-300 rounded-md w-full h-12 pl-10"    
                            minLength={2}
                            required
                        />
                        <UserRound className='absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5' />
                    </label>

                    {/* EMAIL */}
                    <label className="relative w-full mt-5">
                        
                        <input 
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === " ") e.preventDefault();
                            }}
                            placeholder="Email" 
                            autoComplete="email"
                            className="border border-gray-300 rounded-md w-full h-12 pl-10" 
                            required   
                        />
                        <Mail className='absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5' />
                    </label>

                    {/* SENHA */}
                    <label className={`relative ${errorRegister === "" ? "my-5" : "mt-5"}`}>
                        
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            value={senha}
                            onChange={(e)=>setSenha(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === " ") e.preventDefault();
                            }}
                            placeholder="Senha" 
                            className="border border-gray-300 rounded-md w-full h-12 pl-10"
                            autoComplete="current-password" 
                            minLength={8}
                            required
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                            
                        />

                        {/* Olho */}
                        <button
                            type='button'
                            onClick={()=>setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            className='absolute top-1/2 right-2 -translate-y-1/2 w-5 h-5 cursor-pointer'
                            title={!showPassword ? "Mostrar senha" : "Ocultar senha"}
                        >
                            {!showPassword ? <EyeClosed className='w-full h-full' /> : <Eye className='w-full h-full'/>}
                        </button>
                        <div 
                            className='absolute top-1/2 left-2 -translate-y-1/2 w-5 h-5' 
                            title={
                                `A senha deve ter pelo menos 8 caracteres, 
incluindo 1 letra maiúscula, 
1 minúscula e 
1 número.`
                        }     
                        >
                            <LockKeyhole className='w-full h-full' />
                        </div>
                    </label>

                    {errorRegister && (<p className="text-red-500 text-sm mb-5">{errorRegister}</p>)}

                    {/* BOTÃO REGISTRO */}
                    <button 
                        type="submit"
                        className='w-full h-11 bg-gold text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors cursor-pointer'
                    >
                        {loading ? "Cadastrando..." : "Registrar"}
                    </button>
                    
                    {/* LINK Acesso */}
                    <p className="text-sm mt-4 text-center">
                        Ja tenho uma conta? <button className="text-blue-500 hover:underline cursor-pointer" onClick={()=>setOpen(false)}>Acessar</button>
                    </p>
                </form>
            )}

            {modelRedefinir && (
                <RedefinirSenha setModelRedefinir={setModelRedefinir} />
            )}

        </div>
    );
}

export default Login;



