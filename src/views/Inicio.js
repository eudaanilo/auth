import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Animated, Alert } from 'react-native';
import firebaseAuth from '../firebase/config';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Inicio() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [profilePicUri, setProfilePicUri] = useState(null);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const toggleMenu = () => {
        if (menuVisible) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
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
        Alert.alert('Perfil', 'Informações do perfil');
        toggleMenu();
    };

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        toggleMenu();
    };

    const handleSettings = () => {
        Alert.alert('Configurações', 'Configurações da conta');
        toggleMenu();
    };

    const handleLogout = () => {
        signOut(firebaseAuth);
    };

    const handleChangeProfilePic = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Você precisa conceder permissão para acessar a biblioteca de mídia.');
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    
        if (!result.cancelled) {
            try {
                const fileName = result.uri.split('/').pop();
                const newPath = FileSystem.documentDirectory + fileName;
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: newPath,
                });
                setProfilePicUri(newPath);
            } catch (error) {
                console.error('Erro ao salvar a imagem:', error);
            }
        } else {
            console.log('Seleção de imagem cancelada.');
        }
    
        toggleMenu();
    };
    

    return (
        <View style={[styles.container, darkMode && styles.darkMode]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleMenu}>
                    <Image
                        source={profilePicUri ? { uri: profilePicUri } : require('../img/profilephoto.jpg')}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>
                <Animated.View style={[styles.menu, { opacity: fadeAnim }]}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleChangeProfilePic}>
                        <Text>Alterar Foto de Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleProfileInfo}>
                        <Text>Informações do Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleDarkMode}>
                        <Text>{darkMode ? 'Modo Claro' : 'Modo Escuro'}</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    darkMode: {
        backgroundColor: '#000',
    },
    header: {
        position: 'absolute',
        top: 30,
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
        color: '#000',
        marginBottom: 20,
    },
});






//'../img/profilephoto.jpg'