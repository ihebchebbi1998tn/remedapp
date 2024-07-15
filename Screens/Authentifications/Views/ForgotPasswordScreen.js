import React from "react";
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SidebarModal from "../../../Navigation/SideBar/SidebarModal";
import Colors from "../../../utils/color";
import { useTranslation } from "react-i18next";
import styles from "../Styles/StyleForgotPassword";
import useForgotPasswordViewModel from "../ViewModels/useForgotPasswordViewModel";
export default function ForgotPasswordScreen({ navigation }) {
  const { email, isEmailFilled, handleEmailChange, handleNext } = useForgotPasswordViewModel(navigation);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary02 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.sidebarIcon}>
          <Ionicons name="menu" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image source={require("../../../assets/logotheme.png")} style={styles.logo} />
        <Text style={styles.title}>{t('Welcome to RE-MED Community')}</Text>
        <Text style={styles.description}>{t('THE RE-MED PROJECT')}</Text>
        <Image source={require("../../../assets/logoall.png")} style={styles.smallerImage} />
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
      <SidebarModal isOpen={false} onClose={() => {}} />
    </SafeAreaView>
  );
}
