import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      setUser(usuario); // null ou user

      if(usuario) {
        try {
          const userRef = doc(db, "users", usuario.uid);
          const userSnap = await getDoc(userRef);

          if(userSnap.exists()){
            setUserData(userSnap.data());
          }else {
            setUserData(null);
          }
        }catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
      
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pra facilitar o uso
export function useAuth() {
  return useContext(AuthContext);
}
