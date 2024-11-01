import { useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useTranslation } from "react-i18next";

const useWalkViewModel = (navigation) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const { t } = useTranslation();

  const showLocationRequestExplanation = () => {
    Alert.alert(
      t('localask'),
      t('whyweuse'),
      [
        { text: t('cancellocali'), style: "cancel" },
        { text: t('AllowLocal'), onPress: requestLocationPermission }
      ]
    );
  };

  const handleLocationPermission = () => {
    showLocationRequestExplanation();
  };
  
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        navigation.navigate("LoginScreen");  // Updated line
      } else {
        Alert.alert(t('NeededLocal'));
      }
      
    } catch (error) {
      console.error("Error requesting location permission:", error);
      Alert.alert('An error occurred while requesting location access. Please try again.');
    }
  };

  const navigateToNextScreen = (nextScreen, index) => {
    setActiveDotIndex(index);
    navigation.navigate(nextScreen);
  };

  return {
    activeDotIndex,
    handleLocationPermission,
    showLocationRequestExplanation,
    navigateToNextScreen
  };
};

export default useWalkViewModel;
