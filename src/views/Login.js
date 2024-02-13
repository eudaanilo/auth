import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import firebaseAuth from '../firebase/config';
import Spinner from 'react-native-loading-spinner-overlay';

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
        Alert.alert("Erro", "Não foi possível se conectar com essas credenciais")
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
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
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueci a Senha</Text>
        </TouchableOpacity>
        <Button title="Entrar" onPress={() => doLogin()} />
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
