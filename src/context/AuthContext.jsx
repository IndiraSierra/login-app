import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);

// Provider del contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // espera a verificar sesión

  // Observar cambios de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Funciones de autenticación
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
