import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Alert,
} from 'react-native';

// useRouter nếu vẫn muốn dùng điều hướng
import { useRouter } from 'expo-router';

import profileImage from '../../assets/images/avt.png';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfileScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('Hoàng Vy');
    const [username, setUsername] = useState('_hoang.vy_');
    const [password, setPassword] = useState();

    const handleSaveChanges = () => {
        Alert.alert('Success', 'Profile updated successfully!');
    };

    const handleChangePassword = () => {
        Alert.alert('Change Password', 'Navigate to change password screen');
    };

    const handleChangeProfilePicture = () => {
        Alert.alert('Change Picture', 'Select new profile picture');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

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
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                        placeholderTextColor="#999"
                    />
                </View>

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

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        textContentType='password'
                        style={styles.textInput}
                        value={password}
                        // onChangeText={setUsername}
                        placeholder="*******"
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

                {/* <TouchableOpacity
                    style={styles.changePasswordButton}
                    onPress={handleChangePassword}
                    activeOpacity={0.8}
                >
                    <Text style={styles.changePasswordButtonText}>Change password</Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profilePictureSection: {
        alignItems: 'center',
        paddingVertical: 40,
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
        // marginBottom: 40,
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
