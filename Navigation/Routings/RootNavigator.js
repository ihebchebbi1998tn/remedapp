import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../../Screens/Authentifications/Views/LoginScreen';
import { UserProvider } from './UserContext';
import SplashScreen from '../../Screens/Part1/SplashScreen';
import { Walk1 , Walk2 , Walk3 , Walk4} from '../../Screens/Part1/Walk1';
import SignupScreen from '../../Screens/Authentifications/Views/SignupScreen';
import ForgotPasswordScreen from '../../Screens/Authentifications/ForgotPasswordScreen';
import ForgotPasswordOtp from '../../Screens/Authentifications/ForgotPasswordOtp';
import UserScreens from './UserScreens';
import AdminScreens from './AdminScreens';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Walk1"
            component={Walk1}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
       <Stack.Screen
            name="Walk2"
            component={Walk2}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
        <Stack.Screen
            name="Walk3"
            component={Walk3}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
        <Stack.Screen
            name="Walk4"
            component={Walk4}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="ForgotPasswordOtp"
            component={ForgotPasswordOtp}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="UserScreens"
            component={UserScreens} 
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="AdminScreens"
            component={AdminScreens} 
            options={{
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
