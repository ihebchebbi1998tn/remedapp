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
      console.error(t("Error"), error);
      Alert.alert("Error", "An error occurred while logging in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginResponse = async (data) => {
    if (data.error) {
      if (data.error === "User not found") {
        Alert.alert(t("Error"), t("UserNotFound"));
      } else if (data.error === "Incorrect password") {
        Alert.alert(t("Error"), t("IncorrectPassword"));
      } else {
        Alert.alert(t("Error"), t("An unexpected error occurred"));
      }
    } else {
      try {
        if (stayLoggedIn) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        } else {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }
  
        updateUser(data.user);  

        const stayLoggedInValue = stayLoggedIn ? 1 : 2; 

        if (data.user.role === "user") {
          navigation.navigate("UserScreens", { stayLoggedInValue });
        } else {
          navigation.navigate("AdminScreens", { stayLoggedInValue });
        }
      } catch (error) {
        console.error("Error storing user data:", error);
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
