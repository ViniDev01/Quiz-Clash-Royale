import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // ajuste o caminho

export async function registrarUsuario(email, senha) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return userCredential.user; // retorna o usuário já logado
  } catch (error) {
    throw error;
  }
}
