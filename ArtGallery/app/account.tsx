import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const ProfileApp = () => {
    // Sử dụng require() để load ảnh local - Thay đổi đường dẫn theo cấu trúc folder của bạn
    const profileImage = require('../assets/images/avt.png');
    const paintingImage1 = require('../assets/images/loginBackground.png');
    const decorativeImage1 = require('../assets/images/loginBackground.png');
    const paintingImage2 = require('../assets/images/loginBackground.png');
    const decorativeImage2 = require('../assets/images/loginBackground.png');
    const decorativeImage3 = require('../assets/images/loginBackground.png');
    const decorativeImage4 = require('../assets/images/loginBackground.png');

    const imageData = [
        { id: 1, source: paintingImage1, type: 'large' },
        { id: 2, source: decorativeImage1, type: 'small' },
        { id: 3, source: paintingImage2, type: 'large' },
        { id: 4, source: decorativeImage2, type: 'small' },
        { id: 5, source: decorativeImage3, type: 'small' },
        { id: 6, source: decorativeImage4, type: 'small' },
    ];

    const [fontsLoaded] = useFonts({
            'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
        });
    
        if (!fontsLoaded) return null;
    const renderImageItem = (item, index) => {
        const isLarge = item.type === 'large';
        return (
            <TouchableOpacity
                key={item.id}
                style={[
                    styles.imageContainer,
                    isLarge ? styles.largeImage : styles.smallImage,
                ]}
                activeOpacity={0.8}
            >
                <Image source={item.source} style={styles.image} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.username}>_hoang.vy_</Text>
                    <Ionicons name="chevron-down" size={16} color="#000" />
                </View>
                <TouchableOpacity>
                    <Ionicons name="settings-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <View style={styles.profileInfo}>
                    <View style={styles.avatarContainer}>
                        <Image source={profileImage} style={styles.avatar} />
                        <View style={styles.addButton}>
                            <Ionicons name="pencil-sharp" size={13} color="grey" />
                        </View>
                    </View>

                    <View style={styles.profileDetails}>
                        <Text style={styles.displayName}>Hoàng Vy</Text>
                        <View style={styles.statsContainer}>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>50</Text>
                                <Text style={styles.statLabel}>favorites</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>50</Text>
                                <Text style={styles.statLabel}>following</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Ionicons name="bookmark-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Ionicons name="hammer-outline" size={24} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Ionicons name="calendar-outline" size={24} color="#999" />
                </TouchableOpacity>
            </View>

            {/* Image Grid */}
            <ScrollView style={styles.imageGrid} showsVerticalScrollIndicator={false}>
                <View style={styles.gridContainer}>
                    <View style={styles.leftColumn}>
                        {imageData
                            .filter((_, index) => index % 2 === 0)
                            .map((item, index) => renderImageItem(item, index))}
                    </View>
                    <View style={styles.rightColumn}>
                        {imageData
                            .filter((_, index) => index % 2 === 1)
                            .map((item, index) => renderImageItem(item, index))}
                    </View>
                </View>
            </ScrollView>

            
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: 18,
        fontWeight: '600',
        marginRight: 5,
        fontFamily: 'InriaSerif-Regular',
    },
    profileSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#f0f0f0',
    },
    profileDetails: {
        flex: 1,
    },
    displayName: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
        fontFamily:'InriaSerif-Regular',
    },
    statsContainer: {
        flexDirection: 'row',
    },
    stat: {
        marginRight: 30,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingHorizontal: 20,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    imageGrid: {
        flex: 1,
        paddingHorizontal: 10,
    },
    gridContainer: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    leftColumn: {
        flex: 1,
        paddingRight: 5,
    },
    rightColumn: {
        flex: 1,
        paddingLeft: 5,
    },
    imageContainer: {
        marginBottom: 10,
        borderRadius: 12,
        overflow: 'hidden',
    },
    largeImage: {
        height: 250,
    },
    smallImage: {
        height: 120,
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
    bottomNav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    activeNavItem: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
});

export default ProfileApp;