import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../Screens/HomeScreens/Views/HomeScreen';
import MapScreen from '../../Screens/Maps/Views/MapScreen';
import ProfileScreen from '../../Screens/ProfileScreen/Views/ProfileScreen';
import HistoryScreen from '../../Screens/HistoryScreen/Views/HistoryScreen';
import Header from '../Headers/Header';
import BottomTabNavigator from '../BottomNavs/User/BottomTabNavigator';

const Stack = createStackNavigator();

const UserScreens = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  return (
    <React.Fragment>
      <Header />
      <UserScreens />
      <BottomTabNavigator />
    </React.Fragment>
  );
};

export default MainScreen;
