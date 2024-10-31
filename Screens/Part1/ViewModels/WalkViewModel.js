import { useState } from 'react';
import * as Location from 'expo-location';
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

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        navigateToLoginScreen();
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
    navigateToNextScreen
  };
};

export default useWalkViewModel;
