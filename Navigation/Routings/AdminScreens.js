import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "react-native";
import HomeScreenAdmin from '../../Screens/HomeScreens/Views/HomeScreenAdmin';
import Header from '../Headers/View/Header';
import BottomTabNavigatorAdmin from '../BottomNavs/Admin/View/BottomTabNavigatorAdmin';
import MapScreenAdmin from '../../Screens/Maps/Views/MapScreenAdmin';
import ProfileScreen from '../../Screens/ProfileScreen/Views/ProfileScreen';

const Stack = createStackNavigator();

const AdminScreens = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreenAdmin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreenAdmin" component={HomeScreenAdmin} />
      <Stack.Screen name="MapScreenAdmin" component={MapScreenAdmin} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <Header />
      <AdminScreens />
      <BottomTabNavigatorAdmin />
    </SafeAreaView>
  );
};

export default MainScreen;
