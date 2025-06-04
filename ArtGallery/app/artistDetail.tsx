import { useLocalSearchParams } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArtistDetailScreen() {
    const params = useLocalSearchParams();

    console.log(params);

    return (
        <SafeAreaView>
            <View style={styles.Card}>
                <ImageBackground source={params.image} style={styles.genreImage} imageStyle={styles.imageStyle}>
                    <Text style={styles.genreLabel}>{params.name}</Text>
                </ImageBackground>
            </View >
            <Text>{params.description}</Text>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    Card: {
        width: '100%',
        height: 150,
        marginRight: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    genreImage: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10,
    },
    imageStyle: {
        borderRadius: 16,
    },
    genreLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
});
