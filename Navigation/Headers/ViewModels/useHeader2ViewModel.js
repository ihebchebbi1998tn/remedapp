// viewmodels/useHeader2ViewModel.js
import { useState, useRef, useEffect } from "react";
import { I18nManager } from "react-native";
import { fetchReports } from "../Services/apiService";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useHeader2ViewModel = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
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

  }, []);

  useEffect(() => {
    const updateReports = async () => {
      try {
        const data = await fetchReports();

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

    updateReports();

    const fetchInterval = setInterval(updateReports, 15000);

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

  const openNotification = () => {
    setIsNotificationOpen(true);
  };

  return {
    isNotificationOpen,
    notificationText,
    closeNotification,
    openNotification,
    appLanguage,
  };
};

export default useHeader2ViewModel;
