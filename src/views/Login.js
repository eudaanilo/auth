import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
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
          Alert.alert("Não há dados", "Não foram inseridos dados para autenticação");
          setLoading(false);
        }else{
          Alert.alert("Usuário não cadastrado", "Não existe nenhum usuário com o e-mail informado.");
          setLoading(false);
          setUsername(''); 
          setPassword(''); 
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  const handleForgotPassword = async () => {
    try {
      if (!username) {
        Alert.alert("Campo de E-mail vazio", "Por favor, insira seu e-mail para redefinir a senha.");
        return;
      }

      setLoading(true);

      await sendPasswordResetEmail(firebaseAuth, username);

      Alert.alert("E-mail de Redefinição Enviado", "Um e-mail de redefinição de senha foi enviado para o endereço fornecido.");
    } catch (error) {
      console.error('Erro ao enviar e-mail de redefinição de senha:', error);
      Alert.alert("Erro ao enviar e-mail", "Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

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
        <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Esqueci a Senha</Text>
        </TouchableOpacity>
        <Button title="Entrar" onPress={() => doLogin()} />
        <Button title="Cadastre-se" onPress= { () => navigation.navigate('Cadastro')} />
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
