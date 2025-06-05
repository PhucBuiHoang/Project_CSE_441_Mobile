import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

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

                <View style={styles.loginContainer}>
                    {/* Glass morphism container */}
                    <View style={styles.glassContainer}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.title}>Sign in</Text>
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

                            {/* Remember Me & Forgot Password */}
                            <View style={styles.optionsRow}>
                                <TouchableOpacity
                                    style={styles.rememberContainer}
                                    onPress={() => setRememberMe(!rememberMe)}
                                >
                                    <FontAwesome
                                        name={rememberMe ? "check-square" : "square-o"}
                                        size={16}
                                        color="rgba(255, 255, 255, 0.8)"
                                    />
                                    <Text style={styles.rememberText}>Remember for 30 days</Text>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Text style={styles.forgotText}>Forgot password?</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Divider */}
                            <View style={styles.dividerContainer}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>or</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            {/* Social Login Buttons */}
                            <View style={styles.socialContainer}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <FontAwesome name="facebook" size={24} color="#1877F2" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialButton}>
                                    <FontAwesome name="apple" size={24} color="#000" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialButton}>
                                    <FontAwesome name="google" size={24} color="#EA4335" />
                                </TouchableOpacity>
                            </View>

                            {/* Sign In Button */}
                            <TouchableOpacity style={styles.signInButton}>
                                <Text style={styles.signInButtonText}>Sign in</Text>
                            </TouchableOpacity>

                            {/* Sign Up Link */}
                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Don't have an account? </Text>
                                <TouchableOpacity>
                                    <Text style={styles.signUpLink}>Sign up</Text>
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
    loginContainer: {
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
        // elevation: 8, // Cho Android
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
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 8,
    },
    forgotText: {
        color: '#00DDFF',
        fontSize: 14,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    dividerText: {
        color: '#fff',
        fontSize: 16,
        marginHorizontal: 20,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    socialButton: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    signInButton: {
        backgroundColor: '#FFC300',
        borderRadius: 25,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 20,
        width: 150,
        height:40,
        // marginRight:20,
        marginLeft:60
    },
    signInButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        color: '#fff',
        fontSize: 14,
    },
    signUpLink: {
        color: '#00DDFF',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default LoginScreen;