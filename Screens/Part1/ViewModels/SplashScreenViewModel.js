import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../Navigation/LanguageContext";

const useSplashScreenViewModel = (navigation, updateUser) => {
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useLanguage();

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        console.log(user);
        if (user && user !== "noUser") {
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
  }, [navigation, updateUser]);

//CAUSED PROBLEM WITH CHANGING LANGUAGE 
 /*  useEffect(() => {
    const setUserLanguage = async () => {
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
      await AsyncStorage.setItem('appLanguage', JSON.stringify(displayLanguage));
      console.log('User Phone Language:', displayLanguage);
    };

    setUserLanguage();
  }, [i18n, changeLanguage]); */

};

export default useSplashScreenViewModel;
