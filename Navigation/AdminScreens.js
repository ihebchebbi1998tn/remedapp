import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreenAdmin from '../Screens/HomeScreens/HomeScreenAdmin';
import Header from './Header';
import BottomTabNavigatorAdmin from './BottomTabNavigatorAdmin';
import MapScreenAdmin from '../Screens/Maps/MapScreenAdmin';
import ProfileScreenAdmin from '../Screens/ProfileScreen/ProfileScreenAdmin';
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
        name="ProfileScreenAdmin"
        component={ProfileScreenAdmin}
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
