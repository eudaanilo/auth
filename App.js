import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "./src/firebase/config";
import Inicio from "./src/views/Inicio";
import Login from "./src/views/Login";
import Cadastro from "./src/views/Cadastro";


export default function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Limpar o listener quando o componente for desmontado
  }, []);

  if (user) {
    return <Inicio></Inicio>;
  } 

    
  return <Login></Login>

  
}
