// ProductDetailScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../services/api';

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
const auctionLog = [
    { id: '1', name: 'Phan Thao', time: '22:00', amount: '$2000.00', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '2', name: 'Phan Thao', time: '22:00', amount: '$2000.00', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '3', name: 'Phan Thao', time: '22:00', amount: '$2000.00', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '4', name: 'Phan Thao', time: '22:00', amount: '$2000.00', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '5', name: 'Phan Thao', time: '22:00', amount: '$2000.00', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '6', name: 'Phan Thao', time: '22:00', amount: '$2000.00', avatar: 'https://i.pravatar.cc/100?img=1' },
];


const BidDetailScreen = () => {
    const params = useLocalSearchParams();
    console.log(params);
    const price = parseFloat(params.price as string);
    // const { artworkItem, setArtwork } = useState([]);
    const { users, setUsers } = useState([]);
    useEffect(() => {
        // const fetchArtwork = async () => {
        //     try {
        //         const res = await axios.get(`${API_BASE_URL}/Artwork/${params}`);
        //         setArtwork(res.data);
        //         console.log(res.data);
        //     } catch (error) {
        //         console.log('Failed to load bid artwork', error);
        //     }
        // };
        // fetchArtwork();
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/users/${params.id}`);
                setUsers(res.data);
                console.log(res.data);
            } catch (error) {
                console.log('Failed to load user bidding', error);
            }
        };
        fetchUsers();
    }, []);
    const [bid, setBid] = useState(params.price);
    const [timeLefts, setTimeLefts] = useState<{ [key: string]: any }>({});
    const time = timeLefts[params.endBidDate] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
    useEffect(() => {
        const updateCountdowns = () => {
            const updated = {
                [params.endBidDate]: calculateTimeLeft(new Date(params.endBidDate))
            };
            setTimeLefts(updated);
        };

        updateCountdowns(); // chạy lần đầu
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
                        source={{ uri: params.imageUrl }}
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
                                <Text style={styles.iconText}>{params.likes}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: 300, fontSize: 20 }}>Artist:</Text> {params.authorName}</Text>
                        <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: 300, fontSize: 20 }}>Current bid:</Text> ${params.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                        <Text style={{ fontSize: 18 }}>
                            <Text style={{ fontWeight: '300', fontSize: 20 }}>Ending:</Text>{" "}
                            {new Date(params.endBidDate).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </Text>
                    </View>
                    {/* <View style={styles.authorContainer}>
                        <Text style={styles.author}>{artworkItem.artist}</Text>
                    </View> */}

                    <View style={styles.bidRow}>
                        <TouchableOpacity
                            onPress={() => setBid(prev => Math.max(prev - 100, params.price))}
                            style={styles.changeBidBtn}>
                            <Text style={styles.changeBidText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.bidInput}
                            value={`$${formatBid(bid)}`}
                            onChangeText={(text) => {
                                const cleaned = text.replace(/[^0-9.]/g, ''); // loại bỏ ký tự không hợp lệ
                                const parsed = parseFloat(cleaned);
                                if (!isNaN(parsed)) {
                                    setBid(parsed);
                                } else {
                                    setBid(0); // nếu rỗng
                                }
                            }}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            onPress={() => setBid(prev => prev + 100)}
                            style={styles.changeBidBtn}>
                            <Text style={styles.changeBidText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <TouchableOpacity style={styles.bidButton}>
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
                            data={auctionLog}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.logItem}>
                                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.amount}>{item.amount}</Text>
                                    </View>
                                    <Text style={styles.time}>{item.time}</Text>
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
