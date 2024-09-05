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
  const { updateUser } = useContext(UserContext);
  
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleStayLoggedIn = () => setStayLoggedIn(!stayLoggedIn);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLogin(email, password);
      handleLoginResponse(data);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while logging in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginResponse = async (data) => {
    if (data.error === "User not found") {
      Alert.alert(t("Error"), t("UserNotFound"));
    } else if (data.error === "Incorrect password") {
      Alert.alert(t("Error"), t("IncorrectPassword"));
    } else {
      try {
        if (stayLoggedIn) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        } else {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          await AsyncStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error storing user in AsyncStorage:", error);
      }
  
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
  };
};