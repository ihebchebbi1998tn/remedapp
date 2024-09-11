// profileViewModel.js

import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../Navigation/Routings/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendContactMessage, updateProfile } from "../Service/apiService";
import { Alert } from "react-native";

const countriesData = {
  en: ["Tunisia", "Italy", "France", "England"],
  ar: ["تونس", "إيطاليا", "فرنسا", "إنجلترا"],
  fr: ["Tunisie", "Italie", "France", "Angleterre"],
  it: ["Tunisia", "Italia", "Francia", "Inghilterra"],
};

export const useProfileViewModel = () => {
  const { user } = useContext(UserContext);

  const [isEditProfileModalVisible, setEditProfileModalVisible] =
    useState(false);
  const [isFAQVisible, setFAQVisible] = useState(false);
  const [isHelpVisible, setHelpVisible] = useState(false);
  const [isPrivacyVisible, setPrivacyVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [email, setEmail] = useState('Iheb.chebbhshshbzbebbejebeji@lcieducation.netI');
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("iheb");
  const [lastname, setLastname] = useState("chebbi");
  const [username, setUsername] = useState("user123");
  const [country, setCountry] = useState("Tunisia");
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

  const handleToggleFAQVisibility = () => setFAQVisible(!isFAQVisible);
  const handleToggleHelpVisibility = () => setHelpVisible(!isHelpVisible);
  const handleTogglePrivacyVisibility = () =>
    setPrivacyVisible(!isPrivacyVisible);
  const handleOpenEditProfileModal = () => setEditProfileModalVisible(true);
  const handleCloseEditProfileModal = () => setEditProfileModalVisible(false);
  const handleOpenContactModal = () => setContactModalVisible(true);
  const handleCloseContactModal = () => setContactModalVisible(false);
  const handleOpenConfirmModal = () => setConfirmModalVisible(true);
  const handleCloseConfirmModal = () => setConfirmModalVisible(false);

  const handleSendContactMessage = async () => {
    if (!contactSubject || !contactMessage) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const contactData = {
      firstName: firstname,
      lastName: lastname,
      id: user.id,
      subject: contactSubject,
      message: contactMessage,
    };

    try {
      await sendContactMessage(contactData);
      Alert.alert("Success", "Message sent successfully");
      setContactSubject("");
      setContactMessage("");
    } catch (error) {
      Alert.alert("Error", error.message);
    }

    handleCloseContactModal();
  };

  const handleSaveProfile = () => setConfirmModalVisible(true);

  const handleConfirmUpdate = async () => {
    setConfirmModalVisible(false);

    const profileData = {
      Email: email,
      mot_de_passe: password,
      FirstName: firstname,
      LastName: lastname,
      Username: username,
      Country: country,
    };
  
    try {
      const response = await updateProfile(user.id, profileData);
      Alert.alert("Success", response.message);  
    } catch (error) {
      Alert.alert("Error updating profile:", error.message);
    }
  
    handleCloseEditProfileModal();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    country,
    setCountry,
    appLanguage,
    countries,
    isEditProfileModalVisible,
    isFAQVisible,
    isHelpVisible,
    isPrivacyVisible,
    isContactModalVisible,
    isConfirmModalVisible,
    contactSubject,
    setContactSubject,
    contactMessage,
    setContactMessage,
    handleToggleFAQVisibility,
    handleToggleHelpVisibility,
    handleTogglePrivacyVisibility,
    handleOpenEditProfileModal,
    handleCloseEditProfileModal,
    handleOpenContactModal,
    handleCloseContactModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    handleSendContactMessage,
    handleSaveProfile,
    handleConfirmUpdate,
  };
};
