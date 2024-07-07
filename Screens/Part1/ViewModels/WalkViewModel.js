import { useState } from 'react';
import * as Location from 'expo-location';

const useWalkViewModel = (navigation) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const handleLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    navigation.navigate("LoginScreen");
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
