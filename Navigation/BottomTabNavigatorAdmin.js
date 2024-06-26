import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../utils/color"; // Make sure this file exists and contains the color definitions
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

const TabArr = [
  { route: "Home", label: "BottomTabNavigator.Home", icon: "home", screen: "HomeScreenAdmin" },
  {
    route: "Profile",
    label: "BottomTabNavigator.Profile",
    icon: "user",
    screen: "ProfileScreenAdmin",
  },
];

const BottomTabNavigatorAdmin = () => {
  const { t } = useTranslation(); // Move this inside the functional component

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

  const animateModal = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
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

const TabButton = ({ icon, label, screen, t }) => { // Pass 't' as prop here
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 17,
  },
  startContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 42,
    padding: 13,
    marginBottom: 8,
    elevation: 6,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  activeTabButton: {
    backgroundColor: "#FFF",
    borderRadius: 26,
    paddingHorizontal: 10,
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 10,
    color: "#A4A4A4",
  },
  activeTabLabel: {
    color: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.9,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.primary,
    paddingHorizontal: 10,
  },
});

export default BottomTabNavigatorAdmin;
