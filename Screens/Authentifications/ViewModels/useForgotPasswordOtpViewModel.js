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
      return Math.floor(10000 + Math.random() * 90000).toString();
    };

    const sendCodeToApi = async () => {
      const randomCode = generateRandomCode();
      setGeneratedCode(randomCode);
      try {
        const result = await sendOtpCode(email, randomCode);
        if (result.success) {
          console.log("Code sent successfully");
        } else {
          console.log("Code sent successfully");
        }
      } catch (error) {
        console.error("Error sending code:", error);
      }
    };

    sendCodeToApi();
  }, [email]);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOtpInputChange = (index, value) => {
    const updatedOtpCode = [...otpCode];
    updatedOtpCode[index] = value;
    setOtpCode(updatedOtpCode);

    if (value !== "" && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleOtpSubmit = async () => {
    const enteredCode = otpCode.join("");
    if (enteredCode === generatedCode) {
      setIsModalVisible(true);
    } else {
      Alert.alert(t('Error'), t('The code is incorrect'));
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {
      try {
        const json = await updatePassword(email, newPassword);

        if (json) {
          setIsModalVisible(false);
          Alert.alert(t('Success'), t('Password updated successfully'), [
            { text: "OK", onPress: () => navigation.navigate("LoginScreen") }
          ]);
        } else {
          console.log("Failed to update password");
          Alert.alert(t('Error'), t('Failed to update password'));
        }
      } catch (error) {
        console.error("Error updating password:", error.message);
      }
    } else {
      Alert.alert(t('Error'), t('Passwords do not match'));
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
    openSidebar,
    closeSidebar,
    handleOtpInputChange,
    handleOtpSubmit,
    handlePasswordChange,
    setIsModalVisible,
    setNewPassword,
    setConfirmPassword,
  };
};

export default useForgotPasswordOtpViewModel;
