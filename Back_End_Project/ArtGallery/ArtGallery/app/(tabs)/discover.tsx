import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

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
        // Add more items
    ];

    const artists = [
        { name: 'Jenny Saville', image: require('../../assets/images/room3.jpg') },
        { name: 'Jenny Doe', image: require('../../assets/images/room3.jpg') },
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
                {/* 
            <Carousel
                data={carouselItems}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title}</Text>
                    </View>
                )}
                sliderWidth={300}
                itemWidth={250}
            /> */}


                <Section title="Artist">
                    <FlatList
                        horizontal
                        data={artists}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.artistCard}>
                                <Image source={item.image} style={styles.artistImage} />
                                <Text>{item.name}</Text>
                            </View>
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
});

export default DiscoverScreen;
