import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const StartScreen = () => {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
    });

    if (!fontsLoaded) return null;

    const handleGetStarted = () => {
        router.replace('/(tabs)');
    };

    const handleLogin = () => {
        router.push('/signIn'); // ← thay bằng đường dẫn login thực tế nếu khác
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />

            <ImageBackground
                source={require('../assets/images/startScreen.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay} />

                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Artemis</Text>
                    </View>

                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.getStartedButton}
                            onPress={handleGetStarted}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>

                        <Text style={styles.orText}>or</Text>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 80,
        paddingHorizontal: 30,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40,
    },
    title: {
        fontFamily: 'PlayfairDisplay-Regular',
        fontSize: 75,
        fontWeight: '300',
        color: '#FFEACF',
        letterSpacing: 3,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    buttonGroup: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    getStartedButton: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 10,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 1,
    },
    orText: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 4,
        fontWeight: '500',
    },
    loginButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        borderColor: '#fff',
        borderWidth: 1.5,
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default StartScreen;
