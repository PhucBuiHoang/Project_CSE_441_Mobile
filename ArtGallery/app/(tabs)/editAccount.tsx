import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import profileImage from '../../assets/images/avt.png';
import { API_BASE_URL } from '../services/api';

const EditProfileScreen = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    // Gọi API lấy profile khi mở màn hình
    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('Token missing');

            const response = await axios.post(`${API_BASE_URL}/Auth/profile`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsername(response.data.username || '');
        } catch (error) {
            Alert.alert('Error', 'Could not load profile');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSaveChanges = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('Token missing');

            const response = await axios.put(`${API_BASE_URL}/User/update-username`, { username }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            Alert.alert('Success', 'Username updated successfully!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update username');
        }
    };

    const handleChangePassword = () => {
        Alert.alert('Change Password', 'Navigate to change password screen');
    };

    const handleChangeProfilePicture = () => {
        Alert.alert('Change Picture', 'Select new profile picture');
    };

    const handleGoBack = () => {
        router.push('/(tabs)/person');

    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FF8C00" />
                <Text>Loading profile...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            {/* Profile Picture Section */}
            <View style={styles.profilePictureSection}>
                <View style={styles.avatarContainer}>
                    <Image source={profileImage} style={styles.avatar} />
                </View>
                <TouchableOpacity onPress={handleChangeProfilePicture}>
                    <Text style={styles.changePictureText}>Change profile picture</Text>
                </TouchableOpacity>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        style={styles.textInput}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter your username"
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            {/* Buttons Section */}
            <View style={styles.buttonsSection}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveChanges}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveButtonText}>Save change</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.changePasswordButton}
                    onPress={handleChangePassword}
                    activeOpacity={0.8}
                >
                    <Text style={styles.changePasswordButtonText}>Change password</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    profilePictureSection: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    avatarContainer: {
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
    },
    changePictureText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '500',
    },
    formSection: {
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        marginLeft: 15,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color: '#000',
    },
    buttonsSection: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#FF8C00',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    changePasswordButton: {
        backgroundColor: '#FF8C00',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
    },
    changePasswordButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditProfileScreen;
