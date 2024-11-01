import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useTranslation } from "react-i18next";
import { useProfileViewModel } from "../ViewModels/profileViewModel";
import styles from "../Styles/StyleProfileScreen";
import { Picker } from "@react-native-picker/picker";
const ProfileScreen = () => {
  const {
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
    isPrivacyVisible,
    isContactModalVisible,
    isConfirmModalVisible,
    contactSubject,
    setContactSubject,
    contactMessage,
    setContactMessage,
    handleToggleFAQVisibility,
    handleTogglePrivacyVisibility,
    handleOpenEditProfileModal,
    handleCloseEditProfileModal,
    handleOpenContactModal,
    handleCloseContactModal,
    handleSendContactMessage,
    handleSaveProfile,
    handleConfirmUpdate,
  } = useProfileViewModel();

  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("profileScreen.settings")}</Text>
      </View>
          <TouchableOpacity
            style={styles.item}
            onPress={handleOpenEditProfileModal}
          >
            <Ionicons name="person-outline" size={24} color="green" />
            <Text style={styles.itemText}>
              {t("profileScreen.editProfile")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleToggleFAQVisibility}>
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
            onPress={handleTogglePrivacyVisibility}
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
          <TouchableOpacity style={styles.item} onPress={handleOpenContactModal}>
            <Ionicons name="mail-outline" size={24} color="green" />
            <Text style={styles.itemText}>
              {t("profileScreen.contactUs")}
            </Text>
          </TouchableOpacity>
      <Modal
        visible={isContactModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseContactModal}
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
              onPress={handleSendContactMessage}
            >
              <Ionicons name="send-outline" size={20} color="white" />
              <Text style={styles.modalButtonText}>
                {t("profileScreen.send")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseContactModal}
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
        onRequestClose={handleCloseEditProfileModal}
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
              onPress={handleCloseEditProfileModal}
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
  </SafeAreaView>
  );
};

export default ProfileScreen;
