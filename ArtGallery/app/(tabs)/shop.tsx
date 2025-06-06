import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { red } from 'react-native-reanimated/lib/typescript/Colors';


const screenWidth = Dimensions.get('window').width;
const mockData = [
    {
        id: '1',
        title: 'Abraham and the Angels',
        artist: 'Unknown',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        currentBid: 20000,
        endBidDate: '2025-06-11T12:00:00Z',
        yourBid: 20000
    },
    {
        id: '3',
        title: 'Abraham and the Angels',
        artist: 'Unknown',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        currentBid: 20000,
        endBidDate: '2025-06-11T12:00:00Z',
        yourBid: 20000
    },
    {
        id: '4',
        title: 'Abraham and the Angels',
        artist: 'Unknown',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        currentBid: 20000,
        endBidDate: '2025-06-11T12:00:00Z',
        yourBid: 20000
    },
    {
        id: '2',
        title: 'Untitled Portrait',
        artist: 'Unknown',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        currentBid: 20000,
        endBidDate: '2025-06-12T08:00:00Z',
        yourBid: 20000
    }
];




const Shop = () => {
    const [timeLefts, setTimeLefts] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        const updateCountdowns = () => {
            const updated = mockData.reduce((acc, art) => {
                acc[art.id] = calculateTimeLeft(new Date(art.endBidDate));
                return acc;
            }, {} as any);
            setTimeLefts(updated);
        };

        updateCountdowns(); // initial run
        const timer = setInterval(updateCountdowns, 1000);

        return () => clearInterval(timer);
    }, []);

    const renderArtworkItem = ({ item }: { item: any }) => {
        const time = timeLefts[item.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return (
            <View style={styles.card}>
                <Image source={{ uri: item.imageUrl }} style={styles.artImage} resizeMode="cover" />

                <View style={styles.countdown}>
                    <Text style={styles.countText}>{time.days}{"\n"}Days</Text>
                    <Text style={styles.countText}>{time.hours}{"\n"}Hours</Text>
                    <Text style={styles.countText}>{time.minutes}{"\n"}Mins</Text>
                    <Text style={styles.countText}>{time.seconds}{"\n"}Secs</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.artTitle}>{item.title}</Text>
                    <Text>Artist: {item.artist}</Text>

                    <Text>Current bid: ${formatBid(item.currentBid)}</Text>
                    <Text>Participants: {item.participants}</Text>
                    <Text style={styles.artTitle}>Bid Submission: ${formatBid(item.yourBid)}</Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Link href="/bidDetail">
                        <Text style={styles.buttonText}>Bidding</Text>
                    </Link>

                </TouchableOpacity>
            </View>
        )
    };
    return (
        <SafeAreaView edges={["top"]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Shopping</Text>
                <Feather name="bell" size={20} color="#f28c28" />
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <Link href="/shop" asChild>
                    <TouchableOpacity style={styles.tabItem}>
                        <Ionicons
                            name="hammer-outline"
                            size={24}
                            color="#f28c28" // Active tab color
                        />
                        <Text style={[styles.tabText, styles.activeTabText]}>Bidding</Text>
                    </TouchableOpacity>
                </Link>

                <Link href="/payment" asChild>
                    <TouchableOpacity style={styles.tabItem}>
                        <Ionicons
                            name="cart-outline"
                            size={24}
                            color="#999" // Inactive color
                        />
                        <Text style={styles.tabText}>Payment</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            {/* List */}
            <FlatList
                data={mockData}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 12 }}
                renderItem={renderArtworkItem}
                style={{ marginBottom: 90 }}
            />
        </SafeAreaView>
    );
};
const formatBid = (num: number) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
function calculateTimeLeft(targetDate: Date) {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    const days = Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0);
    const hours = Math.max(Math.floor((distance / (1000 * 60 * 60)) % 24), 0);
    const minutes = Math.max(Math.floor((distance / 1000 / 60) % 60), 0);
    const seconds = Math.max(Math.floor((distance / 1000) % 60), 0);

    return { days, hours, minutes, seconds };
}
export default Shop;

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
        color: "#999",
        marginTop: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
        paddingVertical: 20,
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
    },
    countdown: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'relative',
        backgroundColor: '#fff',
        padding: 8,
        width: 300,
        borderRadius: 16,
        elevation: 4,
        alignSelf: 'center',
        marginTop: -30,
    },
    countText: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
    },
    info: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    artTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    button: {
        marginTop: 12,
        marginHorizontal: 16,
        backgroundColor: '#f7941d',
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -10,
        marginBottom: 24,
    },
    artImage: {
        width: screenWidth * 0.85,
        height: 240,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignSelf: 'center',

    },
    activeTabText: {
        color: '#f28c28',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
});
