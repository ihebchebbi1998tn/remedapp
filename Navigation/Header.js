import React, { useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../utils/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import SidebarModal from "./SidebarModal";
import Header2 from "./Header2";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "./apiConfig";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalText}>{t("header.AreYouSure")}</Text>
          <View style={modalStyles.modalButtons}>
            <TouchableOpacity style={modalStyles.modalButton} onPress={onClose}>
              <Text style={modalStyles.modalButtonText}>{t("header.Cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.modalButton} onPress={onConfirm}>
              <Text style={modalStyles.modalButtonText}>{t("header.SignOut")}</Text>
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
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalText}>{t("header.reportbug")}</Text>
          <TextInput
            style={modalStyles.textInput}
            placeholder={t("header.EnterBugDescription")}
            value={bugDescription}
            onChangeText={setBugDescription}
            multiline
          />
          <View style={modalStyles.modalButtons}>
            <TouchableOpacity style={modalStyles.modalButton} onPress={onClose}>
              <Text style={modalStyles.modalButtonText}>{t("header.Cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.modalButton} onPress={onSend}>
              <Text style={modalStyles.modalButtonText}>{t("header.Send")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.white,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sidebarIcon: {
    marginRight: 10,
  },
  profileIcon: {
    marginLeft: "auto",
  },
  userDropdown: {
    position: 'absolute',
    top: '9%',
    right: 10,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 5,
    padding: 10,
    zIndex: 100000,
  },
  userDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  dropdownSeparator: {
    height: 2,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 1,
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    width: 300,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: Colors.primary,
  },
});

export default Header;
