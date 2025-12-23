import { getFunctions, httpsCallable } from "firebase/functions"; 

export async function registerUser(email, password, username) {
  const functions = getFunctions();
  const register = httpsCallable(functions, "criarUsuario");

  return await register({
    email,
    password,
    username
  });
}
