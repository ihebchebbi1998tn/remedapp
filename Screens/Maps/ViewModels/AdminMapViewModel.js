import { useState, useEffect, useRef, useCallback } from "react";
import * as Location from "expo-location";
import haversine from "haversine-distance";
import getDirections from "react-native-google-maps-directions";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../Navigation/apiConfig"; // Keep the BASE_URL import if used in other parts

const useModalView = (markers, setMarkers, setFilteredMarkers, setSelectedMarker) => {
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [closestMarker, setClosestMarker] = useState(null);
  const mapRef = useRef(null);
  const { t } = useTranslation();

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

  return {
    search,
    handleSearch,
    handleLocateMe,
    checkClosestMarker,
    getRouteToMarker,
    mapRef,
    userLocation,
    routeCoordinates,
    closestMarker,
    t,
  };
};

export default useModalView;
