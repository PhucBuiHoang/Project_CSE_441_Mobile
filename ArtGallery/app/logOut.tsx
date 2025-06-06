import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

import profileImage from '../assets/images/avt.png'; // hoặc thay bằng ảnh bạn đang dùng

const LogoutScreen = () => {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert('Logged out', 'You have been logged out!');
        // Sau khi logout có thể navigate về login page
        // router.replace('/login');
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
