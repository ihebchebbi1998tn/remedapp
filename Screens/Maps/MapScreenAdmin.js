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
import MapView, { Marker, Polyline } from "react-native-maps";
import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../Navigation/apiConfig";
import Colors from "../../utils/color";
import * as Location from "expo-location";
import haversine from "haversine-distance"; 
import getDirections from "react-native-google-maps-directions";
import { LinearGradient } from "expo-linear-gradient";
import customMapStyle from "./Styles/customMapStyle";
import styles from "./Styles/StyleMapScreenAdmin";
const initialCarLocations = [
  { latitude: 25.353261, longitude: 55.427259 },
  { latitude: 25.353461, longitude: 55.427759 },
  { latitude: 25.353661, longitude: 55.427359 },
];


const collectedMarkerImage = require("../../assets/images/collected_marker.png");
const pendingMarkerImage = require("../../assets/images/pending_marker.png");
const reportedMarkerImage = require("../../assets/images/reported.png");
const carImage = require("../../assets/images/car.png");

const MapScreenAdmin = () => {
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
  const [closestMarker, setClosestMarker] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const { t } = useTranslation();
  const carTimers = useRef([]);
  const [carTargets, setCarTargets] = useState([]);
  const [collectModalVisible, setCollectModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [appLanguage, setAppLanguage] = useState(null);
  const mapRef = useRef(null); 
  const [currentRegion, setCurrentRegion] = useState(null);


   const handleRegionChangeComplete = region => {
    setCurrentRegion(region);
  };

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

  const markReportAsCollected = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}remed/api/reports/mark_collected.php?report_id=${selectedMarker.id}&pickedup_by=Iheb`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedMarkers = markers.map((marker) =>
          marker.id === selectedMarker.id
            ? { ...marker, state: "Collected" }
            : marker
        );
        setMarkers(updatedMarkers);
        setFilteredMarkers(updatedMarkers);
        setSelectedMarker(null);
        setCollectModalVisible(false);
      } else {
        console.error("Error marking report as collected:", response.status);
      }
    } catch (error) {
      console.error("Error marking report as collected:", error);
    }
  };

  const markReportAsReported = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}remed/api/reports/mark_reported.php?report_id=${selectedMarker.id}&pickedup_by=Iheb`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedMarkers = markers.map((marker) =>
          marker.id === selectedMarker.id
            ? { ...marker, state: "Reported" }
            : marker
        );
        setMarkers(updatedMarkers);
        setFilteredMarkers(updatedMarkers);
        setSelectedMarker(null);
        setReportModalVisible(false);
      } else {
      }
    } catch (error) {
    }
  };

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

  const checkClosestMarker = () => {
    if (!userLocation) return;

    let closest = null;
    let minDistance = Infinity;

    markers.forEach((marker) => {
      if (marker.state === "Pending") {
        const distance = haversine(userLocation, {
          latitude: parseFloat(marker.altitude),
          longitude: parseFloat(marker.longitude),
        });

        if (distance < minDistance) {
          minDistance = distance;
          closest = marker;
        }
      }
    });

    if (minDistance > 10000) {
      alert("The reports are too far (+10KM)");
    } else {
      setClosestMarker(closest);
      getRouteToMarker(closest);
    }
  };

  const getRouteToMarker = (marker) => {
    if (!userLocation || !marker) return;

    const data = {
      source: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      destination: {
        latitude: parseFloat(marker.altitude),
        longitude: parseFloat(marker.longitude),
      },
      params: [
        {
          key: "travelmode",
          value: "driving",
        },
        {
          key: "dir_action",
          value: "navigate",
        },
      ],
    };

    getDirections(data)
      .then((result) => {
        if (result && result.coordinates) {
          setRouteCoordinates(result.coordinates);
        } else {
          setRouteCoordinates([]);
        }
      })
      .catch((error) => {
        console.error("Error in getting directions:", error);
        setRouteCoordinates([]);
      });
  };

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
        <Image source={carImage} style={{ width: 30, height: 30 }} />
      </Marker>
    ));

    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
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
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#709a60", "#eab845"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => checkClosestMarker()}
            >
              <Text style={styles.buttonText}>{t("map.StartCollecting")}</Text>
            </TouchableOpacity>
          </LinearGradient>
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
                  {selectedMarker.state === "Pending" && (
                    <View style={styles.modalButtonContainer}>
                      {appLanguage === "ar" ? (
                        <>
                          <TouchableOpacity
                            style={[
                              styles.modalButton,
                              styles.modalReportButton,
                            ]}
                            onPress={() => setReportModalVisible(true)}
                          >
                            <Text style={styles.modalButtonText}>
                              {t("Report")}
                            </Text>
                            <Ionicons
                              name="flag-outline"
                              size={20}
                              color={Colors.white}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setCollectModalVisible(true)}
                          >
                            <Text style={styles.modalButtonText}>
                              {t("Collect")}
                            </Text>
                            <Ionicons
                              name="checkmark"
                              size={20}
                              color={Colors.white}
                            />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <TouchableOpacity
                            style={[
                              styles.modalButton,
                              styles.modalReportButton,
                            ]}
                            onPress={() => setReportModalVisible(true)}
                          >
                            <Ionicons
                              name="flag-outline"
                              size={20}
                              color={Colors.white}
                            />
                            <Text style={styles.modalButtonText}>
                              {t("Report")}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setCollectModalVisible(true)}
                          >
                            <Ionicons
                              name="checkmark"
                              size={20}
                              color={Colors.white}
                            />
                            <Text style={styles.modalButtonText}>
                              {t("Collect")}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={collectModalVisible}
          onRequestClose={() => setCollectModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.confirmationModal}>
              <Text style={styles.confirmationTitle}>
                {t("map.ConfirmCollect")}
              </Text>
              <View style={styles.confirmationButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.confirmationButton,
                    styles.confirmationCancelButton,
                  ]}
                  onPress={() => setCollectModalVisible(false)}
                >
                  <Text style={styles.confirmationButtonText}>
                    {t("map.NO")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.confirmationButton,
                    styles.confirmationConfirmButton,
                  ]}
                  onPress={markReportAsCollected}
                >
                  <Text style={styles.confirmationButtonText}>
                    {t("map.YES")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={reportModalVisible}
          onRequestClose={() => setReportModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.confirmationModal}>
              <Text style={styles.confirmationTitle}>
                {t("map.ConfirmReport")}
              </Text>
              <View style={styles.confirmationButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.confirmationButton,
                    styles.confirmationCancelButton,
                  ]}
                  onPress={() => setReportModalVisible(false)}
                >
                  <Text style={styles.confirmationButtonText}>
                    {t("map.NO")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.confirmationButton,
                    styles.confirmationConfirmButton,
                  ]}
                  onPress={markReportAsReported}
                >
                  <Text style={styles.confirmationButtonText}>
                    {t("map.YES")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      
    </SafeAreaView>
  );
};



export default MapScreenAdmin;
