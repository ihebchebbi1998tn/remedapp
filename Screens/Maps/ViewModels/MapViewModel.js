// src/viewModels/MapViewModel.js
import { useState, useEffect, useRef } from 'react';
import { fetchAppLanguage, fetchMarkers } from '../Services/apiServiceUser';
import * as Location from 'expo-location';
import { Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';
import styles from '../Styles/StyleMapScreen';
import { Text } from 'react-native';

const initialCarLocations = [
  { latitude: 25.353261, longitude: 55.427259 },
  { latitude: 25.353461, longitude: 55.427759 },
  { latitude: 25.353661, longitude: 55.427359 },
];

export const useMapViewModel = () => {
  const [search, setSearch] = useState('');
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [userLocation, setUserLocation] = useState(null);
  const [pulseAnimation] = useState(new Animated.Value(1));
  const [newMarkerLocation, setNewMarkerLocation] = useState(null);
  const [carLocations, setCarLocations] = useState(initialCarLocations);
  const carTimers = useRef([]);
  const [carTargets, setCarTargets] = useState([]);
  const [appLanguage, setAppLanguage] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      const language = await fetchAppLanguage();
      setAppLanguage(language);
    };

    fetchLanguage();
    const intervalId = setInterval(fetchLanguage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchMarkersData = async () => {
      const data = await fetchMarkers();
      setMarkers(data);
      setFilteredMarkers(data);

      const pendingMarkers = data.filter(
        (marker) => marker.state === 'Pending'
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
    };

    fetchMarkersData();
  }, []);

  useEffect(() => {
    const getUserLocation = async () => {
      await handleLocateMe();
    };
    getUserLocation();
  }, []);

const handleLocateMe = useCallback(async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          t("localask"),
          t("whyweuse"),
          [
            { text: t("cancellocali"), style: "cancel" },
            { text: t("AllowLocal"), onPress: handleLocateMe }
          ]
        );
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
      console.error("Error getting location:", error);
    }
  }, [t]);

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
        (marker) => filterStatus === 'All' || marker.state === filterStatus
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
        {status === 'All'
          ? markers.length
          : markers.filter((marker) => marker.state === status).length}
        {symbol}
      </Text>
    </TouchableOpacity>
  );

  return {
    search,
    markers,
    filteredMarkers,
    selectedMarker,
    dropdownVisible,
    filterStatus,
    userLocation,
    pulseAnimation,
    newMarkerLocation,
    carLocations,
    appLanguage,
    mapRef,
    handleSearch,
    handleSelectTitle,
    setFilteredMarkers,
    setSelectedMarker,
    setSearch,
    setDropdownVisible,
    setFilterStatus,
    handleLocateMe,
    renderSortingButton,
  };
};

     
