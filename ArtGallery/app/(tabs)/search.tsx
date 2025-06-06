import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    const galleryItems = [
        { id: '1', imageUrl: 'https://cdn-zbiory.mnk.pl/upload/multimedia/56/e7/56e7871948a825ab8f200b1d3228aa65.jpg', title: 'Masterpieces' },
        { id: '2', imageUrl: 'https://cdn-zbiory.mnk.pl/upload/multimedia/56/e7/56e7871948a825ab8f200b1d3228aa65.jpg', title: 'Artist' },
        { id: '3', imageUrl: 'https://cdn-zbiory.mnk.pl/upload/multimedia/56/e7/56e7871948a825ab8f200b1d3228aa65.jpg', title: 'Museums' },
        { id: '4', imageUrl: 'https://cdn-zbiory.mnk.pl/upload/multimedia/56/e7/56e7871948a825ab8f200b1d3228aa65.jpg', title: 'Genres' },
        { id: '5', imageUrl: 'https://cdn-zbiory.mnk.pl/upload/multimedia/56/e7/56e7871948a825ab8f200b1d3228aa65.jpg', title: 'Collections' },
        { id: '6', imageUrl: 'https://cdn-zbiory.mnk.pl/upload/multimedia/56/e7/56e7871948a825ab8f200b1d3228aa65.jpg', title: 'Exhibitions' },
    ];
    const SearchCard = ({ title, imageUrl }) => {
        const source = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;
        return (
            <TouchableOpacity style={styles.card}>
                <ImageBackground source={source} style={styles.genreImage} imageStyle={styles.imageStyle}>
                    <Text style={styles.genreLabel}>{title}</Text>
                </ImageBackground>
            </TouchableOpacity >
        );
    };
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Ionicons name="menu" size={28} color="#f7941d" />
                <View style={styles.headerIcons}>
                    <Ionicons name="cart-outline" size={24} color="#f7941d" style={styles.icon} />
                    <Ionicons name="notifications-outline" size={24} color="#f7941d" />
                </View>
            </View>

            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search artwork..."
                />
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="#f7941d" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.gridContainer}>
                    {galleryItems.map(item => (
                        <SearchCard
                            key={item.id}
                            imageUrl={item.imageUrl}
                            title={item.title}
                        />
                    ))}
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // backgroundColor: '#fff',
    },
    header: {
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
    searchBar: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        marginHorizontal: 8,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Distribute items evenly
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
    card: {
        width: '48%',
        height: 200,
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },

});