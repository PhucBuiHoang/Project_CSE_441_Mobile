import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../services/api';

// const { width } = Dimensions.get('window');

const screenWidth = Dimensions.get('window').width;
const Section = ({ title, children, onPress, color = '#e17055', style = {} }) => (
    <View style={[styles.section, style]}>
        {/* <Text style={[styles.sectionTitle, { color }]}>{title}</Text> */}
        <TouchableOpacity onPress={onPress} style={styles.titleContainer}>
            <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
            <Ionicons name="chevron-forward" size={16} color="#aaa" />
        </TouchableOpacity>
        {children}
    </View>
);
const ImageCard = ({ title, imageUrl, onPress, cardStyle }) => {
    const source = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;
    return (
        <TouchableOpacity onPress={onPress} style={cardStyle}>
            <ImageBackground source={source} style={styles.genreImage} imageStyle={styles.imageStyle}>
                <Text style={styles.genreLabel}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity >
    );
};

const DiscoverScreen = () => {
    const navigation = useRouter();
    const [carouselItems, setCarouselItems] = useState([]);
    const [artists, setArtist] = useState([]);
    const [genre, setGenres] = useState([]);
    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                // const token = await AsyncStorage.getItem('token');
                // console.log(token);
                const res = await axios.get(`${API_BASE_URL}/Artwork`);
                // await AsyncStorage.setItem('artworks', res.data);
                setCarouselItems(res.data);
                console.log(res.data);
            } catch (error) {
                console.log('Failed to load artworks', error);
            }
        };
        fetchArtworks();
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
        const fetchGenres = async () => {
            try {
                // const token = await AsyncStorage.getItem('token');
                const genres = await axios.get(`${API_BASE_URL}/Category`);
                setGenres(genres.data);
            } catch (error) {
                console.log('Failed to load genres', error);
            }
        };
        fetchGenres();
    }, []);
    // const imageMap = {
    //     StarryNightOvertheRhone: require('../../assets/images/Starry Night Over the Rhone.jpg'),
    //     LesDemoisellesdAvignon: require('../../assets/images/Les Demoiselles dAvignon.jpg'),
    //     TheLastSuppeStudy: require('../../assets/images/The Last Supper Study.jpg'),
    //     WaterLiliesSeries: require('../../assets/images/Water Lilies Series.jpg'),
    // };
    const images = {
        AbstractReflections: require('../../assets/images/AbstractReflections.jpg'),
        AbstractSymphonyMusicInspiredModernArtCanvas: require('../../assets/images/AbstractSymphonyMusicInspiredModernArtCanvas.jpg'),
        TheLastLightEchoesofMyYouth: require('../../assets/images/TheLastLightEchoesofMyYouth.jpg'),
        CityLights: require('../../assets/images/CityLights.jpg'),
        FridaKahloJungleCatLovesEver: require('../../assets/images/FridaKahloJungleCatLovesEver.jpg'),
        FusionElements: require('../../assets/images/FusionElements.jpg'),
        GirlWithAPearlEarring: require('../../assets/images/GirlWithAPearlEarring.jpg'),
        MoreThanJustArtItsAFeeling: require('../../assets/images/MoreThanJustArtItsAFeeling.jpg'),
        PinkLotuses: require('../../assets/images/PinkLotuses.jpg'),
        RedPoppy: require('../../assets/images/RedPoppy.jpg'),
        SelfPortraitWithThornNecklace: require('../../assets/images/SelfPortraitWithThornNecklace.jpg'),
        StarryNightOverTheRhone: require('../../assets/images/StarryNightOverTheRhone.jpg'),
        Sunflowers: require('../../assets/images/Sunflowers.jpg'),
        // TheLastLightEchoesOfMyYouth: require('../../assets/images/TheLastLightEchoesOfMyYouth.jpg'),
        TimelessBeautyBlackAndWhitePhotography: require('../../assets/images/TimelessBeautyBlackAndWhitePhotography.jpg'),
        UrbanEscapeVibrantCityscapeFramedPainting: require('../../assets/images/UrbanEscapeVibrantCityscapeFramedPainting.jpg'),
        WaterLiliesSeries12: require('../../assets/images/WaterLiliesSeries12.jpg'),
        WhereImaginationMeetsTheCanvas: require('../../assets/images/WhereImaginationMeetsTheCanvas.jpg'),
        WhispersOfColorsInSilentShadows: require('../../assets/images/WhispersOfColorsInSilentShadows.jpg'),
        ABrushstrokeOfSerenityInAChaoticWorld: require('../../assets/images/ABrushstrokeOfSerenityInAChaoticWorld.jpg'),
        WhereStillnessSpeaksColorsConverse: require('../../assets/images/WhereStillnessSpeaksColorsConverse.jpg'),
    };
    const artistImages = {
        VincentVanGogh: require('../../assets/images/Vincent van Gogh.jpg'),
        PabloPicasso: require('../../assets/images/Pablo Picasso.jpg'),
        LeonardoDaVinci: require('../../assets/images/Leonardo da Vinci.jpg'),
        ClaudeMonet: require('../../assets/images/Claude Monet.jpg'),
        GeorgiaOKeeffe: require('../../assets/images/Georgia O\'Keeffe.jpg'),
        SalvadorDali: require('../../assets/images/Salvador Dalí.jpg'),
        FridaKahlo: require('../../assets/images/Frida Kahlo.jpg'),
        AndyWarhol: require('../../assets/images/Andy Warhol.jpg'),
        HenriMatisse: require('../../assets/images/Henri Matisse.jpg'),
        JacksonPollock: require('../../assets/images/Jackson Pollock.jpg'),
        Rembrandt: require('../../assets/images/Rembrandt.jpg'),
        EdgarDegas: require('../../assets/images/Edgar Degas.jpg'),
        DavidHockney: require('../../assets/images/David Hockney.jpg'),
    };


    const museums = [
        { name: 'Louvre Museum', desc: 'Paris, French', image: require('../../assets/images/room3.jpg') },
        { name: 'Green Palm Gallery', desc: 'District 1, HCMC', image: require('../../assets/images/room3.jpg') },
    ];

    const genres = [
        { name: 'Roman art', image: require('../../assets/images/room3.jpg') },
        { name: 'Roman art', image: require('../../assets/images/room3.jpg') },
        { name: 'Roman art', image: require('../../assets/images/room3.jpg') },
        { name: 'Roman art', image: require('../../assets/images/room3.jpg') },
        { name: 'Roman art', image: require('../../assets/images/room3.jpg') },
        { name: 'Roman art', image: require('../../assets/images/room3.jpg') },
    ];
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <SafeAreaView edges={["top"]}>

            <ScrollView style={styles.container} >
                <View style={styles.header1}>
                    <Ionicons name="menu" size={28} color="#f7941d" />
                    <View style={styles.headerIcons}>
                        <Ionicons name="cart-outline" size={24} color="#f7941d" style={styles.icon} />
                        <Ionicons name="notifications-outline" size={24} color="#f7941d" />
                    </View>
                </View>
                <FlatList
                    ref={flatListRef}
                    data={carouselItems}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ImageCard
                            title={item.title}
                            imageUrl={images[item.imageUrl]}
                            cardStyle={styles.carouselCard}
                            onPress={() => console.log('Pressed', item.title)}
                        />
                    )}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(
                            event.nativeEvent.contentOffset.x / (screenWidth * 0.85 + 20)
                        );
                        setCurrentIndex(index);
                    }}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    snapToAlignment="center"
                    decelerationRate="fast"
                />

                <View style={styles.paginationContainer}>
                    {carouselItems.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>

                <Section title="Artist" onPress={() => navigation.push(
                    {
                        pathname: '/artistList'
                    }
                )}>
                    <FlatList
                        horizontal
                        data={artists}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.artistCard} onPress={() => navigation.push(
                                {
                                    pathname: '/artistDetail',
                                    params: item
                                }
                            )}>
                                <Image source={artistImages[item.image]} style={styles.artistImage} />
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Section>

                <Section title="Museums & Galleries" color="#f0932b" onPress={() => console.log('Pressed museum')}>
                    {museums.map((m, idx) => (
                        <View key={idx} style={styles.museumCard}>
                            <Image source={m.image} style={styles.museumImage} />
                            <View>
                                <Text style={styles.museumName}>{m.name}</Text>
                                <Text>{m.desc}</Text>
                            </View>
                        </View>
                    ))}
                </Section>

                <Section title="Genres" onPress={() => navigation.push(
                    {
                        pathname: '/artList'
                    }
                )}>
                    <FlatList
                        horizontal
                        data={genre}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <ImageCard
                                title={item.name}
                                imageUrl={images[item.imageUrl]}
                                cardStyle={styles.genreCard}
                                onPress={() => console.log('Pressed', item.name)}
                            />
                        )}
                    />
                </Section>

                <Section title="Collections" style={{
                    marginBottom: 30
                }} onPress={() => console.log('Pressed collections')}>
                    <FlatList
                        horizontal
                        data={genres}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <ImageCard
                                title={item.name}
                                imageUrl={item.image}
                                cardStyle={styles.collectionCard}
                                onPress={() => console.log('Pressed', item.name)}
                            />
                        )}
                    />
                </Section>
            </ScrollView >
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#fff', padding: 16 },
    titleContainer: {
        paddingHorizontal: 8,
        paddingBottom: 0,
        marginTop: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    header: { fontSize: 24, fontWeight: 'bold', color: '#e17055' },
    carouselItem: { borderRadius: 10, overflow: 'hidden' },
    carouselImage: { width: '100%', height: 180, borderRadius: 10 },
    carouselText: { marginTop: 8, fontSize: 16, fontWeight: '600' },
    section: { marginTop: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    artistCard: { alignItems: 'center', marginRight: 16, flexDirection: 'row' },
    artistImage: { width: 60, height: 60, borderRadius: 30, marginRight: 5 },
    museumCard: { flexDirection: 'row', marginBottom: 16 },
    museumImage: { width: 100, height: 80, borderRadius: 10, marginRight: 12 },
    museumName: { fontWeight: 'bold', fontSize: 16 },
    genreCard: {
        width: 140,
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
    collectionCard: {
        width: 140,
        height: 210,
        marginRight: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 12,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        // marginBottom: 24,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#f7941d',
    },
    carouselCard: {
        width: screenWidth * 0.85,
        height: 300,
        marginTop: 32,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 16,
        overflow: 'hidden',
    }
});

export default DiscoverScreen;
