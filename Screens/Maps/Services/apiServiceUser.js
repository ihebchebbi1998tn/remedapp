import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../Navigation/apiConfig';

export const fetchAppLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem('appLanguage');
    return value ? JSON.parse(value).key : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchMarkers = async () => {
  try {
    const response = await fetch(`${BASE_URL}api/reports/all`);
    if (!response.ok) {
      console.error('Failed to fetch markers:', response.statusText);
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const markReportAsCollected = async (selectedMarker) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/reports/mark-collected?report_id=${selectedMarker.id}&pickedup_by=Technician B`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    return response.ok;
  } catch (error) {
    console.error('Error marking report as collected:', error);
    return false;
  }
};

export const markReportAsReported = async (selectedMarker) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/reports/mark-reported?report_id=${selectedMarker.id}&pickedup_by=Technician B`,
      {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    return response.ok;
  } catch (error) {
    console.error('Error marking report as reported:', error);
    return false;
  }
};

export const initialCarLocations = [
  { latitude: 25.353261, longitude: 55.427259 },
  { latitude: 25.353461, longitude: 55.427759 },
  { latitude: 25.353661, longitude: 55.427359 },
];

export const getMarkers = async () => {
  return await fetchMarkers(); 
};