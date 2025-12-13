import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig"; 

export async function loginComUsernameOuEmail(login, senha) {
  let emailFinal = login;

  // ✅ se NÃO parecer email, tratamos como username
  if (!login.includes("@")) {
    const q = query(
      collection(db, "users"),
      where("username", "==", login.toLowerCase())
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Usuário não encontrado");
    }

    querySnapshot.forEach((doc) => {
      emailFinal = doc.data().email;
    });
  }

  // ✅ login normal com email
  const userCred = await signInWithEmailAndPassword(auth, emailFinal, senha);
  return userCred.user;
}
