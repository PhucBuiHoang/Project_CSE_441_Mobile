import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from './services/api';

const artists = [
    { id: '1', name: '7^2 [Daniel Bisig & Tatsuo Unemi]', dates: '21st century', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
    { id: '2', name: 'Magdalena Abakanowicz', dates: '1930 - 2017', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
    { id: '3', name: 'Riza-yi Abbasi', dates: '1565 - 1635', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
    { id: '4', name: 'Louise Abbéma', dates: '1853 - 1927', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
];

const ArtistListScreen = () => {
    const [artists, setArtist] = useState([]);
    const artistImages = {
        VincentVanGogh: require('../assets/images/Jackson Pollock.jpg'),
        PabloPicasso: require('../assets/images/Pablo Picasso.jpg'),
        LeonardoDaVinci: require('../assets/images/Leonardo da Vinci.jpg'),
        ClaudeMonet: require('../assets/images/Claude Monet.jpg'),
        GeorgiaOKeeffe: require('../assets/images/Georgia O\'Keeffe.jpg'),
        SalvadorDali: require('../assets/images/Salvador Dalí.jpg'),
        FridaKahlo: require('../assets/images/Frida Kahlo.jpg'),
        AndyWarhol: require('../assets/images/Andy Warhol.jpg'),
        HenriMatisse: require('../assets/images/Henri Matisse.jpg'),
        JacksonPollock: require('../assets/images/Jackson Pollock.jpg'),
        Rembrandt: require('../assets/images/Rembrandt.jpg'),
        EdgarDegas: require('../assets/images/Edgar Degas.jpg'),
        DavidHockney: require('../assets/images/David Hockney.jpg'),
    };
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                // const token = await AsyncStorage.getItem('token');
                const artist = await axios.get(`${API_BASE_URL}/Author`);
                setArtist(artist.data);
            } catch (error) {
                console.log('Failed to load artists', error);
            }
        };
        fetchArtists();
    }, []);
    const imageMap = {
        // StarryNightOvertheRhone: require('../assets/images/Starry Night Over the Rhone.jpg'),
        LesDemoisellesdAvignon: require('../assets/images/Les Demoiselles dAvignon.jpg'),
        TheLastSuppeStudy: require('../assets/images/The Last Supper Study.jpg'),
        WaterLiliesSeries: require('../assets/images/Water Lilies Series.jpg'),
    };
    return (
        // <SafeAreaView edges={["top"]}>
        <SafeAreaView edges={["bottom"]}>
            <View >
                <FlatList
                    data={artists}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.artistItem}>
                            <Image source={artistImages[item.image]} style={styles.image} />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.dates}>{item.dob}</Text>
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
    name: { fontSize: 16, fontWeight: 'bold', color: "#000" },
    dates: { fontSize: 14, color: "#000" },
});

export default ArtistListScreen;

function fetchArtists() {
    throw new Error('Function not implemented.');
}
