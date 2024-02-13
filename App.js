import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "./src/firebase/config";
import Home from "./src/views/Home";
import Login from "./src/views/Login";

export default function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  if (user) {
    return <Home></Home>;
  }

  return <Login></Login>;
}
