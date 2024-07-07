import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreenAdmin from '../../Screens/HomeScreens/Views/HomeScreenAdmin';
import Header from '../Headers/Header';
import BottomTabNavigatorAdmin from '../BottomNavs/Admin/BottomTabNavigatorAdmin';
import MapScreenAdmin from '../../Screens/Maps/MapScreenAdmin';
import ProfileScreen from '../../Screens/ProfileScreen/Views/ProfileScreen';
const Stack = createStackNavigator();

const AdminScreens = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreenAdmin" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreenAdmin"
        component={HomeScreenAdmin}
      />
      <Stack.Screen
        name="MapScreenAdmin"
        component={MapScreenAdmin}
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
      <AdminScreens />
      <BottomTabNavigatorAdmin />
    </React.Fragment>
  );
};

export default MainScreen;
