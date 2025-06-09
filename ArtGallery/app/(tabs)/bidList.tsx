import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import axios from 'axios';
import { API_BASE_URL } from '../services/api';


const screenWidth = Dimensions.get('window').width;
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

export interface BidProps {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    endBidDate: string;
    authorName: string;
    price: number;
    participants: number;
    countLike: number;
    genreName: string;
}




const BidList = () => {
    const [timeLefts, setTimeLefts] = useState<{ [key: string]: any }>({});
    const [bids, setBids] = useState<BidProps[]>([]);
    useEffect(() => {
        const fetchBids = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/Artwork/getBidding`);
                setBids(res.data);
                console.log(res.data);
            } catch (error) {
                console.log('Failed to load artworks', error);
            }
        };
        fetchBids();
    }, []);

    useEffect(() => {
        const updateCountdowns = () => {
            const updated = bids.reduce((acc, bid) => {
                acc[bid.id] = calculateTimeLeft(new Date(bid.endBidDate));
                return acc;
            }, {} as any);
            setTimeLefts(updated);

        };

        updateCountdowns();
        const timer = setInterval(updateCountdowns, 1000);

        return () => clearInterval(timer);
    }, [bids]);

    const renderArtworkItem = ({ item }: { item: BidProps }) => {
        const time = timeLefts[item.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };

        return (
            <View style={styles.card}>
                <Image source={images[item.imageUrl]} style={styles.artImage} resizeMode="cover" />

                <View style={styles.countdown}>
                    <Text style={styles.countText}>{time.days}{"\n"}Days</Text>
                    <Text style={styles.countText}>{time.hours}{"\n"}Hours</Text>
                    <Text style={styles.countText}>{time.minutes}{"\n"}Mins</Text>
                    <Text style={styles.countText}>{time.seconds}{"\n"}Secs</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.artTitle}>{item.title}</Text>
                    <Text>Artist: {item.authorName}</Text>
                    <Text>Current bid: ${formatBid(item.price)}</Text>
                    <Text>Participants: {item.participants}</Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Link href="/bidDetail">
                        <Text style={styles.buttonText}>Bidding Start</Text>
                    </Link>

                </TouchableOpacity>
            </View>
        )
    };
    return (
        <SafeAreaView edges={["top"]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Auction Room</Text>
                <Feather name="bell" size={20} color="#f28c28" />
            </View>

            {/* Tabs */}
            {/* <View style={styles.tabs}>
                <View style={styles.tabItem}>
                    <Ionicons name="hammer-outline" size={20} color="#f28c28" />
                    <Text style={styles.tabText}>Bid List</Text>
                </View>
                <View style={styles.tabItem}>
                    <Ionicons name="heart-outline" size={20} color="#f28c28" />
                    <Text style={styles.tabText}>Following</Text>
                </View>
            </View> */}

            {/* List */}
            <FlatList
                data={bids}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ padding: 12 }}
                renderItem={renderArtworkItem}
                style={{ marginBottom: 25 }}
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
export default BidList;

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
});
