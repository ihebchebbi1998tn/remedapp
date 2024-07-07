import React, { useState, useContext, useEffect} from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import SidebarModal from "../SideBar/SidebarModal";
import Header2 from "./Header2";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../apiConfig";
import { UserContext } from "../Routings/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Styles/StyleHeader";

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isReportBugModalOpen, setIsReportBugModalOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const { t } = useTranslation();
  const { user, updateUser } = useContext(UserContext);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSignOut = () => {
    setIsSignOutModalOpen(true);
  };

  const confirmSignOut = () => {
    setIsSignOutModalOpen(false);
    handleLogout();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const cancelSignOut = () => {
    setIsSignOutModalOpen(false);
  };

  const handleReportBug = () => {
    setIsReportBugModalOpen(true);
  };

  const closeReportBugModal = () => {
    setIsReportBugModalOpen(false);
  };

  const sendBugReport = () => {
    if (bugDescription.trim() === "") {
      Alert.alert(t("header.ErrorMessageTitle"), t("header.ErrorMessage"));
      return;
    }

    const firstName = user.FirstName;
    const lastName = user.LastName;
    const id = user.id;
    const subject = 'Bug Report';

    const url = `${BASE_URL}/remed/api/utilisateur/sendbug.php?firstName=${firstName}&lastName=${lastName}&id=${id}&subject=${subject}&message=${encodeURIComponent(bugDescription)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        Alert.alert(t("header.SuccessMessageTitle"), t("header.SuccessMessage"));
        closeReportBugModal();
      })
      .catch(error => {
        Alert.alert(t("header.SuccessMessageTitle"), t("header.SuccessMessage"));
        closeReportBugModal();
      });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={openSidebar} style={styles.sidebarIcon}>
          <Ionicons name="menu" size={24} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleUserDropdown} style={styles.profileIcon}>
          <Ionicons name="person-circle" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SidebarModal isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isUserDropdownOpen && (
        <UserDropdownMenu
          onClose={toggleUserDropdown}
          onReportBug={handleReportBug}
          onSignOut={handleSignOut}
          t={t}
        />
      )}
      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={cancelSignOut}
        onConfirm={confirmSignOut}
        t={t}
      />
      <ReportBugModal
        isOpen={isReportBugModalOpen}
        onClose={closeReportBugModal}
        onSend={sendBugReport}
        bugDescription={bugDescription}
        setBugDescription={setBugDescription}
        t={t}
      />
      <Header2 />
    </>
  );
};

const UserDropdownMenu = ({ onClose, onReportBug, onSignOut, t }) => {
  return (
    <View style={styles.userDropdown}>
      <TouchableOpacity onPress={onSignOut} style={styles.userDropdownItem}>
        <Ionicons name="log-out" size={20} color={Colors.primary} style={styles.icon} />
        <Text>{t("header.signout")}</Text>
      </TouchableOpacity>
      <View style={styles.dropdownSeparator} />
      <TouchableOpacity onPress={onReportBug} style={styles.userDropdownItem}>
        <Ionicons name="bug" size={20} color={Colors.primary} style={styles.icon} />
        <Text>{t("header.reportbug")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignOutModal = ({ isOpen, onClose, onConfirm, t }) => {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{t("header.AreYouSure")}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>{t("header.Cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
              <Text style={styles.modalButtonText}>{t("header.SignOut")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ReportBugModal = ({ isOpen, onClose, onSend, bugDescription, setBugDescription, t }) => {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{t("header.reportbug")}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={t("header.EnterBugDescription")}
            value={bugDescription}
            onChangeText={setBugDescription}
            multiline
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>{t("header.Cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onSend}>
              <Text style={styles.modalButtonText}>{t("header.Send")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};



export default Header;
