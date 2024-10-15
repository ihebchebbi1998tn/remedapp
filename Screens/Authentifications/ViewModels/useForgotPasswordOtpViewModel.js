import { useState, useEffect, useRef } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { sendOtpCode, updatePassword } from "../Services/apiService"; 

const useForgotPasswordOtpViewModel = (navigation, route) => {
  const { email } = route.params;
  const [otpCode, setOtpCode] = useState(["", "", "", "", ""]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();
  const inputs = useRef([]);

  useEffect(() => {
    const generateRandomCode = () => {
      return Math.floor(10000 + Math.random() * 90000).toString(); // Generate a random 5-digit OTP code
    };

    const sendCodeToApi = async () => {
      const randomCode = generateRandomCode();
      setGeneratedCode(randomCode);
      try {
        const result = await sendOtpCode(email, randomCode); // Send OTP to the new API
        if (result.success) {
          console.log("Code sent successfully");
        } else {
          Alert.alert(t('Error'), t('Failed to send OTP code'));
        }
      } catch (error) {
        console.error("Error sending code:", error);
        Alert.alert(t('Error'), t('Failed to send OTP code'));
      }
    };

    sendCodeToApi();
  }, [email]);

  const handleOtpInputChange = (index, value) => {
    const updatedOtpCode = [...otpCode];
    updatedOtpCode[index] = value;
    setOtpCode(updatedOtpCode);

    if (value !== "" && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus(); // Automatically move to the next input field
    }
  };

  const handleOtpSubmit = async () => {
    const enteredCode = otpCode.join(""); // Combine the individual digits into a single OTP code
    if (enteredCode === generatedCode) {
      setIsModalVisible(true); // If OTP is correct, show the modal to update the password
    } else {
      Alert.alert(t('Error'), t('The code is incorrect'));
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert(t('Error'), t('Passwords do not match'));
      return;
    }
  
    try {
      const response = await updatePassword(email, newPassword); // Call API
      if (response.success) {
        setIsModalVisible(false);
        Alert.alert(t('Success'), t('Password updated successfully'), [
          { text: "OK", onPress: () => navigation.navigate("LoginScreen") }
        ]);
      } else {
        Alert.alert(t('Error'), response.message || t('Failed to update password'));
      }
    } catch (error) {
      console.error("Error updating password:", error.message);
      Alert.alert(t('Error'), t('An unexpected error occurred. Please try again.'));
    }
  };
  

  return {
    otpCode,
    isSidebarOpen,
    isModalVisible,
    newPassword,
    confirmPassword,
    t,
    inputs,
    setOtpCode,
    openSidebar: () => setIsSidebarOpen(true),
    closeSidebar: () => setIsSidebarOpen(false),
    handleOtpInputChange,
    handleOtpSubmit,
    handlePasswordChange,
    setIsModalVisible,
    setNewPassword,
    setConfirmPassword,
  };
};

export default useForgotPasswordOtpViewModel;
