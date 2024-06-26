import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
import HomeScreen from '../Screens/HomeScreens/HomeScreen';
import LoginScreen from '../Screens/Authentifications/LoginScreen';
import { UserProvider } from './UserContext';
import SplashScreen from '../Screens/Part1/SplashScreen';
import SplashScreen2 from '../Screens/Part1/SplashScreen2';
import Walk1 from '../Screens/Part1/Walk1';
import Walk2 from '../Screens/Part1/Walk2';
import Walk3 from '../Screens/Part1/Walk3';
import Walk4 from '../Screens/Part1/Walk4';
import SignupScreen from '../Screens/Authentifications/SignupScreen';
import ForgotPasswordScreen from '../Screens/Authentifications/ForgotPasswordScreen';
import ForgotPasswordOtp from '../Screens/Authentifications/ForgotPasswordOtp';
import MapScreen from '../Screens/Maps/MapScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import HistoryScreen from '../Screens/HistoryScreen/HistoryScreen';
import HomeScreenAdmin from '../Screens/HomeScreens/HomeScreenAdmin';
import ProfileScreenAdmin from '../Screens/ProfileScreen/ProfileScreenAdmin';
import MapScreenAdmin from '../Screens/Maps/MapScreenAdmin';
const RootNavigator = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen2"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="SplashScreen2"
            component={SplashScreen2}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Walk1"
            component={Walk1}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Walk2"
            component={Walk2}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
           <Stack.Screen
            name="Walk3"
            component={Walk3}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
           <Stack.Screen
            name="Walk4"
            component={Walk4}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
              <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
         <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
           <Stack.Screen
            name="ForgotPasswordOtp"
            component={ForgotPasswordOtp}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />

         
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="HomeScreenAdmin"
            component={HomeScreenAdmin}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
      <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
           <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
           <Stack.Screen
            name="ProfileScreenAdmin"
            component={ProfileScreenAdmin}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
           <Stack.Screen
            name="MapScreenAdmin"
            component={MapScreenAdmin}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="HistoryScreen"
            component={HistoryScreen}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default RootNavigator;
