// tabsview.js
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../../../utils/color";
import styles from "../Styles/StyleBottomTab";

export const getTabArr = (t) => [
  {
    route: "Home",
    label: t("BottomTabNavigator.Home"),
    icon: "home",
    screen: "HomeScreen",
  },
  {
    route: "Map",
    label: t("BottomTabNavigator.Map"),
    icon: "search1",
    screen: "MapScreen",
  },
  {
    route: "History",
    label: t("BottomTabNavigator.History"),
    icon: "clockcircleo",
    screen: "HistoryScreen",
  },
  {
    route: "Profile",
    label: t("BottomTabNavigator.Profile"),
    icon: "user",
    screen: "ProfileScreen",
  },
];

export const TabButton = ({ icon, label, screen, t }) => {
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
        {label}
      </Text>
    </TouchableOpacity>
  );
};
