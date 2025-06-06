import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockData = [
    {
        id: '1',
        title: 'Abraham and the Angels',
        artist: 'Unknown',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Abraham_and_the_Angels_MET_DT1560.jpg/800px-Abraham_and_the_Angels_MET_DT1560.jpg',
        currentBid: 0,
        endBidDate: '2025-06-11T12:00:00Z',
    },
    {
        id: '2',
        title: 'Untitled Portrait',
        artist: 'Unknown',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Big_Painting_Face.jpg/800px-Big_Painting_Face.jpg',
        currentBid: 0,
        endBidDate: '2025-06-12T08:00:00Z',
    }
];

const AuctionRoomScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Auction Room</Text>
                <Feather name="bell" size={20} color="#f28c28" />
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <View style={styles.tabItem}>
                    <Ionicons name="hammer-outline" size={20} color="#f28c28" />
                    <Text style={styles.tabText}>Bid List</Text>
                </View>
                <View style={styles.tabItem}>
                    <Ionicons name="heart-outline" size={20} color="#f28c28" />
                    <Text style={styles.tabText}>Following</Text>
                </View>
            </View>

            {/* List */}
            <FlatList
                data={mockData}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 12 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        <View style={styles.timer}>
                            <Text style={styles.timerText}>5{"\n"}Days</Text>
                            <Text style={styles.timerText}>12{"\n"}Hours</Text>
                            <Text style={styles.timerText}>30{"\n"}Mins</Text>
                            <Text style={styles.timerText}>5{"\n"}Secs</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardText}>Artist :</Text>
                            <Text style={styles.cardText}>Current bid:</Text>
                            <TouchableOpacity style={styles.bidBtn}>
                                <Text style={{ color: '#666' }}>Bidding Start</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default AuctionRoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#f28c28',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    tabItem: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 12,
        color: '#f28c28',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 180,
    },
    timer: {
        position: 'absolute',
        bottom: 12,
        left: '25%',
        backgroundColor: '#fff',
        padding: 6,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 180,
        elevation: 3,
    },
    timerText: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: '600',
    },
    cardContent: {
        padding: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 14,
        marginVertical: 2,
    },
    bidBtn: {
        backgroundColor: '#f4f4f4',
        padding: 8,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    }
});
