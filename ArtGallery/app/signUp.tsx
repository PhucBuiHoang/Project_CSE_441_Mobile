import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Load font
    const [fontsLoaded] = useFonts({
        'InriaSerif-Regular': require('../assets/fonts/InriaSerif-Regular.ttf'),
        'InriaSerif-Bold': require('../assets/fonts/InriaSerif-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null; // Hoặc loading screen
    }

    return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />

                {/* Background Image */}
                <ImageBackground
                    source={require('../assets/images/loginBackground.png')}
                    style={styles.background}
                    resizeMode="cover"
                >
                    {/* Overlay để tạo hiệu ứng mờ */}
                    <View style={styles.overlay} />

                    <View style={styles.signUpContainer}>
                        {/* Glass morphism container */}
                        <View style={styles.glassContainer}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.title}>Sign up</Text>
                            </View>

                            {/* Form */}
                            <View style={styles.form}>
                                {/* Username Input */}
                                <View style={styles.inputContainer}>
                                    <FontAwesome
                                        name="user"
                                        size={20}
                                        color="rgba(255, 255, 255, 0.8)"
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Type your username"
                                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                                        value={username}
                                        onChangeText={setUsername}
                                        autoCapitalize="none"
                                    />
                                </View>

                                {/* Password Input */}
                                <View style={styles.inputContainer}>
                                    <FontAwesome
                                        name="lock"
                                        size={20}
                                        color="rgba(255, 255, 255, 0.8)"
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Type your password"
                                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <FontAwesome
                                            name={showPassword ? "eye" : "eye-slash"}
                                            size={18}
                                            color="rgba(255, 255, 255, 0.8)"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* Confirm Password Input */}
                                <View style={styles.inputContainer}>
                                    <FontAwesome
                                        name="lock"
                                        size={20}
                                        color="rgba(255, 255, 255, 0.8)"
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Confirm your password"
                                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!showConfirmPassword}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <FontAwesome
                                            name={showConfirmPassword ? "eye" : "eye-slash"}
                                            size={18}
                                            color="rgba(255, 255, 255, 0.8)"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* Sign Up Button */}
                                <TouchableOpacity style={styles.signUpButton}>
                                    <Text style={styles.signUpButtonText}>Sign up</Text>
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={styles.dividerContainer}>
                                    <Text style={styles.dividerText}>Or</Text>
                                </View>

                                {/* Sign In Link */}
                                <View style={styles.signInContainer}>
                                    <TouchableOpacity>
                                        <Text style={styles.signInLink}>Sign in</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    glassContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
        borderRadius: 20,
        padding: 30,
        width: '100%',
        maxWidth: 400,
        // Glassmorphism effect
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        // Backdrop blur simulation với shadow
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    signUpContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 48,
        fontWeight: '300',
        color: '#fff',
        marginBottom: 10,
        fontFamily: 'InriaSerif-Regular',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 15,
        // paddingVertical: 15,
        borderWidth: 2,
        borderColor: '#FFB348',
        // Shadow effect theo Figma
        shadowColor: '#C38C00',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        // elevation: 1, // Cho Android
    },
    inputIcon: {
        marginRight: 15,
    },
    textInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    eyeIcon: {
        padding: 5,

    },
    signUpButton: {
        backgroundColor: '#FFC300',
        borderRadius: 25,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 20,
        width: 150,
        height: 40,
        // marginRight:20,
        marginVertical: 'auto',
        marginHorizontal: 'auto',
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    dividerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    dividerText: {
        color: '#fff',
        fontSize: 16,
    },
    signInContainer: {
        alignItems: 'center',
    },
    signInLink: {
        color: '#00DDFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SignUpScreen;