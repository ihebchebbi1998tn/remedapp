import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../Navigation/apiConfig";
import Colors from "../../utils/color";
import Header from "../../Navigation/Header";
import * as Location from "expo-location";
import BottomTabNavigator from "../../Navigation/BottomTabNavigator";

const initialCarLocations = [
  { latitude: 25.353261, longitude: 55.427259 },
  { latitude: 25.353461, longitude: 55.427759 },
  { latitude: 25.353661, longitude: 55.427359 },
];

const customMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#E9E3C4" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#593A1F" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#FFFFFF" }] },
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#D6C9A6" }],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#A9DEF2" }],
  },
];

const collectedMarkerImage = require("../../assets/images/collected_marker.png");
const pendingMarkerImage = require("../../assets/images/pending_marker.png");
const reportedMarkerImage = require("../../assets/images/reported.png");
const carImage = require("../../assets/images/green_marker.png");
const userImage = require("../../assets/images/car.png");

const MapScreen = () => {
  const [search, setSearch] = useState("");
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [userLocation, setUserLocation] = useState(null);
  const [pulseAnimation] = useState(new Animated.Value(1));
  const [newMarkerLocation, setNewMarkerLocation] = useState(null);
  const [carLocations, setCarLocations] = useState(initialCarLocations);
  const { t } = useTranslation();
  const carTimers = useRef([]);
  const [carTargets, setCarTargets] = useState([]);
  const [appLanguage, setAppLanguage] = useState(null);
  const mapRef = useRef(null); 

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
    const intervalId = setInterval(fetchAppLanguage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}remed/api/reports/getall_report.php`)
      .then((response) => response.json())
      .then((data) => {
        setMarkers(data);
        setFilteredMarkers(data);
  
        const pendingMarkers = data.filter(
          (marker) => marker.state === "Pending"
        );
        if (pendingMarkers.length >= 3) {
          setCarTargets([
            pendingMarkers[0],
            pendingMarkers[1],
            pendingMarkers[2],
          ]);
        } else {
          setCarTargets(pendingMarkers);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

 
  useEffect(() => {
    const getUserLocation = async () => {
      await handleLocateMe();
    };
    getUserLocation();
  }, []);

  const handleLocateMe = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = markers.filter(
      (marker) =>
        marker.title.toLowerCase().includes(text.toLowerCase()) ||
        marker.description.toLowerCase().includes(text.toLowerCase()) ||
        marker.location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMarkers(filtered);
    setDropdownVisible(!!text);
    if (filtered.length > 0 && mapRef.current) {
      const marker = filtered[0];
      mapRef.current.animateToRegion({
        latitude: parseFloat(marker.altitude),
        longitude: parseFloat(marker.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleSelectTitle = (title) => {
    setSearch(title);
    setDropdownVisible(false);
  };

  useEffect(() => {
    setFilteredMarkers(
      markers.filter(
        (marker) => filterStatus === "All" || marker.state === filterStatus
      )
    );
  }, [filterStatus, markers]);

  useEffect(() => {
    const moveCars = () => {
      setCarLocations((prevLocations) =>
        prevLocations.map((location, index) => {
          if (
            !carTargets[index] ||
            !carTargets[index].altitude ||
            !carTargets[index].longitude
          ) {
            return location;
          }

          const targetLocation = {
            latitude: parseFloat(carTargets[index].altitude),
            longitude: parseFloat(carTargets[index].longitude),
          };

          const latDelta =
            (targetLocation.latitude - location.latitude) * 0.001;
          const lonDelta =
            (targetLocation.longitude - location.longitude) * 0.001;

          return {
            latitude: location.latitude + latDelta,
            longitude: location.longitude + lonDelta,
          };
        })
      );
    };

    carTimers.current = [
      setInterval(() => moveCars(), 1000),
      setInterval(() => moveCars(), 1000),
      setInterval(() => moveCars(), 1000),
    ];

    return () => {
      carTimers.current.forEach((timer) => clearInterval(timer));
    };
  }, [carTargets]);

  

 

  const renderSortingButton = (status, label, symbol) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        filterStatus === status && styles.activeSortButton,
      ]}
      onPress={() => setFilterStatus(status)}
    >
      <Text
        style={[
          styles.sortButtonText,
          filterStatus === status && styles.activeSortButtonText,
        ]}
      >
        {label}:
        {status === "All"
          ? markers.length
          : markers.filter((marker) => marker.state === status).length}
        {symbol}
      </Text>
    </TouchableOpacity>
  );

  const renderNewMarker = () =>
    newMarkerLocation && (
      <Marker coordinate={newMarkerLocation}>
        <Image source={pendingMarkerImage} style={{ width: 30, height: 30 }} />
      </Marker>
    );

  const renderCars = () =>
    carLocations.map((location, index) => (
      <Marker key={index} coordinate={location}>
        <Image source={userImage} style={{ width: 30, height: 30 }} />
      </Marker>
    ));

    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
      <Header />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.inputText}>
            <Ionicons name="search-outline" size={17} color={Colors.primary} />
            <TextInput
              placeholder={t("map.Search")}
              style={styles.input}
              value={search}
              onChangeText={handleSearch}
            />
          </View>
          {dropdownVisible && (
            <View style={styles.dropdownContainer}>
              <FlatList
                data={filteredMarkers}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelectTitle(item.title)}
                  >
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                style={styles.dropdown}
              />
            </View>
          )}
        </View>

        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 33.8869,
              longitude: 9.5375, 
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            customMapStyle={customMapStyle}
            region={
              userLocation
                ? { ...userLocation, latitudeDelta: 0.1, longitudeDelta: 0.1 }
                : undefined
            }
          >
            {renderNewMarker()}
            {renderCars()}
            {userLocation && (
              <Marker.Animated
                coordinate={userLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                style={{ transform: [{ scale: pulseAnimation }] }}
              >
                <Image source={carImage} style={{ width: 30, height: 30 }} />
              </Marker.Animated>
            )}

            {filteredMarkers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(marker.altitude),
                  longitude: parseFloat(marker.longitude),
                }}
                onPress={() => setSelectedMarker(marker)}
              >
                <Image
                  source={
                    marker.state === "Collected"
                      ? collectedMarkerImage
                      : marker.state === "Pending"
                      ? pendingMarkerImage
                      : reportedMarkerImage
                  }
                  style={{ width: 25, height: 25 }}
                />
              </Marker>
            ))}
          </MapView>
          <View style={styles.sortingContainer}>
            {renderSortingButton("All", t("map.All"), "✪")}
            {renderSortingButton("Collected", t("map.Collected"), "✓")}
            {renderSortingButton("Pending", t("map.Pending"), "⟳")}
            {renderSortingButton("Reported", t("MapScreenAdmin.Reported"), "!")}
          </View>
          <TouchableOpacity
            style={styles.localizeButton}
            onPress={handleLocateMe}
          >
            <Ionicons name="locate" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedMarker !== null}
          onRequestClose={() => setSelectedMarker(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedMarker(null)}
              >
                <Ionicons name="close-circle-outline" size={35} color="black" />
              </TouchableOpacity>
              {selectedMarker && (
                <>
                  <Text style={styles.markerTitle}>{selectedMarker.title}</Text>
                  {selectedMarker.picture && (
                    <Image
                      source={{
                        uri: `${BASE_URL}remed/api/reports/${selectedMarker.picture}`,
                      }}
                      style={styles.markerImage}
                    />
                  )}
                  <Text style={styles.markerDescription}>
                    {selectedMarker.description}
                  </Text>
                  <View>
                    {selectedMarker.state === "Pending" ? (
                      <Text
                        style={[styles.markerStateText, styles.pendingText]}
                      >
                        {t("map.Status")} : X
                      </Text>
                    ) : selectedMarker.state === "Collected" ? (
                      <Text
                        style={[styles.markerStateText, styles.collectedText]}
                      >
                        {t("map.Status")} : ✓
                      </Text>
                    ) : (
                      <Text
                        style={[styles.markerStateText, styles.reportedText]}
                      >
                        {t("map.Status")} : Reported
                      </Text>
                    )}
                  </View>
                  <Text style={styles.markerLocation}>
                    {t("map.Location")} : {selectedMarker.location}
                  </Text>
                  {selectedMarker.pickedup_by && (
                    <Text style={styles.markerPicker}>
                      {t("map.CollectedBy")} : {selectedMarker.pickedup_by}
                    </Text>
                  )}
                  <Text style={styles.markerDate}>
                    {t("map.ReportedAt")} :{" "}
                    {new Date(selectedMarker.created_at).toLocaleString()}
                  </Text>
                  <Text style={styles.markerDate}>
                    {t("map.PickedupAt")} :{" "}
                    {new Date(selectedMarker.updated_at).toLocaleString()}
                  </Text>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { flex: 3 },
  map: { flex: 3, width: screenWidth * 1.2 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgba(255,255,255, 0.8)",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    width: screenWidth * 0.8,
    transform: [{ scale: 0.8 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginLeft: 13,
    marginRight: 10,
  },
  modalReportButton: {
    backgroundColor: "#f28b82", // Light red color
  },
  modalButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  markerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 0,
  },
  localizeButton: {
    position: "absolute",
    bottom: "12%", 
    right: "3%", 
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dropdownContainer: {
    width: "100%",
    position: "absolute",
    top: 40,
    zIndex: 10,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  markerDescription: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  markerStateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  pendingText: {
    color: "orange",
  },
  collectedText: {
    color: "green",
  },
  reportedText: {
    color: "red",
  },
  markerLocation: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  markerPicker: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: "italic",
  },
  markerDate: {
    fontSize: 14,
    color: "gray",
    marginVertical: 5,
  },
  markerImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginTop: 15,
    resizeMode: "contain",
  },
  searchContainer: {
    position: "absolute",
    top: "2%", // Adjust as necessary
    right: "6%", // Adjust as necessary
    width: "88%",
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sortingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    zIndex: 1,
  },
  sortButton: {
    backgroundColor: "#eab845",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 13,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeSortButton: {
    backgroundColor: Colors.primary,
  },
  sortButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 11,
  },
  gradient: {
    width: "95%",
    borderRadius: 15,
  },
  activeSortButtonText: {
    color: Colors.white,
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.primary,
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  actionButton: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: "32%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  confirmationModal: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    width: screenWidth * 0.7, // Make the modal narrower
    marginTop: "50%",
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  confirmationButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  confirmationButton: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  confirmationCancelButton: {
    backgroundColor: "#f28b82", // Light red color for cancel button
  },
  confirmationConfirmButton: {
    backgroundColor: Colors.primary, // Primary color for confirm button
  },
  confirmationButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default MapScreen;
