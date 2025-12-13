
import { 
  deleteUser, 
  EmailAuthProvider, 
  reauthenticateWithCredential 
} from "firebase/auth";

import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

export async function excluirConta(password) {
    
    try {
        const user = auth.currentUser;

        if(!user) {
            console.log("User não está logado.")
            return;
        }

        const credential = EmailAuthProvider.credential(user.email, password);

        await reauthenticateWithCredential(user, credential);

        await deleteDoc(doc(db, "users", user.uid));

        await deleteUser(user);

        return { ok: true };

    } catch (error) {
        console.log("Erro ao excluir conta:", error);
        return { ok: false, error };
    }
}