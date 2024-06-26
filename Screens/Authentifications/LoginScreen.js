import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SidebarModal from "../../Navigation/SidebarModal";
import Colors from "../../utils/color";
import { LinearGradient } from "expo-linear-gradient";
import { BASE_URL } from "../../Navigation/apiConfig";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../Navigation/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
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
            navigation.navigate("HomeScreen");
          } else {
            navigation.navigate("HomeScreenAdmin");
          }
        }
      } catch (error) {
        console.error("Error retrieving user from AsyncStorage:", error);
      }
    };

    checkLoggedInUser();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${BASE_URL}remed/api/utilisateur/login.php`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password }),
          }
        );
        const data = await response.json();
        if (data.error === "User not found") {
          Alert.alert(t("Error"), t("UserNotFound"));
        } else if (data.error === "Incorrect password") {
          Alert.alert(t("Error"), t("IncorrectPassword"));
        } else {
          updateUser(data.user);
          if (stayLoggedIn) {
            await AsyncStorage.setItem("user", JSON.stringify(data.user));
          }
          console.log(data);
          if (data.user.role === "user") {
            navigation.navigate("HomeScreen");
          } else {
            navigation.navigate("HomeScreenAdmin");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "An error occurred while logging in");
      } finally {
        setIsLoading(false);
      }
    }, 4000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary02 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openSidebar} style={styles.sidebarIcon}>
          <Ionicons name="menu" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logotheme.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>{t("Welcome to RE-MED Community")}</Text>
        <Text style={styles.description}>{t("THE RE-MED PROJECT")}</Text>
        <Image
          source={require("../../assets/logoall.png")}
          style={styles.smallerImage}
        />

        <View style={styles.inputContainer}>
          <Text style={[styles.labelText, { color: Colors.primary }]}>
            {t("username")}
          </Text>
          <View style={styles.inputText}>
            {appLanguage === "ar" ? (
              <>
                <TextInput
                  placeholder={t("username")}
                  style={styles.inputArabic} // Align text to the right for Arabic
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <Ionicons
                  name="mail-outline"
                  size={17}
                  color={Colors.primary}
                />
              </>
            ) : (
              <>
                <Ionicons
                  name="mail-outline"
                  size={17}
                  color={Colors.primary}
                />
                <TextInput
                  placeholder={t("username")}
                  style={styles.input}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </>
            )}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.labelText, { color: Colors.primary }]}>
            {t("password")}
          </Text>
          <View style={styles.inputText}>
            {appLanguage === "ar" ? (
              <>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={17}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder={t("password")}
                  style={styles.inputArabic}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Ionicons
                  name="lock-closed-outline"
                  size={17}
                  color={Colors.primary}
                />
              </>
            ) : (
              <>
                <Ionicons
                  name="lock-closed-outline"
                  size={17}
                  color={Colors.primary}
                />
                <TextInput
                  placeholder={t("password")}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={17}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.stayLoggedInContainer}>
            <TouchableOpacity
              style={styles.stayLoggedInCheckbox}
              onPress={toggleStayLoggedIn}
            >
              {stayLoggedIn ? (
                <Ionicons name="checkbox" size={20} color={Colors.primary} />
              ) : (
                <Ionicons
                  name="square-outline"
                  size={20}
                  color={Colors.primary}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.stayLoggedInText}>{t("Stay logged in")}</Text>
          </View>
        </View>

        <LinearGradient
          colors={["#709a60", "#eab845"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.nextButtonText}>{t("Login")}</Text>
            )}
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          style={[styles.signupButton, { borderColor: Colors.primary }]}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={[styles.signupButtonText, { color: Colors.primary }]}>
            {t("Signup")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.forgotPasswordText}>
            {t("Forgot your")}
            <Text style={{ fontWeight: "bold" }}> {t("Password ?")}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <SidebarModal isOpen={isSidebarOpen} onClose={closeSidebar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sidebarIcon: {
    marginTop: 5,
    marginRight: 20,
  },
  container: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 17,
  },
  labelText: {
    marginBottom: 3,
    fontSize: 13,
    fontWeight: "bold",
  },
  inputText: {
    width: "100%",
    borderRadius: 8,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
  },
  inputArabic: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    textAlign: "right", // Align text to the right
  },
  logo: {
    width: 220,
    height: 70,
    marginBottom: 5,
  },
  smallerImage: {
    width: 270,
    height: 60,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    alignItems: "center",
    padding: 13,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  signupButton: {
    width: "95%",
    alignItems: "center",
    padding: 13,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 5,
  },
  signupButtonText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  stayLoggedInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: "1%",
  },
  stayLoggedInCheckbox: {
    marginRight: 8,
  },
  stayLoggedInText: {
    fontSize: 12,
    color: Colors.primary,
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.primary,
  },
  gradient: {
    width: "95%",
    borderRadius: 8,
    marginTop: 20,
  },
  nextButton: {
    borderRadius: 8,
    paddingVertical: 5, // Adjusted padding
    paddingHorizontal: 24, // Adjusted padding
    width: "100%",
    alignItems: "center",
    justifyContent: "center", // Added justifyContent
    marginTop: 12,
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: "4.3%",
  },
});
