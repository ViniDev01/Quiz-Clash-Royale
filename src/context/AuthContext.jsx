import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { db } from "../firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUserDoc = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);

      // limpa listener anterior
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
        unsubscribeUserDoc = null;
      }

      if (usuario) {
        const userRef = doc(db, "users", usuario.uid);

        unsubscribeUserDoc = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            setUserData({ id: snap.id, ...snap.data() });
          } else {
            setUserData(null);
          }
          setLoading(false);
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
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
