import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../services/api';

const screenWidth = Dimensions.get('window').width;
// const imageMap = {
//   StarryNightOvertheRhone: require('../../assets/images/Starry Night Over the Rhone.jpg'),
//   LesDemoisellesdAvignon: require('../../assets/images/Les Demoiselles dAvignon.jpg'),
//   TheLastSuppeStudy: require('../../assets/images/The Last Supper Study.jpg'),
//   WaterLiliesSeries: require('../../assets/images/Water Lilies Series.jpg'),
// };

// const artworks = [
//   {
//     id: '1',
//     title: 'Abraham and the Angels',
//     artist: 'Giovanni Andrea de Ferrari',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
//     currentBid: '$5000',
//     participants: 12,
//     endDate: '2025-06-08',
//   },
//   {
//     id: '2',
//     title: 'The Starry Night',
//     artist: 'Vincent van Gogh',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
//     currentBid: '$8000',
//     participants: 19,
//     endDate: '2025-06-07',
//   },
//   {
//     id: '3',
//     title: 'Mona Lisa',
//     artist: 'Leonardo da Vinci',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
//     currentBid: '$12000',
//     participants: 25,
//     endDate: '2025-06-10T15:00:00Z',
//   },
// ];

const dailyArtworks = [
  {
    id: '1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  },
  {
    id: '2',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  },
  {
    id: '3',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  },
  {
    id: '4',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  },
  {
    id: '5',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  },
  {
    id: '6',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  },
];

const upcomingExhibitions = [
  {
    id: '1',
    title: 'La Belle Ferronniere',
    artist: 'Leonardo da Vinci',
    image:
      'https://cdn-zbiory.mnk.pl/upload/multimedia/34/fe/34fe713c5645dfbe094204bdacd5e918.jpg',
  },
  {
    id: '2',
    title: 'Old Man Seated',
    artist: 'Rembrandt',
    image:
      'https://cdn-zbiory.mnk.pl/upload/multimedia/f5/02/f502cbc2a46a45d56dd28abd30d794ac.jpg',
  },
  {
    id: '3',
    title: 'La Belle Ferronniere',
    artist: 'Leonardo da Vinci',
    image:
      'https://cdn-zbiory.mnk.pl/upload/multimedia/56/e7/56e7871948a825ab8f200b1d3228aa65.jpg',
  },
];

const newsData = [
  {
    id: '1',
    title: 'Today is Sunday',
    dicsription: 'The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. . The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance...',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  },
  {
    id: '2',
    title: 'Today is Moonday',
    dicsription: 'The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Starry Night is one of Dutch artist Vincent van Gogh\'s most famous works. Painted in June 1889, it reflects his view from the asylum...',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  },
  {
    id: '3',
    title: 'Today is Moonday',
    dicsription: 'The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Starry Night is one of Dutch artist Vincent van Gogh\'s most famous works. Painted in June 1889, it reflects his view from the asylum...',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  },
];

const HomeScreen = () => {
  const navigation = useRouter();
  const [top5Bidd, setTop5Bids] = useState([]);
  const [top6, setTop6] = useState([]);
  const [upcomingArts, setUpcomingArts] = useState([]);
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/Artwork/get5Bidding`);
        setTop5Bids(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log('Failed to load artworks', error);
      }
    };
    fetchArtworks();
    const fetchTop6Artworks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/Artwork/top6`);
        setTop6(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log('Failed to load top 6 artworks', error);
      }
    };
    fetchTop6Artworks();
    const fetchUpcomingArtworks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/Artwork/getBiddingUpcoming`);
        setUpcomingArts(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log('Failed to load top 6 artworks', error);
      }
    };
    fetchUpcomingArtworks();
  }, []);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);

  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // 
  const [timeLefts, setTimeLefts] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const updateCountdowns = () => {
      const updated = top5Bidd.reduce((acc, art) => {
        acc[art.id] = calculateTimeLeft(new Date(art.endBidDate));
        return acc;
      }, {} as any);
      setTimeLefts(updated);
    };

    updateCountdowns(); // initial run
    const timer = setInterval(updateCountdowns, 1000);

    return () => clearInterval(timer);
  }, [top5Bidd]);

  useEffect(() => {
    if (top5Bidd.length === 0) return; // ✅ only run when artworks are ready

    const slideInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % top5Bidd.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [currentIndex, top5Bidd]);
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
  const renderArtworkItem = ({ item }: { item: any }) => {
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
          <Text>Current bid: {item.price}</Text>
          <Text>Participants: {item.participants}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.push(
          {
            pathname: '/bidDetail',
            params: item
          }
        )}>
          {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push({
              pathname: '/bidDetail',
              params: {
                imageUrl: item.imageUrl,
                title: item.title,
                authorName: item.authorName,
                price: item.price.toString(),  // numbers must be stringified
                endBidDate: item.endBidDate,
                // likes: item.likes.toString()
              }
            });
          }}
        > */}
          <Text style={styles.buttonText}>Bidding Start</Text>

        </TouchableOpacity>
      </View >
    )
  };

  return (
    <SafeAreaView edges={["top"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Ionicons name="menu" size={28} color="#f7941d" />
          <View style={styles.headerIcons}>
            <Ionicons name="cart-outline" size={24} color="#f7941d" style={styles.icon} />
            <Ionicons name="notifications-outline" size={24} color="#f7941d" />
          </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search artwork..."
          />
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#f7941d" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.header} onPress={() => navigation.push('/bidList')}>
          <Text style={styles.hotBidsTitle}>Hot Bids</Text>
          <View style={styles.headerIcons}>
            <AntDesign name="right" size={24} color="#C2C2C2" style={{ marginTop: 5 }} />
          </View>
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={top5Bidd}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderArtworkItem}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / (screenWidth * 0.85 + 20)
            );
            setCurrentIndex(index);
          }}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          snapToAlignment="center"
          decelerationRate="fast"
        />

        <View style={styles.paginationContainer}>
          {top5Bidd.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.header} onPress={() => navigation.push('/artList')}>
          {/* <View style={styles.header}> */}
          <Text style={styles.dailyArtTitle}>Top Favorite Artworks</Text>
          <View style={styles.headerIcons}>
            <AntDesign name="right" size={24} color="#C2C2C2" style={{ marginTop: 5 }} />
          </View>
          {/* </View> */}
        </TouchableOpacity>

        <View style={styles.dailyArtContainer}>
          {top6.map((art) => (
            // <Image
            //   key={art.id}
            //   source={images[art.imageUrl]}
            //   style={styles.dailyArtImage}
            //   resizeMode="cover"
            // />
            <TouchableOpacity key={art.id} style={styles.favoriteArt} onPress={() => navigation.push(
              {
                pathname: '/artworkDetail',
                params: art
              }
            )}>
              <ImageBackground source={images[art.imageUrl]} style={styles.dailyArtImage} resizeMode="cover">
              </ImageBackground>
            </TouchableOpacity >
          ))}

        </View>


        <View style={styles.header}>
          <Text style={styles.upcomingTitle}>Upcoming Exhibitions</Text>
          <View style={styles.headerIcons}>
            <AntDesign name="right" size={24} color="#C2C2C2" style={{ marginTop: 5 }} />
          </View>
        </View>

        <FlatList
          data={upcomingArts}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          renderItem={({ item }) => (
            <View style={styles.exhibitionCard}>
              <Image source={images[item.imageUrl]} style={styles.exhibitionImage} resizeMode="cover" />
              <Text style={styles.exhibitionTitle}>{item.title}</Text>
              <Text style={styles.exhibitionArtist}>{item.authorName}</Text>
            </View>
          )}
        />

        <Text style={styles.newsTitle}>News</Text>
        {newsData.map((item) => (
          <View key={item.id} style={styles.newsItem}>
            <Image source={{ uri: item.image }} style={styles.newsImage} resizeMode="cover" />
            <View style={{ flex: 1 }} >
              <Text
                style={styles.artTitle}>
                {item.title}
              </Text>
              <Text
                style={styles.newsText}
                numberOfLines={4}
                ellipsizeMode="tail">
                {item.dicsription}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView >

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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 12,
  },
  searchBar: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  hotBidsTitle: {
    fontSize: 22,
    color: '#f7941d',
    marginTop: 24,
    marginBottom: 12,
    fontWeight: '600',
  },
  card: {
    width: screenWidth * 0.85,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    paddingBottom: 16,
  },
  artImage: {
    width: screenWidth * 0.85,
    height: 240,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignSelf: 'center',

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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#f7941d',
  },
  dailyArtTitle: {
    fontSize: 22,
    color: '#f7941d',
    marginBottom: 12,
    fontWeight: '600',
  },

  dailyArtContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 5,
    marginBottom: 16,
  },
  favoriteArt: {
    borderRadius: 10
  },
  dailyArtImage: {
    width: (screenWidth - 48) / 3, // 3 cột, trừ padding và khoảng cách
    height: (screenWidth - 48) / 3,
    borderRadius: 10,
    marginBottom: 8,
  },

  upcomingTitle: {
    fontSize: 22,
    color: '#f7941d',
    marginBottom: 12,
    fontWeight: '600',
  },

  exhibitionCard: {
    width: 160,
    marginRight: 16,
    alignItems: 'center',
  },

  exhibitionImage: {
    width: 160,
    height: 240,
    borderRadius: 12,
    marginBottom: 8,
  },

  exhibitionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  exhibitionArtist: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },

  newsTitle: {
    fontSize: 22,
    color: '#f7941d',
    marginTop: 24,
    marginBottom: 12,
    fontWeight: '600',
  },

  newsItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
    // marginRight: 75
  },

  newsImage: {
    width: 70,
    height: 110,
    borderRadius: 8,
    marginRight: 12,
  },

  newsText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

});
