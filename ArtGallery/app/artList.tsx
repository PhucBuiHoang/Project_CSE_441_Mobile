import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from './services/api';
import { images } from './services/images';

interface ArtProps {
    id: number;
    title: string;
    imageURL: string;
}

const App = () => {

    const [arts, setArts] = useState<ArtProps[]>([]);

    useEffect(() => {
        async function fetchingArts() {
            try {
                const response = await axios.get(`${API_BASE_URL}/Artwork`);
                setArts(response.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchingArts();
    }, []);

    const navigation = useRouter();
    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.push(
            {
                pathname: '/artworkDetail',
                params: item
            }
        )}>
            <Image source={images[item.imageUrl]} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        // <SafeAreaView edges={["top"]}>
        <SafeAreaView edges={["bottom"]}>
            <FlatList
                data={arts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        width: '100%',
        height: 220,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    title: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',
    },
});

export default App;
