import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../../utils/color"; 
import { useTranslation } from "react-i18next";
import styles from "./Styles/StyleBottomTab";
const {  height } = Dimensions.get("window");

const TabArr = [
  {
    route: "Home",
    label: "BottomTabNavigator.Home",
    icon: "home",
    screen: "HomeScreenAdmin",
  },
  {
    route: "ProfileScreen",
    label: "BottomTabNavigator.Profile",
    icon: "user",
    screen: "ProfileScreen",
  },
];

const BottomTabNavigatorAdmin = () => {
  const { t } = useTranslation(); 

  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const navigation = useNavigation();

  const handleStartPress = () => {
    navigation.navigate("MapScreenAdmin");
  };

  const closeModal = () => {
    animateModalClose();
    setTimeout(() => {
      setMainModalVisible(false);
    }, 300);
  };

  const handleOptionSelect = () => {
    navigation.navigate("MapScreenAdmin");
  };

  const animateModalClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const modalStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabGroup}>
        {TabArr.slice(0, 1).map((item, index) => (
          <TabButton key={index} {...item} t={t} />
        ))}
      </View>
      <View style={styles.startContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartPress}
          activeOpacity={0.8}
        >
          <AntDesign name="rocket1" size={27} color="#FFF" />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={mainModalVisible}
          onRequestClose={closeModal}
        >
          <Animated.View style={[styles.modalContainer, modalStyle]}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.optionContainer}
                onPress={handleOptionSelect}
              >
                <AntDesign name="form" size={24} color={Colors.primary} />
                <Text style={styles.optionText}>{t("Start Work")}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Modal>
      </View>
      <View style={styles.tabGroup}>
        {TabArr.slice(1).map((item, index) => (
          <TabButton key={index} {...item} t={t} />
        ))}
      </View>
    </View>
  );
};

const TabButton = ({ icon, label, screen, t }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isActive = route.name === screen;

  const navigateTo = () => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={navigateTo}
    >
      <AntDesign
        name={icon}
        size={24}
        color={isActive ? Colors.primary : "#A4A4A4"}
      />
      <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
        {t(label)}
      </Text>
    </TouchableOpacity>
  );
};



export default BottomTabNavigatorAdmin;
