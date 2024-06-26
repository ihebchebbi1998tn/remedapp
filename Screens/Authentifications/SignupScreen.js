import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/color";
import axios from "axios";
import { BASE_URL } from "../../Navigation/apiConfig";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const SuccessModal = ({ visible, onClose, message, navigation }) => (
  <Modal visible={visible} transparent={true} animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{message}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Ionicons name="checkmark-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default function SignupScreen({ navigation }) {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [appLanguage, setAppLanguage] = useState(null);



const getCountries = (language) => {
  const countries = {
    en: ["Tunisia", "Italy", "France", "England"],
    ar: ["تونس", "إيطاليا", "فرنسا", "إنجلترا"],
    fr: ["Tunisie", "Italie", "France", "Angleterre"],
    it: ["Tunisia", "Italia", "Francia", "Inghilterra"],
  };
  return countries[language] || countries.en;
};


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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert(t("signup.passwordMismatch"));
      return;
    }

    axios
      .post(`${BASE_URL}remed/api/utilisateur/create_utilisateur.php`, {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        country: country,
        password: password,
      })
      .then((response) => {
        console.log(response.data); // Log the response from the server
        setModalMessage(t("signup.successMessage", { firstName }));
        setModalVisible(true);
      })
      .catch((error) => {
        console.error(error); // Log any errors
        if (
          error.response &&
          error.response.data &&
          error.response.data.error.includes("Duplicate entry")
        ) {
          alert(t("signup.duplicateEmail")); // Display a user-friendly message for duplicate email
        } else {
          alert(t("signup.errorMessage") + error); // Display a generic error message
        }
      });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate("LoginScreen");
  };

  const countries = getCountries(appLanguage);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary02 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/logotheme.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>{t("signup.title")}</Text>
          <Text style={styles.description}>{t("signup.description")}</Text>
          <Image
            source={require("../../assets/logoall.png")}
            style={styles.smallerImage}
          />
          {appLanguage === "ar" ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.firstName")}
                </Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder={t("signup.firstNamePlaceholder")}
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.lastName")}
                </Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder={t("signup.lastNamePlaceholder")}
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.username")}
                </Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder={t("signup.usernamePlaceholder")}
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                  />
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.email")}
                </Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder={t("signup.email")}
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Ionicons
                    name="mail-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.country")}
                </Text>
                <View style={styles.inputText}>
                   <Picker
                selectedValue={country}
                style={styles.input}
                onValueChange={(itemValue) => setCountry(itemValue)}
              >
                {countries.map((country, index) => (
                  <Picker.Item key={index} label={country} value={country} />
                ))}
              </Picker>
                  <Ionicons
                    name="globe-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.password")}
                </Text>
                <View style={styles.inputText}>
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={17}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                  <TextInput
                    placeholder={t("signup.passwordPlaceholder")}
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
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.confirmPassword")}
                </Text>
                <View style={styles.inputText}>
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={17}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                  <TextInput
                    placeholder={t("signup.confirmPasswordPlaceholder")}
                    style={styles.inputArabic}
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <Ionicons
                    name="lock-closed-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.firstName")}
                </Text>
                <View style={styles.inputText}>
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={Colors.primary}
                  />
                  <TextInput
                    placeholder={t("signup.firstNamePlaceholder")}
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.lastName")}
                </Text>
                <View style={styles.inputText}>
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={Colors.primary}
                  />
                  <TextInput
                    placeholder={t("signup.lastNamePlaceholder")}
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.username")}
                </Text>
                <View style={styles.inputText}>
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={Colors.primary}
                  />
                  <TextInput
                    placeholder={t("signup.usernamePlaceholder")}
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.email")}
                </Text>
                <View style={styles.inputText}>
                  <Ionicons
                    name="mail-outline"
                    size={17}
                    color={Colors.primary}
                  />
                  <TextInput
                    placeholder={t("signup.email")}
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.country")}
                </Text>
                <View style={styles.inputText}>
                  <Ionicons
                    name="globe-outline"
                    size={17}
                    color={Colors.primary}
                  />
                  <Picker
                selectedValue={country}
                style={styles.input}
                onValueChange={(itemValue) => setCountry(itemValue)}
              >
                {countries.map((country, index) => (
                  <Picker.Item key={index} label={country} value={country} />
                ))}
              </Picker>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.password")}
                </Text>
                <View style={styles.inputText}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={17}
                    color={Colors.primary}
                  />
                  <TextInput
                    placeholder={t("signup.passwordPlaceholder")}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={17}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t("signup.confirmPassword")}
                </Text>
                <View style={styles.inputText}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={17}
                    color={Colors.primary}
                  />
                  <TextInput
                    placeholder={t("signup.confirmPasswordPlaceholder")}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={17}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.primary }]}
            onPress={handleSignup}
          >
            <Text style={[styles.buttonText, { color: Colors.white }]}>
              {t("signup.signUp")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.forgotPasswordText}>
              {t("signup.alreadyAccount")}{" "}
              <Text style={{ fontWeight: "bold" }}>{t("signup.logIn")}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SuccessModal
        visible={modalVisible}
        onClose={handleCloseModal}
        message={modalMessage}
        navigation={navigation}
      />
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
    marginRight: 20,
    marginTop: 5,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15, // 5% smaller
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
  inputArabic: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    textAlign: "right", // Align text to the right
  },
  inputContainer: {
    width: "100%",
    marginBottom: 17, // 5% smaller
  },
  labelText: {
    marginBottom: 3, // 5% smaller
    fontSize: 13, // 5% smaller
    fontWeight: "bold",
  },
  inputText: {
    width: "100%",
    borderRadius: 8, // 5% smaller
    height: 42, // 5% smaller
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12, // 5% smaller
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    marginLeft: 8, // 5% smaller
    fontSize: 13, // 5% smaller
  },
  logo: {
    width: 220, // 5% smaller
    height: 70, // 5% smaller
    marginBottom: 5, // 5% smaller
  },
  smallerImage: {
    width: 270, // Set width of smaller image
    height: 60, // Set height of smaller image
    marginBottom: 10,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    height: 50, // 5% smaller
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10, // 5% smaller
  },
  buttonText: {
    fontSize: 15, // 5% smaller
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignItems: "center",
    marginTop: 17, // 5% smaller
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 13, // 5% smaller
    color: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50, // Make it circular
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});
