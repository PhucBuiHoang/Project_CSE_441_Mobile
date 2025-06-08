// ProductDetailScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const productData = {
    id: 1,
    title: "Tomb of a Suicide",
    medium: "oil on canvas",
    size: "212 × 142 cm",
    artist: "Wilhelm Kotarbiński",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    dateTag: "TODAY",
    likes: 210,
    description: `Japan’s art world experienced a profound transformation from the mid-19th to early 20th century, as traditional aesthetics encountered a wave of European artistic philosophies and techniques. This period of tension and innovation provided the backdrop for the career of Kyoto-based artist Takeuchi Seihō. Trained in the Shijō school of painting, Seihō expanded his artistic vocabulary by drawing from a range of styles—including the Kano school, bunjinga (literati painting), and European realism. His pursuit of new modes of expression led to the development of a characteristic style that helped spark a revolution in the Kyoto art scene.One of the most striking values of Takeuchi Seihō’s paintings is the dynamic vitality of his animal subjects. He had an extraordinary ability to capture fleeting moments, giving the impression that his creatures might leap, flutter, or scamper off the page at any moment. He was a great observer of nature. As Seihō once explained, “I don’t simply look at a static image of animals. I watch them over time, noting every subtle change in posture, texture, and movement to truly understand their unique characteristics.”Beautiful, aren't they?`,
};
const moreArticles = [
    {
        id: 1,
        title: "QUIZ: Are You a Japanese Art Lover?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        author: "KATERINA PAPOULIOU",
        date: "MARCH 22",
    },
    {
        id: 2,
        title: "10 Incredible Ukiyo-e You Need to See",
        imageUrl: "https://cdn-zbiory.mnk.pl/upload/multimedia/56/e7/56e7871948a825ab8f200b1d3228aa65.jpg",
        author: "JOANNA MUZZI",
        date: "APRIL 10",
    },
];
const ProductDetailScreen = () => {
    return (
        <SafeAreaView edges={["top"]}>
            {/* <SafeAreaView edges={["bottom"]}> */}
            <ScrollView >
                {/* Ảnh sản phẩm */}
                <Image
                    source={{ uri: productData.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Nút Back và Share */}
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Link href={"/(tabs)"}>
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="heart" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Nội dung chi tiết */}
                <View style={styles.detailContainer}>
                    {/* Tag + Icon yêu thích */}
                    <View style={styles.topRow}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>{productData.dateTag}</Text>
                        </View>
                        <View style={styles.rightIcons}>
                            <View style={styles.iconBox}>
                                <Ionicons name="heart-outline" size={18} color="#000" />
                                <Text style={styles.iconText}>{productData.likes}</Text>
                            </View>
                            <TouchableOpacity>
                                <Feather name="share-2" size={18} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Tiêu đề và mô tả ngắn */}
                    <Text style={styles.title}>{productData.title}</Text>
                    <Text style={styles.medium}>{productData.medium}</Text>

                    {/* Tác giả */}
                    <View style={styles.authorContainer}>
                        <Text style={styles.author}>{productData.artist}</Text>
                    </View>

                    {/* Mô tả dài */}
                    <Text style={styles.description} ellipsizeMode="tail">
                        {productData.description}
                    </Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text
                        style={{
                            fontSize: 24,
                            color: '#f28c28',
                            fontWeight: 'bold',
                            marginBottom: 10,
                        }} >
                        Check out more</Text>
                    <FlatList
                        horizontal
                        data={moreArticles}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.card}>
                                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                                <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
                                <Text style={styles.meta}>
                                    <Text style={styles.author}>{item.author}</Text> • {item.date}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductDetailScreen;
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
        fontSize: 12,
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
});
