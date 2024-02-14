import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Animated, Alert } from 'react-native';
import firebaseAuth from '../firebase/config';
import { signOut } from 'firebase/auth';
import ImagePicker from 'react-native-image-picker';

export default function Inicio() {
    const [menuVisible, setMenuVisible] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];
    const [darkMode, setDarkMode] = useState(false);

    const toggleMenu = () => {
        if (menuVisible) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }).start(() => setMenuVisible(false));
        } else {
            setMenuVisible(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleProfileInfo = () => {
        Alert.alert('Configurações', 'Configurações da conta');
        toggleMenu();
    };

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        toggleMenu();
    };

    const handleSettings = () => {
        // Implementação da função handleSettings
    };

    const handleLogout = () => {
        signOut(firebaseAuth);
    };

    const handleChangeProfilePic = () => {
        const options = {
            title: 'Selecionar Foto de Perfil',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagem');
            } else if (response.error) {
                console.log('Erro ao selecionar imagem:', response.error);
            } else {
                // Aqui você pode fazer o upload da imagem para o servidor ou salvar localmente
                console.log('Caminho da imagem:', response.uri);
            }
        });

        toggleMenu();
    };





    return (
        <View style={[styles.container, darkMode && styles.darkMode]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleMenu}>
                    <Image
                        source={require('../img/profilephoto.jpg')} // Substitua pelo caminho da imagem de perfil
                        style={styles.profilePic}
                    />
                </TouchableOpacity>
                <Animated.View style={[styles.menu, { opacity: fadeAnim }]}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleProfileInfo}>
                        <Text>Informações do Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleChangeProfilePic}>
                        <Text>Mudar foto de perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleDarkMode}>
                        <Text>{darkMode ? 'Modo Escuro' : 'Modo Claro'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
                        <Text>Configurações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                        <Text>Sair</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <Text style={styles.title}>Tela de Início!</Text>
            {/* <Button title="Sair" onPress={handleLogout} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    darkMode: {
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    menu: {
        position: 'absolute',
        top: 60,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        elevation: 3,
    },
    menuItem: {
        paddingVertical: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
});







// 