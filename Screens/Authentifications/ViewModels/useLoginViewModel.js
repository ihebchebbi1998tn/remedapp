import { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../Navigation/Routings/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchLogin } from "../Services/apiService";

export const useLoginViewModel = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { user, updateUser } = useContext(UserContext);
  const [appLanguage, setAppLanguage] = useState(null);

  useEffect(() => {
    const fetchAppLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("appLanguage");
        if (value) {
          const parsedValue = JSON.parse(value);
          setAppLanguage(parsedValue.key);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppLanguage();
    const intervalId = setInterval(fetchAppLanguage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleStayLoggedIn = () => setStayLoggedIn(!stayLoggedIn);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          updateUser(parsedUser);
          if (parsedUser.role === "user") {
            navigation.navigate("UserScreens");
          } else {
            navigation.navigate("AdminScreens");
          }
        }
      } catch (error) {
        console.error("Error retrieving user from AsyncStorage:", error);
      }
    };

    checkLoggedInUser();
  }, [navigation, updateUser]);

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const data = await fetchLogin(email, password);
        handleLoginResponse(data);
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "An error occurred while logging in");
      } finally {
        setIsLoading(false);
      }
    }, 4000);
  };

  const handleLoginResponse = (data) => {
    if (data.error === "User not found") {
      Alert.alert(t("Error"), t("UserNotFound"));
    } else if (data.error === "Incorrect password") {
      Alert.alert(t("Error"), t("IncorrectPassword"));
    } else {
      updateUser(data.user);
      if (stayLoggedIn) {
        AsyncStorage.setItem("user", JSON.stringify(data.user));
        console.log(user);
      } else {
        AsyncStorage.setItem("user", JSON.stringify("0"));
        console.log("not saved");
      }
      console.log(data.user.role);
      if (data.user.role === "user") {
        navigation.navigate("UserScreens");
      } else {
        navigation.navigate("AdminScreens");
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    stayLoggedIn,
    toggleStayLoggedIn,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    isLoading,
    handleLogin,
    handleLoginResponse,
    appLanguage,
  };
};
