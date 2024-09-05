import React from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SidebarModal from "../../../Navigation/SideBar/SidebarModal";
import Colors from "../../../utils/color";
import { LinearGradient } from "expo-linear-gradient";
import { useLoginViewModel } from "../ViewModels/useLoginViewModel";
import styles from "../Styles/StyleLogin";
import { useTranslation } from "react-i18next";
import ImageResources from '../../../utils/ImageRessources';
import { ImageBackground } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    stayLoggedIn,
    toggleStayLoggedIn,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    isLoading,
    handleLogin,
    appLanguage,
  } = useLoginViewModel(navigation);

  const { t } = useTranslation();

  return (
     <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <ImageBackground
        source={{ uri: 'https://media.istockphoto.com/id/903533082/vector/abstract-gray-background.jpg?s=612x612&w=0&k=20&c=4Voiv87FE56PeR5cZTBH7y_6rwPG4jaWD6ERIbSfbpk=' }} // Replace with your image URL
        style={{ flex: 1 }}
      >
      <View style={styles.header}>
        <TouchableOpacity onPress={openSidebar} style={styles.sidebarIcon}>
          <Ionicons name="menu" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image
          source={ImageResources.RemedLogo}
          style={styles.logo}
        />
        <Text style={styles.title}>{t("Welcome to RE-MED Community")}</Text>
        <Text style={styles.description}>{t("THE RE-MED PROJECT")}</Text>
        <Image
          source={ImageResources.EUlogo}
          style={styles.smallerImage}
        />

        <View style={styles.inputContainer}>
          <Text style={[styles.labelText, { color: Colors.primary }]}>
            {t("username")}
          </Text>
          <View style={styles.inputText}>
            {appLanguage === "ar" ? (
              <>
                <TextInput
                  placeholder={t("username")}
                  style={styles.inputArabic}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <Ionicons
                  name="mail-outline"
                  size={17}
                  color={Colors.primary}
                />
              </>
            ) : (
              <>
                <Ionicons
                  name="mail-outline"
                  size={17}
                  color={Colors.primary}
                />
                <TextInput
                  placeholder={t("username")}
                  style={styles.input}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </>
            )}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.labelText, { color: Colors.primary }]}>
            {t("password")}
          </Text>
          <View style={styles.inputText}>
            {appLanguage === "ar" ? (
              <>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={17}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder={t("password")}
                  style={styles.inputArabic}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Ionicons
                  name="lock-closed-outline"
                  size={17}
                  color={Colors.primary}
                />
              </>
            ) : (
              <>
                <Ionicons
                  name="lock-closed-outline"
                  size={17}
                  color={Colors.primary}
                />
                <TextInput
                  placeholder={t("password")}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={17}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.stayLoggedInContainer}>
            <TouchableOpacity
              style={styles.stayLoggedInCheckbox}
              onPress={toggleStayLoggedIn}
            >
              {stayLoggedIn ? (
                <Ionicons name="checkbox" size={20} color={Colors.primary} />
              ) : (
                <Ionicons
                  name="square-outline"
                  size={20}
                  color={Colors.primary}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.stayLoggedInText}>{t("Stay logged in")}</Text>
          </View>
        </View>

        <LinearGradient
          colors={[Colors.primary,Colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
         <TouchableOpacity
            style={styles.nextButton}
            onPress={handleLogin}
            disabled={isLoading || email.trim() === "" || password.trim() === ""}
          >
            {isLoading ? (
              <ActivityIndicator style={styles.nextButtonText} size="small" color={Colors.buttonsTexts} />
            ) : (
              <Text style={styles.nextButtonText}>{t("Login")}</Text>
            )}
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          style={[styles.signupButton, { borderColor: Colors.primary }]}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={[styles.signupButtonText, { color: Colors.primary }]}>
            {t("Signup")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.forgotPasswordText}>
            {t("Forgot your")}
            <Text> {t("Password ?")}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <SidebarModal isOpen={isSidebarOpen} onClose={closeSidebar} />
      </ImageBackground>
    </SafeAreaView>
  );
}
