import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import firebaseAuth from '../firebase/config';
import { signOut } from 'firebase/auth';

export default function Inicio() {
    const [menuVisible, setMenuVisible] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

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
        // Implementação da função handleProfileInfo
    };

    const handleDarkMode = () => {
        // Implementação da função handleDarkMode
    };

    const handleSettings = () => {
        // Implementação da função handleSettings
    };

    const handleLogout = () => {
        // Implementação da função handleLogout
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleMenu}>
                    <Image
                        source={require('../img/profilephoto.jpg')} // Substitua pelo caminho da imagem de perfil
                        style={styles.profilePic}
                    />
                </TouchableOpacity>
                {/* Menu suspenso */}
                <Animated.View style={[styles.menu, { opacity: fadeAnim }]}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleProfileInfo}>
                        <Text>Informações do Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleDarkMode}>
                        <Text>Modo Escuro</Text>
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
            <Button title="Sair" onPress={handleLogout} />
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
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#fff',
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