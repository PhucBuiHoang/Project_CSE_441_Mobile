import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

const screenWidth = Dimensions.get('window').width;
const Section = ({ title, children, color = '#e17055', style = {} }) => (
    <View style={[styles.section, style]}>
        {/* <Text style={[styles.sectionTitle, { color }]}>{title}</Text> */}
        <TouchableOpacity style={styles.titleContainer}>
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
    const carouselItems = [
        {
            title: "The Anatomy of Painting",
            image: require('../../assets/images/room3.jpg'), // replace with your image
        },
        {
            title: "The Anatomy of Painting",
            image: require('../../assets/images/room3.jpg'), // replace with your image
        },
        {
            title: "The Anatomy of Painting",
            image: require('../../assets/images/room3.jpg'), // replace with your image
        },
        // Add more items
    ];
    const navigation = useRouter();
    const artists = [
        { name: 'Jenny Saville', image: require('../../assets/images/room3.jpg'), desciption: 'The art on display is multidisciplinary and includes paintings, sculptures, and installations. The programs are dedicated to meeting the needs of the local community, focusing on connecting artists to resources, support, and other artists. The Factory is making a name for itself while executing its vision of collaboration, learning, and co-creating the emerging artistic scene in Vietnam.' },
        { name: 'Jenny Doe', image: require('../../assets/images/room3.jpg'), description: 'The art on display is multidisciplinary and includes paintings, sculptures, and installations. The programs are dedicated to meeting the needs of the local community, focusing on connecting artists to resources, support, and other artists. The Factory is making a name for itself while executing its vision of collaboration, learning, and co-creating the emerging artistic scene in Vietnam.' },
    ];

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
                            imageUrl={item.image}
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

                <Section title="Artist">
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
                                <Image source={item.image} style={styles.artistImage} />
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Section>

                <Section title="Museums & Galleries" color="#f0932b">
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

                <Section title="Genres">
                    <FlatList
                        horizontal
                        data={genres}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <ImageCard
                                title={item.name}
                                imageUrl={item.image}
                                cardStyle={styles.genreCard}
                                onPress={() => console.log('Pressed', item.name)}
                            />
                        )}
                    />
                </Section>

                <Section title="Collections" style={{
                    marginBottom: 30
                }} >
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
