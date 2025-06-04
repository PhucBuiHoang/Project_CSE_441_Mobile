import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (

        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title"><Link href={"/(tabs)"}>Bấm vào đây để vào Trang Chính</Link></ThemedText>

                <ThemedText type="title" style={{ color: 'red', marginTop: 30 }}><Link href={"/about"}>Detail</Link></ThemedText>
                <ThemedText type="title" style={{ color: 'blue', marginTop: 30 }}><Link href={"/artistDetail"}>Artist Detail</Link></ThemedText>
                <ThemedText type="title" style={{ color: 'pink', marginTop: 30 }}><Link href={"/signIn"}>Sign In</Link></ThemedText>
                <ThemedText type="title" style={{ color: 'black', marginTop: 30 }}><Link href={"/signUp"}>Sign Up</Link></ThemedText>
            </ThemedView>
        </ParallaxScrollView>

    );
}

const styles = StyleSheet.create({
    titleContainer: {
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
