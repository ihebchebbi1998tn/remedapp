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