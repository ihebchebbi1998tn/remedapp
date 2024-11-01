import { useState, useEffect, useCallback } from 'react';
import { fetchReports, getUserLocation, fetchAppLanguage } from '../Services/apiService';
import { calculateDistance } from './calculateDistance';
import { BASE_URL } from '../../../Navigation/apiConfig';
import { useTranslation } from "react-i18next";
import { Alert } from 'react-native';

export const useSharedViewModel = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const [appLanguage, setAppLanguage] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    fetchAppLanguageData();
    fetchData(page);
    getUserLocationData();
  }, [page]);

  const fetchAppLanguageData = async () => {
    try {
      const language = await fetchAppLanguage();
      if (language) {
        setAppLanguage(language);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async (pageNum) => {
    try {
      const limit = 10; 
      const result = await fetchReports(pageNum, limit);
  
      if (result.length > 0) {
        setData(prevData => (pageNum === 1 ? result : [...prevData, ...result]));
      } else {
        setIsLoadingMore(false); 
      }
    } catch (error) {
      console.error(error);
    }
  };
  

 const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await getUserLocation();
      setUserLocation(location);
    } else {
      Alert.alert(t('NeededLocal'));
    }
  };

  const getUserLocationData = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        t('localask'),
        t('whyweuse'),
        [
          { text: t('cancellocali'), style: "cancel" },
          { text: t('AllowLocal'), onPress: requestLocationPermission }
        ]
      );
    } else {
      const location = await getUserLocation();
      setUserLocation(location);
    }
  };

  const enhancedData = data.map((item, index) => {
    const uniqueKey = `${item.reported_by}-${item.location}-${index}-${item.id || Date.now()}`;
    const distance = userLocation
      ? calculateDistance(userLocation.latitude, userLocation.longitude, parseFloat(item.altitude), parseFloat(item.longitude))
      : 'N/A';
    return {
      id: uniqueKey,
      name: item.reported_by || "Unknown",
      location: item.location || "Unknown",
      distance: distance + ' km',
      coords: { lat: parseFloat(item.altitude), lng: parseFloat(item.longitude) },
      image: { uri: `${BASE_URL}` + item.picture },
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
    if (isLoadingMore) {
      setPage(prevPage => prevPage + 1); 
    }
  };
  

  return {
    search,
    setSearch,
    filteredData,
    refreshing,
    onRefresh,
    loadMore,
    appLanguage, 
  };
};
