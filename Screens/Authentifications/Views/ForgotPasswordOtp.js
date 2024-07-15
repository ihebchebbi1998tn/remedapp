import React from "react";
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SidebarModal from "../../../Navigation/SideBar/SidebarModal";
import Colors from "../../../utils/color";
import useForgotPasswordOtpViewModel from "../ViewModels/useForgotPasswordOtpViewModel";
import styles from "../Styles/StyleForgotPasswordOtp";

export default function ForgotPasswordOtp({ navigation, route }) {
  const {
    otpCode,
    isSidebarOpen,
    isModalVisible,
    newPassword,
    confirmPassword,
    t,
    inputs,
    setOtpCode,
    openSidebar,
    closeSidebar,
    handleOtpInputChange,
    handleOtpSubmit,
    handlePasswordChange,
    setIsModalVisible,
    setNewPassword,
    setConfirmPassword,
  } = useForgotPasswordOtpViewModel(navigation, route);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary02 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openSidebar} style={styles.sidebarIcon}>
          <Ionicons name="menu" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image source={require("../../../assets/logotheme.png")} style={styles.logo} />
        <Text style={styles.title}>{t('Welcome to RE-MED Community')}</Text>
        <Text style={styles.description}>{t('THE RE-MED PROJECT')}</Text>
        <Image source={require("../../../assets/logoall.png")} style={styles.smallerImage} />

        <View style={styles.otpContainer}>
          {otpCode.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputs.current[index] = ref}
              style={[styles.otpInput, digit !== "" && { backgroundColor: Colors.primary, color: Colors.white }]}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(value) => handleOtpInputChange(index, value)}
              value={digit}
            />
          ))}
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.primary }]} onPress={handleOtpSubmit}>
          <Text style={[styles.buttonText, { color: Colors.white }]}>{t('Next')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.signupButton, { borderColor: Colors.primary }]} onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={[styles.signupButtonText, { color: Colors.primary }]}>{t('GoBack')}</Text>
        </TouchableOpacity>

      </View>
      <SidebarModal isOpen={isSidebarOpen} onClose={closeSidebar} />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('Enter New Password')}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder={t('New Password')}
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.modalInput}
              placeholder={t('Confirm Password')}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: Colors.primary }]} onPress={handlePasswordChange}>
              <Text style={[styles.buttonText, { color: Colors.white }]}>{t('Submit')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
