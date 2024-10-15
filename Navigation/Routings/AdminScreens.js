import {  useEffect } from "react";

import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenAdmin from '../../Screens/HomeScreens/Views/HomeScreenAdmin';
import MapScreenAdmin from '../../Screens/Maps/Views/MapScreenAdmin';
import ProfileScreen from '../../Screens/ProfileScreen/Views/ProfileScreen';
import BottomTabNavigatorAdmin from '../BottomNavs/Admin/View/BottomTabNavigatorAdmin';
import Header from '../Headers/View/Header';

const Stack = createStackNavigator();



const AdminScreens = ({ route }) => {
  const { stayLoggedInValue } = route?.params || {}; 

  useEffect(() => {
    console.log("Stay Logged In Value:", stayLoggedInValue);
  }, [stayLoggedInValue]);
  
  return (
    <Stack.Navigator initialRouteName="HomeScreenAdmin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreenAdmin" component={HomeScreenAdmin} />
      <Stack.Screen name="MapScreenAdmin" component={MapScreenAdmin} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
const MainScreen = ({ route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <Header />
      <AdminScreens route={route} />
      <BottomTabNavigatorAdmin />
    </SafeAreaView>
  );
};

export default MainScreen;
