// ProductDetailScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const productData = {
    id: 1,
    title: "Tomb of a Suicide",
    medium: "oil on canvas",
    size: "212 × 142 cm",
    artist: "Wilhelm Kotarbiński",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Wilhelm_Kotarbinski_-_Tomb_of_a_Suicide.jpg",
    dateTag: "TODAY",
    likes: 210,
    description: `The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci.
  Considered an archetypal masterpiece of the Italian Renaissance, it has been described
  as “the best known, the most visited, the most written about, the most sung about,
  the most parodied work of art in the world.”`,
};
const ProductDetailScreen = () => {
    return (
        <View style={styles.container}>
            {/* Ảnh sản phẩm */}
            <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }}
                style={styles.image}
                resizeMode="cover"
            />

            {/* Nút Back và Share */}
            <View style={styles.headerIcons}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="share-2" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Nội dung chi tiết */}
            <View style={styles.detailContainer}>
                {/* Tag + Icon yêu thích */}
                <View style={styles.topRow}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>TODAY</Text>
                    </View>
                    <View style={styles.rightIcons}>
                        <View style={styles.iconBox}>
                            <Ionicons name="heart-outline" size={18} color="#000" />
                            <Text style={styles.iconText}>210</Text>
                        </View>
                        <TouchableOpacity>
                            <Feather name="share-2" size={18} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tiêu đề và mô tả ngắn */}
                <Text style={styles.title}>Tomb of a Suicide</Text>
                <Text style={styles.medium}>Oil on canvas | 212 × 142 cm</Text>

                {/* Tác giả */}
                <View style={styles.authorContainer}>
                    <Text style={styles.author}>Author: Wilhelm Kotarbiński</Text>
                </View>

                {/* Mô tả dài */}
                <Text style={styles.description} numberOfLines={4} ellipsizeMode="tail">
                    The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci.
                    Considered an archetypal masterpiece of the Italian Renaissance, it has been described
                    as “the best known, the most visited, the most written about, the most sung about,
                    the most parodied work of art in the world.”
                </Text>
            </View>
        </View>
    );
};

export default ProductDetailScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
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
});
