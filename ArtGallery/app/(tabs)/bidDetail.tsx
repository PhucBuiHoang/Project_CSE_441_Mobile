// ProductDetailScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../services/api';
import { images } from '../services/images';

// const artworkItem = {
//     id: 1,
//     title: "Tomb of a Suicide",
//     medium: "oil on canvas",
//     size: "212 × 142 cm",
//     artist: "Wilhelm Kotarbiński",
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
//     dateTag: "TODAY",
//     likes: 210,
//     description: `Japan’s art world experienced a profound transformation from the mid-19th to early 20th century, as traditional aesthetics encountered a wave of European artistic philosophies and techniques. This period of tension and innovation provided the backdrop for the career of Kyoto-based artist Takeuchi Seihō. Trained in the Shijō school of painting, Seihō expanded his artistic vocabulary by drawing from a range of styles—including the Kano school, bunjinga (literati painting), and European realism. His pursuit of new modes of expression led to the development of a characteristic style that helped spark a revolution in the Kyoto art scene.One of the most striking values of Takeuchi Seihō’s paintings is the dynamic vitality of his animal subjects. He had an extraordinary ability to capture fleeting moments, giving the impression that his creatures might leap, flutter, or scamper off the page at any moment. He was a great observer of nature. As Seihō once explained, “I don’t simply look at a static image of animals. I watch them over time, noting every subtle change in posture, texture, and movement to truly understand their unique characteristics.”Beautiful, aren't they?`,
//     price: 120000,
//     endBidDate: "2025-06-10",
// };


interface BidProps {
    id: number;
    title: string;
    description: string;
    imageURL: string;
    endBidDate: string;
    authorName: string;
    price: number;
    participants: number;

    countLike: number;
    genreName: string;
}



