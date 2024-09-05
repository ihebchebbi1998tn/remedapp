import React, { useContext } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import Colors from "../../../utils/color";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../Navigation/Routings/UserContext";
import styles from "../Styles/StyleSplashScreen";
import useSplashScreenViewModel from "../ViewModels/SplashScreenViewModel";
import ImageResources from '../../../utils/ImageRessources';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }) => {
  const { updateUser } = useContext(UserContext);
  useSplashScreenViewModel(navigation, updateUser);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.centeredContent}>
        <Image
          source={ImageResources.EUlogo}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
