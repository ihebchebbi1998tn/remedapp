import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, PanResponder, Animated, I18nManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/color";
import { BASE_URL } from "../apiConfig";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header2 = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationTexts, setNotificationTexts] = useState([]);
  const notificationIndex = useRef(0);
  const { t } = useTranslation();
  const [appLanguage, setAppLanguage] = useState(null);

  useEffect(() => {
    // Fetch app language when component mounts
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

    fetchAppLanguage(); // Fetch once when mounted

    // Cleanup function to clear interval
    return () => {
      // No need to clear interval here since it's not used anymore
    };
  }, []);

  useEffect(() => {
    // Fetch reports when app language changes
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

    fetchReports(); // Fetch reports once when mounted

    const fetchInterval = setInterval(fetchReports, 15000); // Fetch reports every 15 seconds

    // Cleanup function to clear interval
    return () => clearInterval(fetchInterval);
  }, [appLanguage, t]);

  useEffect(() => {
    // Handle notification text cycling
    if (notificationTexts.length > 0) {
      const displayInterval = setInterval(() => {
        notificationIndex.current = (notificationIndex.current + 1) % notificationTexts.length;
        setNotificationText(notificationTexts[notificationIndex.current]);
      }, 4000);

      // Cleanup function to clear interval
      return () => clearInterval(displayInterval);
    }
  }, [notificationTexts]);

  const closeNotification = () => {
    setIsNotificationOpen(false);
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


export default Header2;
