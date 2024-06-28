import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../utils/color";
import Stats from "./Stats";
import * as Location from 'expo-location';
import { BASE_URL } from "../../Navigation/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [appLanguage, setAppLanguage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchAppLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("appLanguage");
        if (value) {
          const parsedValue = JSON.parse(value);
          setAppLanguage(parsedValue.key);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppLanguage();
  }, []);

  useEffect(() => {
    fetchData(page);
    getUserLocation();
  }, [page]);

  const fetchData = async (pageNum) => {
    try {
      const response = await fetch(`${BASE_URL}remed/api/reports/getall_report.php?page=${pageNum}`);
      const result = await response.json();
      setData(prevData => (pageNum === 1 ? result : [...prevData, ...result]));
    } catch (error) {
      console.error(error);
    }
  };

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon1 - lon2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(1);
  };

  const enhancedData = data.map((item, index) => {
    const uniqueKey = `${item.reported_by}-${item.location}-${index}-${item.id || Date.now()}`;
    const distance = userLocation
      ? calculateDistance(userLocation.latitude, userLocation.longitude, parseFloat(item.altitude), parseFloat(item.longitude))
      : 'N/A';
    return {
      id: uniqueKey, // Ensure each ID is unique
      name: item.reported_by || "Unknown",
      location: item.location || "Unknown",
      distance: distance + ' km',
      coords: { lat: parseFloat(item.altitude), lng: parseFloat(item.longitude) },
      image: { uri: `${BASE_URL}remed/api/reports/` + item.picture },
      isLiked: false,
    };
  });
  

  const filteredData = enhancedData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchData(1).then(() => setRefreshing(false));
  }, []);

  const loadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      setIsLoadingMore(false);
    }
  };

  const renderHeader = () => (
    <>
      <Stats />
    </>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={item.image} style={styles.cardImage} />
        {item.isLiked && (
          <View style={styles.checkContainer}>
            <AntDesign name="checkcircle" size={24} color={Colors.primary} />
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userLocation}>{item.location}</Text>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        key={'two-column'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.bottomNavigator}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: Colors.pageBackground,
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: Colors.inputBackground,
    borderRadius: 10,
    marginVertical: 0,
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  card: {
    width: "48%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  checkContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  userLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  distance: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  bottomNavigator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
