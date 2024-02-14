import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import firebaseAuth from '../firebase/config';
import Spinner from 'react-native-loading-spinner-overlay';
import Cadastro from './Cadastro';
import react from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const doLogin = () => {
    setLoading(true);

    signInWithEmailAndPassword(firebaseAuth, username, password)
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if((username.length) === 0){
            Alert.alert("Não há dados", "Não foram inseridos dados para autenticação")
        }else{
            Alert.alert("Usuário não cadastrado", "Não existe nenhum usuário com o e-mail informado.")
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  // function GoToButton({ navigation, Cadastro }) {
  //   return (
  //     <Button
  //       title={`Go to ${Cadastro}`}
  //       onPress={() => navigation.navigate(Cadastro)}
  //     />
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.forms}>
        <TextInput
          placeholder="Usuário"
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueci a Senha</Text>
        </TouchableOpacity>
        <Button title="Entrar" onPress={() => doLogin()} />
        <Button title="Se cadastrar" onPress= { () => navigation.navigate('Cadastro')} />
        <Spinner
          visible={loading}
          textContent={'Conectando...'}
          textStyle={styles.spinnerText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  forms: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'blue',
  },
  spinnerText: {
    color: '#ffff',
  },
});
