import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const artistData = {
    id: '1',
    name: 'Leonardo Da Vinci',
    birthYear: 1452,
    deathYear: 1519,
    description:
        'Leonardo da Vinci was a Renaissance painter, sculptor, architect, inventor, military engineer and draftsman, the epitome of a true Renaissance man.',
    imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/c/c3/LEONARDO.JPG',
    followers: 28000,
    artworks: [
        {
            id: 'a1',
            title: 'Mona Lisa',
            image:
                'https://upload.wikimedia.org/wikipedia/commons/c/c3/LEONARDO.JPG',
        },
        {
            id: 'a2',
            title: 'The Last Supper',
            image:
                'https://upload.wikimedia.org/wikipedia/commons/c/c3/LEONARDO.JPG',
        },
    ],
};



const ArtistDetail = () => {
    return (
        <SafeAreaView edges={["bottom"]}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="#f28c28" />
                {/* <Feather name="shuffle" size={20} color="#f28c28" /> */}
            </View>
            <ScrollView>

                {/* Avatar */}
                <View style={styles.imageWrapper}>
                    <Image
                        source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/LEONARDO.JPG'
                        }}
                        style={styles.image}
                    />
                </View>

                {/* Name + Button */}
                <View style={styles.textContainer}>
                    <Text style={styles.name}>Leonardo</Text>
                    <Text style={styles.name}>Da Vinci</Text>
                    <Text style={styles.years}>1452–1519</Text>

                    <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                </View>

                {/* Description */}
                <Text style={styles.description}>
                    Leonardo da Vinci was a Renaissance painter, sculptor, architect, inventor, military engineer
                    and draftsman, the epitome of a true Renaissance man.
                </Text>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <Text style={styles.stat}>20</Text>
                    <Text style={styles.stat}>28,000</Text>
                    <Text style={styles.stat}>50</Text>
                </View>

                {/* Section Title */}
                <Text style={styles.popularTitle}>Popular Arts</Text>
                <FlatList
                    data={artistData.artworks}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.artCard}>
                            <Image source={{ uri: item.image }} style={styles.artImage} />
                            <Text style={styles.artTitle}>{item.title}</Text>
                        </View>
                    )}
                />
            </ScrollView>
            {/* Header */}

        </SafeAreaView>
    );
};

export default ArtistDetail;
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     paddingHorizontal: 20,
    // },
    container1: {
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageWrapper: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 20,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    name: {
        fontSize: 34,
        fontWeight: '600',
        color: '#f28c28',
        lineHeight: 38,
    },
    years: {
        fontSize: 16,
        color: '#f28c28',
        marginVertical: 8,
    },
    followButton: {
        backgroundColor: '#eee',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginTop: 6,
    },
    followText: {
        fontWeight: '500',
        color: '#333',
    },
    description: {
        textAlign: 'center',
        color: '#444',
        fontSize: 14,
        marginTop: 20,
        paddingHorizontal: 10,
        lineHeight: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 24,
    },
    stat: {
        fontSize: 16,
        fontWeight: '500',
        color: '#f28c28',
    },
    popularTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f28c28',
        borderTopWidth: 1,
        borderTopColor: '#f28c28',
        paddingTop: 12,
    },
    artCard: {
        marginRight: 16,
        alignItems: 'center',
    },
    artImage: {
        width: 120,
        height: 160,
        borderRadius: 12,
        marginBottom: 8,
    },
    artTitle: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
});
