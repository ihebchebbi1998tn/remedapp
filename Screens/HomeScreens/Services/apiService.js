import { BASE_URL } from "../../../Navigation/apiConfig";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchReports = async (pageNum, limit = 2) => {
  const response = await fetch(`${BASE_URL}remed/api/reports/getall_reportslazy.php?page=${pageNum}&limit=${limit}`);
  return response.json();
};

export const getUserLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }
  let location = await Location.getCurrentPositionAsync({});
  return location.coords;
};

export const fetchAppLanguage = async () => {
  const value = await AsyncStorage.getItem("appLanguage");
  if (value) {
    return JSON.parse(value).key;
  }
  return null;
};
