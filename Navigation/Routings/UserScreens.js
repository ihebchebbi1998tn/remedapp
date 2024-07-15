import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../../Screens/HomeScreens/Views/HomeScreen';
import MapScreen from '../../Screens/Maps/Views/MapScreen';
import ProfileScreen from '../../Screens/ProfileScreen/Views/ProfileScreen';
import HistoryScreen from '../../Screens/HistoryScreen/Views/HistoryScreen';
import Header from '../Headers/View/Header';
import BottomTabNavigator from '../BottomNavs/User/View/BottomTabNavigator';
import { ActiveScreenProvider, useActiveScreen } from './ActiveScreenContext';

const Stack = createStackNavigator();

const UserScreens = () => {
  const { setActiveScreen } = useActiveScreen();
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      const currentRoute = e.data.state?.routes[e.data.state.index]?.name || 'Home';
      setActiveScreen(currentRoute);
    });

    return unsubscribe;
  }, [navigation, setActiveScreen]);

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  const { activeScreen } = useActiveScreen();

  return (
    <>
      <Header />
      <UserScreens />
      <BottomTabNavigator activeScreen={activeScreen} />
    </>
  );
};

export default () => (
  <ActiveScreenProvider>
    <MainScreen />
  </ActiveScreenProvider>
);
