import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../services/api';

const avatarImage = require('../../assets/images/avt.png');

const imageMap: { [key: string]: any } = {
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
  TimelessBeautyBlackAndWhitePhotography: require('../../assets/images/TimelessBeautyBlackAndWhitePhotography.jpg'),
  UrbanEscapeVibrantCityscapeFramedPainting: require('../../assets/images/UrbanEscapeVibrantCityscapeFramedPainting.jpg'),
  WaterLiliesSeries12: require('../../assets/images/WaterLiliesSeries12.jpg'),
  WhereImaginationMeetsTheCanvas: require('../../assets/images/WhereImaginationMeetsTheCanvas.jpg'),
  WhispersOfColorsInSilentShadows: require('../../assets/images/WhispersOfColorsInSilentShadows.jpg'),
  ABrushstrokeOfSerenityInAChaoticWorld: require('../../assets/images/ABrushstrokeOfSerenityInAChaoticWorld.jpg'),
  WhereStillnessSpeaksColorsConverse: require('../../assets/images/WhereStillnessSpeaksColorsConverse.jpg'),
};

const ProfileApp = () => {
  const [fontsLoaded] = useFonts({
    'InriaSerif-Regular': require('../../assets/fonts/InriaSerif-Regular.ttf'),
  });

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token missing. Please log in again.');
      }

      const response = await axios.post(
        `${API_BASE_URL}/Auth/profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Unauthorized', 'Session expired. Please log in again.');
      } else {
        Alert.alert('Error', error.message || 'Cannot fetch profile.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!fontsLoaded || loading) return <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />;

  const renderImageItem = (item: any, index: number) => {
    const isLarge = index % 3 === 0;
    const localImage = imageMap[item.imageUrl];

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.imageContainer, isLarge ? styles.largeImage : styles.smallImage]}
        activeOpacity={0.8}
      >
        <Image
          source={localImage}
          style={styles.image}
          resizeMode="cover"
          onError={() => console.log('Image not found:', item.imageUrl)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.username}>{userData?.username || 'Profile'}</Text>
          <Ionicons name="chevron-down" size={16} color="#000" />
        </View>
        <TouchableOpacity onPress={() => router.push('/logOut')}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>

      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image source={avatarImage} style={styles.avatar} />
            <View style={styles.addButton}>
              <Link href="/editAccount">
                <Ionicons name="pencil-sharp" size={13} color="grey" />
              </Link>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <Text style={styles.displayName}>{userData?.fullName || 'User Name'}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{userData?.wishlists?.length || 0}</Text>
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

      {/* Tabs */}
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

      {/* Wishlist Image Grid */}
      <ScrollView style={styles.imageGrid} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          <View style={styles.leftColumn}>
            {userData?.wishlists?.filter((_, i) => i % 2 === 0).map(renderImageItem)}
          </View>
          <View style={styles.rightColumn}>
            {userData?.wishlists?.filter((_, i) => i % 2 === 1).map(renderImageItem)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 15,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  username: { fontSize: 18, fontWeight: '600', marginRight: 5, fontFamily: 'InriaSerif-Regular' },
  profileSection: { paddingHorizontal: 20, paddingBottom: 20 },
  profileInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { position: 'relative', marginRight: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f0f0f0' },
  addButton: {
    position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff',
    borderRadius: 12, width: 24, height: 24, justifyContent: 'center',
    alignItems: 'center', borderWidth: 2, borderColor: '#f0f0f0',
  },
  profileDetails: { flex: 1 },
  displayName: { fontSize: 22, fontWeight: '600', marginBottom: 10, fontFamily: 'InriaSerif-Regular' },
  statsContainer: { flexDirection: 'row' },
  stat: { marginRight: 30 },
  statNumber: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  statLabel: { fontSize: 14, color: '#666', textAlign: 'center' },
  tabContainer: {
    flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 15 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#000' },
  imageGrid: { flex: 1, paddingHorizontal: 10 },
  gridContainer: { flexDirection: 'row', paddingTop: 10 },
  leftColumn: { flex: 1, paddingRight: 5 },
  rightColumn: { flex: 1, paddingLeft: 5 },
  imageContainer: {
    marginBottom: 10, borderRadius: 12, overflow: 'hidden',
    backgroundColor: '#fff',
  },
  largeImage: { height: 250 },
  smallImage: { height: 120 },
  image: { width: '100%', height: '100%', backgroundColor: '#f0f0f0' },
});

export default ProfileApp;
