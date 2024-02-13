import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "../firebase/config";
import Spinner from '@react-native-loading-spinner-overlay';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const doLogin = () => {

        setLoading(true);

        signInWithEmailAndPassword(firebaseAuth, username, password)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
            .finally(() => {
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
            });
    }


    return (
        <View style={styles.container}>
            <View style={styles.forms}>
                <TextInput
                    placeholder="Usuário"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                <Button title="Entrar" onPress={() => doLogin()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
      input: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    spinnerText: {
        color: '#000',
    },
});