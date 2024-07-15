import React, { useContext } from "react";
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import Colors from "../../../utils/color";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../Navigation/Routings/UserContext";
import styles from "../Styles/StyleSplashScreen";
import useSplashScreenViewModel from "../ViewModels/SplashScreenViewModel";

const SplashScreen = ({ navigation }) => {
  const { updateUser } = useContext(UserContext);
  useSplashScreenViewModel(navigation, updateUser);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.centeredContent}>
        <Image
          source={require("../../../assets/logoall.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
