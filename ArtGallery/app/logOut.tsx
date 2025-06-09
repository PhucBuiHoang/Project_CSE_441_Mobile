import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import profileImage from '../assets/images/avt.png';

const LogoutScreen = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            Alert.alert('Logged out', 'You have been logged out!');
            router.replace('/signIn');
        } catch (err) {
            console.error('Logout error:', err);
            Alert.alert('Error', 'Logout failed');
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.content}>
                <Image source={profileImage} style={styles.avatar} />
                <Text style={styles.username}>_hoang.vy_</Text>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LogoutScreen;

export const screenOptions = {
    title: 'Log out',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#eee',
    },
    username: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    logoutButton: {
        backgroundColor: '#FF8C00',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