const BidDetailScreen = () => {
    const navigation = useRouter();
    const params = useLocalSearchParams();
    const [bid, setBid] = useState<BidProps>(params);
    const [originPrice, setOriginPrice] = useState<number>(params.price);
    const [users, setUsers] = useState([]);
    const handleBidNow = async () => {
        let bidOkay = false;
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Authentication Error', 'Please login to place a bid.');
                navigation.push('/signIn');
            }

            const bidDto = {
                id: bid.id,
                price: originPrice
            };

            const response = await axios.post(`${API_BASE_URL}/Bid/bid`, bidDto, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });


            setBid((prev) => ({ ...prev, price: originPrice }));

            bidOkay = true;




            Alert.alert('Success', 'Your bid has been placed!');
            // Optional: refresh or navigate
        } catch (error: any) {
            console.log('Error placing bid:', error);
            Alert.alert('Bid Failed', error.response?.data?.message || 'Something went wrong.');
        }

        if (bidOkay) {
            try {
                const res = await axios.get(`http://10.70.173.140:5266/users/${bid.id}`);
                setUsers(res.data);

            } catch (error) {
                console.log('Failed to load user bidding', error);
            }
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`http://10.70.173.140:5266/users/${bid.id}`);
                setUsers(res.data);

            } catch (error) {
                console.log('Failed to load user bidding', error);
            }
        };
        fetchUsers();
    }, []);

    const [timeLefts, setTimeLefts] = useState<{ [key: string]: any }>({});
    const time = timeLefts[bid.endBidDate] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
    useEffect(() => {
        const updateCountdowns = () => {
            const updated = {
                [bid.endBidDate]: calculateTimeLeft(new Date(bid.endBidDate))
            };
            setTimeLefts(updated);
        };

        updateCountdowns();
        const timer = setInterval(updateCountdowns, 1000);

        return () => clearInterval(timer);
    }, []);
    const formatBid = (num: number) => {
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <SafeAreaView edges={["top"]}>
            {/* <SafeAreaView edges={["bottom"]}> */}
            <ScrollView >
                <View>
                    <Image
                        source={images[params.imageUrl]}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                {/* Nút Back và Share */}
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Nội dung chi tiết */}
                <View style={styles.detailContainer}>
                    <View style={styles.countdown}>
                        <Text style={styles.countText}>{time.days}{"\n"}Days</Text>
                        <Text style={styles.countText}>{time.hours}{"\n"}Hours</Text>
                        <Text style={styles.countText}>{time.minutes}{"\n"}Mins</Text>
                        <Text style={styles.countText}>{time.seconds}{"\n"}Secs</Text>
                    </View>
                    {/* Tag + Icon yêu thích */}
                    <View style={styles.topRow}>
                        <View>
                            <Text style={styles.title}>{params.title}</Text>
                            {/* <Text style={styles.tagText}>{artworkItem.dateTag}</Text> */}
                        </View>
                        <View style={styles.rightIcons}>
                            <View style={styles.iconBox}>
                                <Ionicons name="heart-outline" size={20} color="#000" />
                                <Text style={styles.iconText}>{bid.countLike}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: 300, fontSize: 20 }}>{params.id} Artist:</Text> {bid.authorName}</Text>
                        <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: 300, fontSize: 20 }}>Current bid:</Text> ${bid.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                        <Text style={{ fontSize: 18 }}>
                            <Text style={{ fontWeight: '300', fontSize: 20 }}>Ending:</Text>{" "}
                            {new Date(bid.endBidDate).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </Text>
                    </View>
                    {/* <View style={styles.authorContainer}>
                        <Text style={styles.author}>{artworkItem.artist}</Text>
                    </View> */}

                    <View style={styles.bidRow}>
                        <TouchableOpacity
                            onPress={() => setOriginPrice(prev => (Math.max(prev - 500, bid.price)))}
                            style={styles.changeBidBtn}>
                            <Text style={styles.changeBidText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.bidInput}
                            value={`$${formatBid(originPrice)}`}
                            onChangeText={(text) => {
                                const cleaned = text.replace(/[^0-9.]/g, ''); // remove non-numeric characters
                                const parsed = parseFloat(cleaned);
                                if (!isNaN(parsed)) {
                                    setOriginPrice(parsed);
                                } else {
                                    // either do nothing or reset the price to 0 or ''
                                    setOriginPrice(0);
                                }
                            }}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            onPress={() => setOriginPrice((prev) => parseInt(prev) + 1000)}
                            style={styles.changeBidBtn}>
                            <Text style={styles.changeBidText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <TouchableOpacity style={styles.bidButton} onPress={handleBidNow}>
                            <Text style={styles.bidButtonText}>Bid Now</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text
                            style={{
                                fontSize: 24,
                                color: '#f28c28',
                                fontWeight: 'bold',
                                marginVertical: 16,
                            }} >
                            Auction Log</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={users}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.logItem}>
                                    <Image source={images['AbstractReflections']} style={styles.avatar} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.name}>{item.username}</Text>
                                        <Text style={styles.amount}>${item.price}</Text>
                                    </View>
                                    <Text style={styles.time}>{new Date(item.bidDate).toLocaleDateString('en-GB')}</Text>
                                </View>
                            )}
                            initialNumToRender={5}
                            windowSize={5}
                        />
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
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
export default BidDetailScreen;
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 400,
    },
    headerIcons: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -40,
        padding: 20,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tag: {
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    tagText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginRight: 8,
    },
    iconText: {
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        color: '#f28c28',
        fontWeight: 'bold',
        marginTop: 10,
    },
    medium: {
        color: '#777',
        marginTop: 4,
        fontSize: 13,
    },
    authorContainer: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 14,
    },
    author: {
        fontWeight: '600',
        color: '#333',
    },
    description: {
        marginTop: 14,
        color: '#555',
        lineHeight: 20,
    },


    // 
    // title: {
    //     fontSize: 20,
    //     fontWeight: '800',
    //     marginBottom: 16,
    // },
    card: {
        marginRight: 8,
        // marginLeft: 5,
        width: 300,
    },
    // image: {
    //     width: '100%',
    //     height: 120,
    //     borderRadius: 12,
    //     marginBottom: 8,
    // },
    articleTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    meta: {
        fontSize: 12,
        color: '#555',
    },
    // author: {
    //     fontWeight: 'bold',
    //     color: '#D72638',
    // },
    info: {
        // paddingHorizontal: 16,
        paddingTop: 16,
        fontSize: 24,
        fontWeight: '600',
    },
    artTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 4,
    },
    bidRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    bidInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        marginHorizontal: 4,
        borderRadius: 8,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 24
    },
    changeBidBtn: {
        // backgroundColor: '#eee',
        borderWidth: 0.25,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 25,
        paddingVertical: 6,
    },
    changeBidText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    bidButton: {
        backgroundColor: '#f7941d',
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 50,
        alignItems: 'center',
    },
    bidButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    logItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        // backgroundColor: '#f7f7f7',
        borderBottomWidth: 0.25,
        padding: 10,
        borderRadius: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    name: {
        fontWeight: '600',
        fontSize: 14,
    },
    amount: {
        fontSize: 13,
        color: '#444',
    },
    time: {
        fontSize: 13,
        color: '#888',
    },
    countdown: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'relative',
        backgroundColor: '#fff',
        padding: 10,
        width: 300,
        borderRadius: 16,
        elevation: 4,
        alignSelf: 'center',
        marginTop: -45,
    },
    countText: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
    }
});
