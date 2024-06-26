import React, { useState, useEffect } from "react";
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
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/color";
import BottomTabNavigator from "../../Navigation/BottomTabNavigator";
import Header from "../../Navigation/Header";
import Stats from "./Stats";
import * as Location from 'expo-location';
import { BASE_URL } from "../../Navigation/apiConfig";
import BottomTabNavigatorAdmin from "../../Navigation/BottomTabNavigatorAdmin";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;

const HomeScreenAdmin = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
    getUserLocation();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}remed/api/reports/getall_report.php`);
      const result = await response.json();
      setData(result);
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
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance.toFixed(1);
    
  };

  const enhancedData = data.map((item) => {
    const distance = userLocation
      ? calculateDistance(userLocation.latitude, userLocation.longitude, parseFloat(item.altitude), parseFloat(item.longitude))
      : 'N/A';
    return {
      id: item.id,
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

  const renderHeader = () => (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.inputText}>
          <Ionicons name="search-outline" size={17} color={Colors.primary} />
          <TextInput
            placeholder={t("HomeScreenAdmin.Search")}
            style={styles.input}
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <AntDesign name="close" size={17} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
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
      <Header />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        key={'two-column'}
      />
      <View style={styles.bottomNavigator}>
        <BottomTabNavigatorAdmin />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: Colors.pageBackground,
    paddingHorizontal: 15,
    paddingBottom: 80 
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
    marginVertical: 10,
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

export default HomeScreenAdmin;

