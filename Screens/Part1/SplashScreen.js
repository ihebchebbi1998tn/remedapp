import React, { useEffect , useContext } from "react";
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import Colors from "../../utils/color";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../Navigation/LanguageContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from "../../Navigation/Routings/UserContext";
import styles from "./Styles/StyleSplashScreen";
const SplashScreen= ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useLanguage();
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          updateUser(parsedUser);
          if (parsedUser.role === "user") {
            navigation.navigate("UserScreens");
          } else {
            navigation.navigate("AdminScreens");
          }
        } else {
          const timeout = setTimeout(() => {
            navigation.navigate("Walk1");
          }, 1000);
          return () => clearTimeout(timeout);
        }
      } catch (error) {
        console.error("Error retrieving user from AsyncStorage:", error);
      }
    };

    checkLoggedInUser();
  }, [navigation]);
  

  useEffect(() => {
    const userLanguage = Intl.DateTimeFormat().resolvedOptions().locale;
    let displayLanguage;
    switch (userLanguage.substring(0, 2)) {
      case "en":
        displayLanguage = "en";
        break;
      case "fr":
        displayLanguage = "fr";
        break;
      case "ar":
        displayLanguage = "ar";
        break;
      case "it":
        displayLanguage = "it";
        break;
      default:
        displayLanguage = "en";
    }
    i18n.changeLanguage(displayLanguage);
    changeLanguage(displayLanguage);
     AsyncStorage.setItem('appLanguage', JSON.stringify(displayLanguage));
    console.log('User Phone Language:', displayLanguage);
  }, []);

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.centeredContent}>
        <Image
          source={require("../../assets/logoall.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
};



export default SplashScreen;
