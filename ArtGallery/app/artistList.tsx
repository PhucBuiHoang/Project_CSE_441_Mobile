import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const artists = [
    { id: '1', name: '7^2 [Daniel Bisig & Tatsuo Unemi]', dates: '21st century', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
    { id: '2', name: 'Magdalena Abakanowicz', dates: '1930 - 2017', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
    { id: '3', name: 'Riza-yi Abbasi', dates: '1565 - 1635', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
    { id: '4', name: 'Louise Abbéma', dates: '1853 - 1927', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
];

const ArtistListScreen = () => {
    return (
        // <SafeAreaView edges={["top"]}>
        <SafeAreaView edges={["bottom"]}>
            <View >
                <FlatList
                    data={artists}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.artistItem}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.dates}>{item.dates}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    // container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    artistItem: { flexDirection: 'row', alignItems: 'center', margin: 10 },
    image: { width: 90, height: 90, borderRadius: 50, marginRight: 10 },
    name: { fontSize: 16, fontWeight: 'bold', color: "white" },
    dates: { fontSize: 14, color: "white" },
});

export default ArtistListScreen;