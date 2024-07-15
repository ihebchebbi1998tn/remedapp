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
    const response = await fetch(`${BASE_URL}remed/api/reports/getall_report.php`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const markReportAsCollected = async (BASE_URL, selectedMarker) => {
  const response = await fetch(
    `${BASE_URL}remed/api/reports/mark_collected.php?report_id=${selectedMarker.id}&pickedup_by=Iheb`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.ok;
};

export const markReportAsReported = async (BASE_URL, selectedMarker) => {
  const response = await fetch(
    `${BASE_URL}remed/api/reports/mark_reported.php?report_id=${selectedMarker.id}&pickedup_by=Iheb`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.ok;
};

export const initialCarLocations = [
  { latitude: 25.353261, longitude: 55.427259 },
  { latitude: 25.353461, longitude: 55.427759 },
  { latitude: 25.353661, longitude: 55.427359 },
];

export const getMarkers = async (BASE_URL) => {
  const response = await fetch(`${BASE_URL}remed/api/reports/getall_report.php`);
  const data = await response.json();
  return data;
};