import React from "react";
import { View, Text, TouchableOpacity, Modal, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../../utils/color";
import { useTranslation } from "react-i18next";
import useBottomTabNavigatorAdminViewModel from "../ViewModels/BottomTabNavigatorAdminViewModel";
import styles from "../Styles/StyleBottomTab";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
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

const BottomTabNavigatorAdmin = () => {
  const { t } = useTranslation();
  const {
    mainModalVisible,
    openModal,
    closeModal,
    modalStyle,
    handleStartPress,
    handleOptionSelect,
  } = useBottomTabNavigatorAdminViewModel();

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

export default BottomTabNavigatorAdmin;
