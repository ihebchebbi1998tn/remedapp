import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useTranslation } from "react-i18next";
import * as Location from "expo-location";
import Colors from "../../../utils/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../../Navigation/Routings/UserContext";
import { BASE_URL } from "../../../Navigation/apiConfig";
import styles from "../Styles/StatsStyle";

const Stats = () => {
  const { t } = useTranslation();
  const [temperature, setTemperature] = useState(null);
  const [qrVisible, setQrVisible] = useState(false);
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [latestUsers, setLatestUsers] = useState([]);
  const animationValues = useRef([]).current;
  const [appLanguage, setAppLanguage] = useState(null);
  const { user } = useContext(UserContext);
  const [userCountry,setUserCountry] = useState('Tunis')
  animationValues.length = latestUsers.length; 
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}api/reports/all`
      );
      const result = await response.json();
      setData((prevData) => {
        if (JSON.stringify(prevData) !== JSON.stringify(result)) {
          return result;
        }
        return prevData;
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const fetchAppLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("appLanguage");
        if (value) {
          const parsedValue = JSON.parse(value);
          setAppLanguage(parsedValue.key);
        }
      } catch (error) {
        console.error(error);
      }
      setUserCountry('Tunis');
    };
    fetchAppLanguage();
    const intervalId = setInterval(fetchAppLanguage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance.toFixed(1);
  };

  const fetchTemperature = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=f7830b447e4949f98f4205650241705&q=${user.Country}`
      );
      setTemperature(response.data.current.temp_c);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const calculateCollectedPercentage = () => {
    const collectedCount = data.reduce(
      (count, item) => ((item.state === "Collected" && item.state === 'Reported') ? count + 1 : count),
      0
    );
    return ((collectedCount / data.length) * 100).toFixed(0);
  };

  useEffect(() => {
    fetchData();
    getUserLocation();
    fetchTemperature();
  }, [fetchData, fetchTemperature]);

  useEffect(() => {
    if (data.length > 0 && userLocation) {
      const enhancedData = data.map((item) => {
        const distance = userLocation
          ? calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            parseFloat(item.altitude),
            parseFloat(item.longitude)
          )
          : "N/A";
        return {
          id: item.id,
          name: item.reported_by || "Unknown",
          location: item.location || "Unknown",
          distance: distance + " km",
          coords: {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
          },
          image: { uri: `${BASE_URL}` + item.picture },
          state: item.state,
        };
      });
      setLatestUsers(enhancedData.slice(-3));
      animateList(enhancedData.slice(-3));
    }
  }, [data, userLocation]);

  const animateList = (users, appLanguage) => {
    users.forEach((user, index) => {
      animationValues[index] = new Animated.Value(0);
    });

    Animated.stagger(
      100,
      users.map((_, i) =>
        Animated.timing(animationValues[i], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  };

  return (
    <View style={styles.container}>
      <StatsContainer
        temperature={temperature}
        t={t}
        totalReports={data.length}
        collectedPercentage={calculateCollectedPercentage()}
        appLanguage={appLanguage}
        userCountry={userCountry} 

      />
      <ButtonsRow
        setQrVisible={setQrVisible}
        t={t}
        appLanguage={appLanguage}
      />
      <Text style={styles.headerText}>{t("stats.latestReports")}</Text>
      <FlatList
        data={latestUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Animated.View
            style={{
              ...styles.card,
              opacity: animationValues[index],
              transform: [
                {
                  scale: animationValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            }}
          >
            <Image source={item.image} style={styles.image} />

            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>
                {item.location} - {item.distance}
              </Text>
            </View>
            <TouchableOpacity style={styles.likeButton}>
              <Text style={styles.likeButtonText}>
                {item.state === "Collected" ? "✅" : "❎"}
              </Text>
            </TouchableOpacity>

          </Animated.View>
        )}
      />
      <QrModal qrVisible={qrVisible} setQrVisible={setQrVisible} t={t} />
    </View>
  );
};

const StatsContainer = ({
  temperature,
  t,
  totalReports,
  collectedPercentage,
  appLanguage,
  userCountry,
}) => (
  <View style={styles.statsContainer}>
    <Svg height="150" width="150" viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="45"
        stroke="#5A9360"
        strokeWidth="5"
        fill="none"
      />
      <Circle
        cx="50"
        cy="50"
        r="45"
        stroke="#ecd58e"
        strokeWidth="5"
        strokeDasharray="282"
        strokeDashoffset={`${282 - (collectedPercentage / 100) * 282}`}
        fill="none"
      />
    </Svg>
    <Text style={styles.percentageText}>{collectedPercentage}%</Text>
    <Text style={styles.subtitle}>{t("stats.left")}</Text>
    <View style={styles.infoRow}>
    {
  (userCountry === "Saudi Arabia") ? (
    <>
      {appLanguage === "ar" && <InfoItem label="السعودية" subtitle={t("stats.location")} />}
      {appLanguage === "fr" && <InfoItem label="Arabie Saoudite" subtitle={t("stats.location")} />}
      {appLanguage === "it" && <InfoItem label="Arabia Saudita" subtitle={t("stats.location")} />}
      {appLanguage !== "ar" && appLanguage !== "fr" && appLanguage !== "it" && <InfoItem label="Saudi Arabia" subtitle={t("stats.location")} />}
    </>
  ) : (userCountry === "Tunis") ? (
    <>
      {appLanguage === "ar" && <InfoItem label="تونس" subtitle={t("stats.location")} />}
      {appLanguage === "fr" && <InfoItem label="Tunisie" subtitle={t("stats.location")} />}
      {appLanguage === "it" && <InfoItem label="Tunisia" subtitle={t("stats.location")} />}
      {appLanguage !== "ar" && appLanguage !== "fr" && appLanguage !== "it" && <InfoItem label="Tunis" subtitle={t("stats.location")} />}
    </>
  ) : (userCountry === "Italy") ? (
    <>
      {appLanguage === "ar" && <InfoItem label="إيطاليا" subtitle={t("stats.location")} />}
      {appLanguage === "fr" && <InfoItem label="Italie" subtitle={t("stats.location")} />}
      {appLanguage === "it" && <InfoItem label="Italia" subtitle={t("stats.location")} />}
      {appLanguage !== "ar" && appLanguage !== "fr" && appLanguage !== "it" && <InfoItem label="Italy" subtitle={t("stats.location")} />}
    </>
  ) : (userCountry === "France") ? (
    <>
      {appLanguage === "ar" && <InfoItem label="فرنسا" subtitle={t("stats.location")} />}
      {appLanguage === "fr" && <InfoItem label="France" subtitle={t("stats.location")} />}
      {appLanguage === "it" && <InfoItem label="Francia" subtitle={t("stats.location")} />}
      {appLanguage !== "ar" && appLanguage !== "fr" && appLanguage !== "it" && <InfoItem label="France" subtitle={t("stats.location")} />}
    </>
  ) : (
    // Default case
    <>
      <InfoItem label={userCountry} subtitle={t("stats.location")} />
    </>
  )
}


      <InfoItem
        label={temperature !== null ? `${temperature} ℃` : "Loading..."}
        subtitle={t("stats.temperature")}
      />
      <InfoItem label={totalReports.toString()} subtitle={t("stats.reports")} />
    </View>
  </View>
);


const InfoItem = ({ label, subtitle }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoText}>{label}</Text>
    <Text style={styles.infoSubtitle}>{subtitle}</Text>
  </View>
);

const ButtonsRow = ({ setQrVisible, t, appLanguage }) => (
  <View style={styles.buttonsRow}>
    {appLanguage === "ar" ? (
      <>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t("stats.callCollect")}</Text>
          <Icon name="phone" size={20} color="#FCF5F3" style={[styles.icon, styles.iconRight]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setQrVisible(true)}
        >
          <Text style={styles.buttonText}>{t("stats.tellFriend")}</Text>
          <Icon
            name="share-alt"
            size={20}
            color="#FCF5F3"
            style={[styles.icon, styles.iconRight]}
          />
        </TouchableOpacity>
      </>
    ) : (
      <>
        <TouchableOpacity style={styles.button}>
          <Icon name="phone" size={20} color={Colors.white} style={styles.icon} />
          <Text style={styles.buttonText}>{t("stats.callCollect")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setQrVisible(true)}
        >
          <Icon
            name="share-alt"
            size={20}
            color={Colors.white}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>{t("stats.tellFriend")}</Text>
        </TouchableOpacity>
      </>
    )}
  </View>
);

const QrModal = ({ qrVisible, setQrVisible, t }) => (
  <Modal visible={qrVisible} transparent={true} animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.qrContainer}>
        <Image
          source={require("../../../assets/images/QRCode.png")}
          style={styles.qrImage}
        />
        <TouchableOpacity
          onPress={() => setQrVisible(false)}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>{t("stats.close")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);


export default Stats;
