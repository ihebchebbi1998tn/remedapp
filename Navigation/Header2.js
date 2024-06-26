import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, PanResponder, Animated, I18nManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../utils/color";
import { BASE_URL } from "../Navigation/apiConfig";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header2 = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationTexts, setNotificationTexts] = useState([]);
  const notificationIndex = useRef(0);
  const { t } = useTranslation();
  const [appLanguage, setAppLanguage] = useState(null);

  useEffect(() => {
    const fetchAppLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("appLanguage");
        if (value) {
          const parsedValue = JSON.parse(value);
          setAppLanguage(parsedValue.key);

          if (parsedValue.key === 'ar') {
            I18nManager.forceRTL(true);
          } else {
            I18nManager.forceRTL(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppLanguage();
    const intervalId = setInterval(fetchAppLanguage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${BASE_URL}remed/api/reports/getall_report.php`);
        const data = await response.json();

        const latestReports = data.slice(0, 5).map(report => {
          return appLanguage === "ar"
            ? ` ${report.location} ${t("Someone have reported building waiste in :")} `
            : `${t("Someone have reported building waiste in :")} ${report.location}`;
        });

        setNotificationTexts(latestReports);
        if (latestReports.length > 0) {
          setNotificationText(latestReports[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
    const fetchInterval = setInterval(fetchReports, 15000);

    return () => clearInterval(fetchInterval);
  }, [appLanguage, t]);

  useEffect(() => {
    if (notificationTexts.length > 0) {
      const displayInterval = setInterval(() => {
        notificationIndex.current = (notificationIndex.current + 1) % notificationTexts.length;
        setNotificationText(notificationTexts[notificationIndex.current]);
      }, 4000);

      return () => clearInterval(displayInterval);
    }
  }, [notificationTexts]);

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.notificationTextContainer}>
          {notificationText.split(' ').map((word, index) => (
            <Text key={index} style={word === ":" ? styles.colon : [styles.notificationText, appLanguage === "ar" && styles.notificationTextRTL]}>{word}{" "}</Text>
          ))}
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
          <View style={styles.notificationDot}></View>
        </TouchableOpacity>
      </View>
      <NotificationModal isOpen={isNotificationOpen} onClose={closeNotification} />
    </>
  );
};

const NotificationModal = ({ isOpen, onClose }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx > 50) {
          onClose();
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true} onRequestClose={onClose}>
      {isOpen ? (
        <Animated.View
          style={[styles.notificationMenu, { transform: [{ translateX: pan.x }] }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity style={styles.notificationItem}>
            <Text style={styles.notificationText}>Reported trash on 15 May collected!</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  notificationTextContainer: {
    flex: 1,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    paddingLeft: 10,
  },
  notificationDot: {
    position: "absolute",
    top: 3,
    right: 5,
    backgroundColor: "red",
    width: 6,
    height: 6,
    borderRadius: 4,
  },
  notificationMenu: {
    position: "absolute",
    top: "14.5%",
    right: '8%',
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 5,
    padding: 10,
    zIndex: 1,
  },
  notificationItem: {
    paddingVertical: 8,
  },
  notificationText: {
    fontSize: 12,
  },
  notificationTextRTL: {
    textAlign: 'right',
  },
  colon: {
    fontSize: 12,
    color: "green",
  },
  userDropdown: {
    position: 'absolute',
    top: '9%',
    right: 10,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 5,
    padding: 10,
    zIndex: 2,
  },
  userDropdownItem: {
    paddingVertical: 8,
  },
});

export default Header2;
