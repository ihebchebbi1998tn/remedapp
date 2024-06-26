import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SidebarModal from "../../Navigation/SidebarModal";
import Colors from "../../utils/color";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailFilled(text !== "");
  };

  const handleNext = () => {
    if (email) {
      navigation.navigate("ForgotPasswordOtp", { email });
    } else {
      // Optionally, you can show a toast or alert here if email is empty
      console.warn("Please enter your email");
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
        <View style={styles.inputContainer}>
          <Text style={[styles.labelText, { color: Colors.primary }]}>{t('PleaseEnter')}</Text>
          <View style={[styles.inputText, isEmailFilled && styles.inputFilled]}>
            <Ionicons name="mail-outline" size={17} color={Colors.primary} />
            <TextInput
              placeholder="example@gmail.com"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
            />
          </View>
        </View>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.primary }]} onPress={handleNext}>
          <Text style={[styles.buttonText, { color: Colors.white }]}>{t('Next')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.signupButton, { borderColor: Colors.primary }]} onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={[styles.signupButtonText, { color: Colors.primary }]}>{t('GoBack')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => console.log("Forgot your password clicked")}>
        </TouchableOpacity>
      </View>
      <SidebarModal isOpen={isSidebarOpen} onClose={closeSidebar} />
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
  inputFilled: {
    backgroundColor: Colors.green,
    color: Colors.white,
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
  stayLoggedInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: '1%',
  },
  stayLoggedInCheckbox: {
    marginRight: 8,
  },
  stayLoggedInText: {
    fontSize: 12,
    color: Colors.primary,
  },
  forgotPasswordButton: {
    marginTop: 10, // Adjust spacing as needed
  },
  forgotPasswordText: {
    fontSize: 14, // Adjust font size as needed
    color: Colors.primary,
  },
});
