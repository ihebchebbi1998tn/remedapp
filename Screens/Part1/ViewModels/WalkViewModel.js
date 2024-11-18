import { useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useTranslation } from "react-i18next";

const useWalkViewModel = (navigation) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const { t } = useTranslation();

  const showLocationRequestExplanation = () => {
    Alert.alert(
      t('localask'), // Title of the alert
      t('whyweuse'), // Description of why you need location
      [
        { text: t('cancellocali'), style: "cancel" }, // Cancel button
        { text: t('Next'), onPress: requestLocationPermission } // Confirm action
      ]
    );
  };

  const handleLocationPermission = () => {
    showLocationRequestExplanation(); // Show the custom alert
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        navigation.navigate("LoginScreen"); // Navigate when permission is granted
      } else {
        Alert.alert(t('NeededLocal')); // Alert when permission is denied
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
      Alert.alert('An error occurred while requesting location access. Please try again.'); // Handle errors
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
    navigateToNextScreen,
  };
};

export default useWalkViewModel;
