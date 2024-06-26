import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Header from "../../Navigation/Header";
import BottomTabNavigatorAdmin from "../../Navigation/BottomTabNavigatorAdmin";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../Navigation/apiConfig";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../../Navigation/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const countriesData = {
  en: ["Tunisia", "Italy", "France", "England"],
  ar: ["تونس", "إيطاليا", "فرنسا", "إنجلترا"],
  fr: ["Tunisie", "Italie", "France", "Angleterre"],
  it: ["Tunisia", "Italia", "Francia", "Inghilterra"],
};

const ProfileScreenAdmin = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [isEditProfileModalVisible, setEditProfileModalVisible] =
    useState(false);
  const [isFAQVisible, setFAQVisible] = useState(false);
  const [isHelpVisible, setHelpVisible] = useState(false);
  const [isPrivacyVisible, setPrivacyVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState(user.FirstName);
  const [lastname, setLastname] = useState(user.LastName);
  const [username, setUsername] = useState(user.Username);
  const [country, setCountry] = useState(user.Country);
  const [appLanguage, setAppLanguage] = useState(null);
  const [countries, setCountries] = useState(countriesData.en);

  useEffect(() => {
    const fetchAppLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("appLanguage");
        if (value) {
          const parsedValue = JSON.parse(value);
          setAppLanguage(parsedValue.key);
          setCountries(countriesData[parsedValue.key] || countriesData.en);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppLanguage();
  }, []);

  const openEditProfileModal = () => setEditProfileModalVisible(true);
  const closeEditProfileModal = () => setEditProfileModalVisible(false);
  const toggleFAQVisibility = () => setFAQVisible(!isFAQVisible);
  const toggleHelpVisibility = () => setHelpVisible(!isHelpVisible);
  const togglePrivacyVisibility = () => setPrivacyVisible(!isPrivacyVisible);
  const openContactModal = () => setContactModalVisible(true);
  const closeContactModal = () => setContactModalVisible(false);

  const handleSendContact = async () => {
    if (!contactSubject || !contactMessage) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const contactUrl = `${BASE_URL}remed/api/utilisateur/sendemail.php`;
    const params = new URLSearchParams({
      firstName: firstname,
      lastName: lastname,
      id: user.id,
      subject: contactSubject,
      message: contactMessage,
    }).toString();

    try {
      const response = await fetch(`${contactUrl}?${params}`, {
        method: "GET",
      });

      const result = await response.text();
      console.log(result);
      if (response.ok) {
        Alert.alert("Success", "Message sent successfully");
        setContactSubject("");
        setContactMessage("");
      } else {
        Alert.alert("Error", result);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }

    closeContactModal();
  };

  const handleSaveProfile = () => setConfirmModalVisible(true);

  const handleConfirmUpdate = async () => {
    setConfirmModalVisible(false);

    const updateUrl = `${BASE_URL}remed/api/utilisateur/update_utilisateur.php?id=${user.id}`;

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("Email", email);
    formData.append("mot_de_passe", password);
    formData.append("FirstName", firstname);
    formData.append("LastName", lastname);
    formData.append("Username", username);
    formData.append("Country", country);

    try {
      const response = await fetch(updateUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      console.log(result);
      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully");
      } else {
        alert("Error updating profile: " + result);
      }
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }

    closeEditProfileModal();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("profileScreen.settings")}</Text>
        </View>
            <TouchableOpacity
              style={styles.item}
              onPress={openEditProfileModal}
            >
              <Ionicons name="person-outline" size={24} color="green" />
              <Text style={styles.itemText}>
                {t("profileScreen.editProfile")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={toggleFAQVisibility}>
              <Ionicons name="help-circle-outline" size={24} color="green" />
              <Text style={styles.itemText}>{t("profileScreen.faqs")}</Text>
            </TouchableOpacity>
            {isFAQVisible && (
              <View style={styles.faqContainer}>
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>{t("profileScreen.Q1")}</Text>
                  <Text style={styles.faqAnswer}>
                  {t("profileScreen.A1")}
                  </Text>
                </View>
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>{t("profileScreen.Q2")}</Text>
                  <Text style={styles.faqAnswer}>
                  {t("profileScreen.A2")}
                  </Text>
                </View>
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>
                  {t("profileScreen.Q3")}
                  </Text>
                  <Text style={styles.faqAnswer}>
                  {t("profileScreen.A3")}
                  </Text>
                </View>
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>
                  {t("profileScreen.Q4")}                 
                   </Text>
                  <Text style={styles.faqAnswer}>
                  {t("profileScreen.A4")}                 
                  </Text>
                </View>
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>
                  {t("profileScreen.Q5")}                 
                  </Text>
                  <Text style={styles.faqAnswer}>
                  {t("profileScreen.A5")}                 
                  </Text>
                </View>
              </View>
            )}
      
            <TouchableOpacity
              style={styles.item}
              onPress={togglePrivacyVisibility}
            >
              <Ionicons name="lock-closed-outline" size={24} color="green" />
              <Text style={styles.itemText}>{t("profileScreen.privacy")}</Text>
            </TouchableOpacity>
            {isPrivacyVisible && (
              <View style={styles.privacyContainer}>
                <Text style={styles.privacyText}>
                  {t("profileScreen.privacyPolicy")}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.item} onPress={openContactModal}>
              <Ionicons name="mail-outline" size={24} color="green" />
              <Text style={styles.itemText}>
                {t("profileScreen.contactUs")}
              </Text>
            </TouchableOpacity>
        <Modal
          visible={isContactModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeContactModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {t("profileScreen.contactUs")}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t("profileScreen.subject")}
                value={contactSubject}
                onChangeText={setContactSubject}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder={t("profileScreen.message")}
                value={contactMessage}
                onChangeText={setContactMessage}
                multiline
              />
              <TouchableOpacity
                style={styles.modalButtonContact}
                onPress={handleSendContact}
              >
                <Ionicons name="send-outline" size={20} color="white" />
                <Text style={styles.modalButtonText}>
                  {t("profileScreen.send")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeContactModal}
              >
                <Ionicons name="close-outline" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isEditProfileModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeEditProfileModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {t("profileScreen.editProfile")}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t("signup.firstName")}
                value={firstname}
                onChangeText={setFirstname}
              />
              <TextInput
                style={styles.input}
                placeholder={t("signup.lastName")}
                value={lastname}
                onChangeText={setLastname}
              />
              <TextInput
                style={styles.input}
                placeholder={t("signup.username")}
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder={t("signup.email")}
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder={t("signup.password")}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <View style={styles.pickerContainer}>
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
              <TouchableOpacity
                style={styles.modalButtonContact}
                onPress={handleSaveProfile}
              >
                {appLanguage === "ar" ? (
                  <>
                    <Text style={styles.modalButtonText}>
                      {t("profileScreen.save")}
                    </Text>
                    <Ionicons name="save-outline" size={20} color="white" />
                  </>
                ) : (
                  <>
                    <Ionicons name="save-outline" size={20} color="white" />
                    <Text style={styles.modalButtonText}>
                      {t("profileScreen.save")}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeEditProfileModal}
              >
                <Ionicons name="close-outline" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isConfirmModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setConfirmModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirmation</Text>
              <Text style={styles.modalMessage}>
                {t("profileScreen.confirmUpdate")}
              </Text>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleConfirmUpdate}
                >
                  <Text style={styles.modalButtonText}>
                    {t("profileScreen.YES")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.noButton]}
                  onPress={() => setConfirmModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>
                    {t("profileScreen.NO")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <BottomTabNavigatorAdmin />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80, // Ensure padding for bottom navbar
  },
  header: {
    padding: 16,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  item: {
    flexDirection: "row",
    alignItems: "center", // Adjusted to 'center' for both languages
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    marginLeft: 16,
    fontSize: 18,
    color: "green",
  },
  faqContainer: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  faqAnswer: {
    fontSize: 14,
    color: "#333",
  },
  helpContainer: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  helpItem: {
    marginBottom: 16,
  },
  helpQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  helpAnswer: {
    fontSize: 14,
    color: "#333",
  },
  privacyContainer: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  privacyText: {
    fontSize: 14,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonContact: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ProfileScreenAdmin;
