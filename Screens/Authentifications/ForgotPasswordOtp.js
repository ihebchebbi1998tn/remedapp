import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Modal, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SidebarModal from "../../Navigation/SidebarModal";
import Colors from "../../utils/color";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../Navigation/apiConfig";

export default function ForgotPasswordOtp({ navigation, route }) {
  const { email } = route.params;
  console.log(email);
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
        const response = await fetch(`${BASE_URL}remed/api/utilisateur/code.php?Email=${email}&CODE=${randomCode}`);
        const textResponse = await response.text();
        try {
          const result = JSON.parse(textResponse);
          if (result.success) {
            console.log("Code sent successfully");
          } else {
            console.log("Code sent successfully");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          console.log("Response text:", textResponse);
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
      Alert.alert(t('Error'),t('The code is incorrect'));
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await fetch(`${BASE_URL}remed/api/utilisateur/updatepassword.php?Email=${email}&Password=${newPassword}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const json = await response.json();
        
        if (json) {
          setIsModalVisible(false);
          Alert.alert(t('Success'),t('Password updated successfully') , [
            { text: "OK", onPress: () => navigation.navigate("LoginScreen") }
          ]);
        } else {
          console.log("Failed to update password");
          Alert.alert(t('Error'),t('Failed to update password'));
        }
      } catch (error) {
        console.error("Error updating password:", error.message);
      }
    } else {
      Alert.alert(t('Error'),t('Passwords do not match'));
    }
  };
  
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary02 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openSidebar} style={styles.sidebarIcon}>
          <Ionicons name="menu" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image source={require("../../assets/logotheme.png")} style={styles.logo} />
        <Text style={styles.title}>{t('Welcome to RE-MED Community')}</Text>
        <Text style={styles.description}>{t('THE RE-MED PROJECT')}</Text>
        <Image source={require("../../assets/logoall.png")} style={styles.smallerImage} />

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
  },
  container: {
    flex: 0.9,
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    marginRight: 10,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 220, // 5% smaller
    height: 70, // 5% smaller
    marginBottom: 5, // 5% smaller
  },
  smallerImage: {
    width: 270, // Set width of smaller image
    height: 60, // Set height of smaller image
    marginBottom: 15, // Margin bottom for smaller image
  },
  button: {
    width: "100%",
    alignItems: "center",
    padding: 13, // 5% smaller
    borderRadius: 8, // 5% smaller
    marginBottom: 8, // 5% smaller
  },
  buttonText: {
    fontSize: 13, // 5% smaller
    fontWeight: "bold",
  },
  signupButton: {
    width: "100%",
    alignItems: "center",
    padding: 13, // 5% smaller
    borderRadius: 8, // 5% smaller
    borderWidth: 1,
  },
  signupButtonText: {
    fontSize: 13, // 5% smaller
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    marginTop: 10, // Adjust spacing as needed
  },
  forgotPasswordText: {
    fontSize: 14, // Adjust font size as needed
    color: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton: {
    width: "100%",
    alignItems: "center",
    padding: 13,
    borderRadius: 8,
    marginBottom: 8,
  },
});