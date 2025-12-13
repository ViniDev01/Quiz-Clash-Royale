import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export async function logoutUsuario() {
  await signOut(auth);
}
