// views/Header2.js
import React from "react";
import { View, Text, TouchableOpacity, Modal, PanResponder, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/StyleHeader2";
import Colors from "../../../utils/color";
import useHeader2ViewModel from "../ViewModels/useHeader2ViewModel";
import { SafeAreaView } from 'react-native-safe-area-context';

const Header2 = () => {
  const {
    notificationText,
    openNotification,
    appLanguage,
  } = useHeader2ViewModel();

  return (
    <>
      
      <View style={styles.container}>
        <View style={styles.notificationTextContainer}>
          {notificationText.split(' ').map((word, index) => (
            <Text key={index} style={word === ":" ? styles.colon : [styles.notificationText, appLanguage === "ar" && styles.notificationTextRTL]}>{word}{" "}</Text>
          ))}
        </View>
        <TouchableOpacity style={styles.notificationIcon} onPress={openNotification}>
          <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
          <View style={styles.notificationDot}></View>
        </TouchableOpacity>
      </View>
    </>
  );
};


export default Header2;
