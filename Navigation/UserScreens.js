import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/HomeScreens/HomeScreen';
import MapScreen from '../Screens/Maps/MapScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import HistoryScreen from '../Screens/HistoryScreen/HistoryScreen';
import Header from './Header';
import BottomTabNavigator from './BottomTabNavigator';

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
