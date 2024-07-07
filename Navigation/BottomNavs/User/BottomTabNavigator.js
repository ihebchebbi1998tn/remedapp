import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Colors from "../../../utils/color";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Styles/StyleBottomTab";
import { BASE_URL } from "../../apiConfig";
import { UserContext } from "../../Routings/UserContext";
const { width, height } = Dimensions.get("window");

const BottomTabNavigator = () => {
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [thankYouModalVisible, setThankYouModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [locationAvailable, setLocationAvailable] = useState(false);
  const [image, setImage] = useState(null);
  const [altitude, setaltitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const { user } = useContext(UserContext);
  const [appLanguage, setAppLanguage] = useState(null);
  const [foundTags , setfoundTags] = useState([]);
 const [falseURL, setFalseURL] = useState("");

 useEffect(() => {
  console.log(foundTags);
}, [foundTags]);

useEffect(() => {
  console.log(falseURL);
}, [falseURL]);

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
    };

    fetchAppLanguage();
    const intervalId = setInterval(fetchAppLanguage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const TabArr = [
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

  const handleCameraPress = () => {
    setMainModalVisible(true);
    animateModal();
  };

  const closeModal = () => {
    animateModalClose();
    setTimeout(() => {
      setMainModalVisible(false);
      setFormModalVisible(false);
    }, 300);
  };

  const submitForm = async () => {
    if (
      !title ||
      !description ||
      !location ||
      !altitude ||
      !longitude ||
      !imageFile?.uri
    ) {
      console.log("Form data incomplete:", {
        title,
        description,
        location,
        altitude,
        longitude,
        image,
        imageFile,
      });
      alert(t("AllFieldsAreRequired"));
      return;
    }

    setLoading(true);

    const fileUri = imageFile.uri.split("/").pop();
    const formData = new FormData();
    formData.append("reported_by_id", `${user.id}`);
    formData.append("reported_by", `${user.FirstName} ${user.LastName}`);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", user.Country);
    formData.append("altitude", altitude.toString());
    formData.append("longitude", longitude.toString());
    formData.append("state", "Pending");
    formData.append("pickedup_by", "null");
    formData.append("picture", {
      uri:
        Platform.OS === "android"
          ? imageFile.uri
          : imageFile.uri.replace("file://", ""),
      name: encodeURIComponent(fileUri) || "image.jpg",
      type: imageFile.type || "image/jpeg",
    });

    try {
      console.log("Submitting form with data:", formData);

      const queryParams = new URLSearchParams({
        reported_by: `${user.FirstName} ${user.LastName}`, // Replace with the actual user ID
        title,
        description,
        location: user.Country,
        altitude: altitude.toString(),
        longitude: longitude.toString(),
        state: "Pending",
        pickedup_by: "null",
      });

      const response = await fetch(
        `${BASE_URL}remed/api/reports/create_report.php?${queryParams.toString()}`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = await response.json();
      console.log("API response:", result);

      if (result.status === true) {
        console.log("Image accepted");
        closeModal();
        setThankYouModalVisible(true);
        setTimeout(() => setThankYouModalVisible(false), 2000);
      } else {
        setfoundTags(result.tags);
        setFalseURL(result.image_url);
        console.log(foundTags);
        console.log(falseURL);
        closeModal();
        setErrorModalVisible(true);
        setTimeout(() => setErrorModalVisible(false), 50000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorModalVisible(true);
      setTimeout(() => setErrorModalVisible(false), 6000);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = async (option) => {
    let result;

    if (option === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.8, // High quality
      });
    } else if (option === "gallery") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.8, // High quality
      });
    }

    if (!result.cancelled) {
      const { assets } = result;
      if (assets && assets.length > 0) {
        const fileInfo = await FileSystem.getInfoAsync(assets[0].uri);
        setImage(assets[0].uri);
        setImageFile({
          uri: assets[0].uri,
          name: fileInfo.uri.split("/").pop(),
          type: fileInfo.mimeType || "image/jpeg",
        });
        await getLocation();
      }
    }

    setFormModalVisible(true);
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

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocationAvailable(true);
      setaltitude(coords.latitude);
      setLongitude(coords.longitude);
      setLocation(
        `Altitude: ${coords.latitude}, Longitude: ${coords.longitude}`
      );
    } catch (error) {
      console.error("Error getting current location:", error);
    }
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

  const submitErrorAI = async () => {
   
    const contactUrl = `${BASE_URL}remed/api/utilisateur/Aireport.php`;
    const params = new URLSearchParams({
      ReceivedTags: foundTags.join(","),
      ImageUrl: falseURL,
    }).toString();

     console.log(contactUrl+"?"+params);
    try {
      const response = await fetch(`${contactUrl}?${params}`, {
        method: 'GET',
      });
      const result = await response.text();
      console.log(result);
      if (response.ok) {

        Alert.alert(t("Success"),t("header.SuccessMessage"));
        setErrorModalVisible(false);

      } else {
        Alert.alert(t("header.ErrorMessageTitle"), result);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderModals = () => (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={mainModalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.modalContainer, modalStyle]}>
          <View style={styles.modalContent}>
          {appLanguage === "ar" ? (
              <>
                 <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => handleOptionSelect("camera")}
            >
              <Text style={styles.optionText}>
                {t("BottomTabNavigator.takepicture")}
              </Text>
              <AntDesign name="camera" size={24} color={Colors.primary} />

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => handleOptionSelect("gallery")}
            >
              <Text style={styles.optionText}>
                {t("BottomTabNavigator.uploadpicture")}
              </Text>
              <AntDesign name="folder1" size={24} color={Colors.primary} />

            </TouchableOpacity>
              </>
            ) : (
              <>
                 <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => handleOptionSelect("camera")}
            >
              <AntDesign name="camera" size={24} color={Colors.primary} />
              <Text style={styles.optionText}>
                {t("BottomTabNavigator.takepicture")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => handleOptionSelect("gallery")}
            >
              <AntDesign name="folder1" size={24} color={Colors.primary} />
              <Text style={styles.optionText}>
                {t("BottomTabNavigator.uploadpicture")}
              </Text>
            </TouchableOpacity>
              </>
            )}
           
          </View>
        </Animated.View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={formModalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.modalContainer, modalStyle]}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={styles.placeholderImage}
                />
              )}
            </View>
            {appLanguage === "ar" ? (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelText}>
                    {t("BottomTabNavigator.Title")}
                  </Text>
                  <View style={styles.inputText}>
                    <TextInput
                      style={styles.input}
                      placeholder=""
                      value={title}
                      onChangeText={setTitle}
                    />
                    <Ionicons
                      name="text-outline"
                      size={20}
                      color={Colors.primary}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelText}>
                    {t("BottomTabNavigator.Description")}
                  </Text>
                  <View style={styles.inputText}>
                    <TextInput
                      style={styles.input}
                      placeholder=""
                      value={description}
                      onChangeText={setDescription}
                    />
                    <Ionicons
                      name="document-outline"
                      size={20}
                      color={Colors.primary}
                    />
                  </View>
                </View>
                {locationAvailable ? (
                  <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>
                      {t("BottomTabNavigator.Location")}
                    </Text>
                    <View style={styles.inputText}>
                      <Text style={styles.input}>{user.Country}</Text>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={Colors.primary}
                      />
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={getLocation}
                  >
                    <Text style={styles.labelText}>
                      {t("BottomTabNavigator.Location")}
                    </Text>
                    <View style={styles.inputText}>
                      <Text style={styles.input}>{user.Country}</Text>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={Colors.primary}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelText}>
                    {t("BottomTabNavigator.Title")}
                  </Text>
                  <View style={styles.inputText}>
                    <Ionicons
                      name="text-outline"
                      size={20}
                      color={Colors.primary}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder=""
                      value={title}
                      onChangeText={setTitle}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelText}>
                    {t("BottomTabNavigator.Description")}
                  </Text>
                  <View style={styles.inputText}>
                    <Ionicons
                      name="document-outline"
                      size={20}
                      color={Colors.primary}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder=""
                      value={description}
                      onChangeText={setDescription}
                    />
                  </View>
                </View>
                {locationAvailable ? (
                  <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>
                      {t("BottomTabNavigator.Location")}
                    </Text>
                    <View style={styles.inputText}>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={Colors.primary}
                      />
                      <Text style={styles.input}>{user.Country}</Text>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={getLocation}
                  >
                    <Text style={styles.labelText}>
                      {t("BottomTabNavigator.Location")}
                    </Text>
                    <View style={styles.inputText}>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={Colors.primary}
                      />
                      <Text style={styles.input}>{user.Country}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitForm}
              disabled={loading} 
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {t("BottomTabNavigator.Submit")}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={thankYouModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require("../../../assets/images/thankyou.png")}
              style={styles.celebrationImage}
            />
            <Text style={styles.thankYouText}>
              {t("BottomTabNavigator.ThankYou")}
            </Text>
            <Text style={styles.thankYouSubText}>
              {t("BottomTabNavigator.SubmissionSuccessful")}
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>
              {t("BottomTabNavigator.ErrorImage")}
            </Text>
           
            {image && (
              <View style={styles.imageContainer}>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={styles.placeholderImage}
                  />
                )}
                {image && (
                  <View style={styles.overlayIcon}>
                    <Text style={styles.overlayIconText}>X</Text>
                  </View>
                )}
              </View>
            )}
              <TouchableOpacity
              style={styles.submitButton}
              onPress={submitErrorAI}
            >
             <Text style={styles.submitButtonText}>
              {t("BottomTabNavigator.MadeMistake")}
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabGroup}>
        {TabArr.slice(0, Math.floor(TabArr.length / 2)).map((item, index) => (
          <TabButton key={index} {...item} screen={item.screen} />
        ))}
      </View>
      <View style={styles.cameraContainer}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleCameraPress}
          activeOpacity={0.8}
        >
          <AntDesign name="camera" size={27} color="#FFF" />
        </TouchableOpacity>
        {renderModals()}
      </View>
      <View style={styles.tabGroup}>
        {TabArr.slice(Math.floor(TabArr.length / 2)).map((item, index) => (
          <TabButton key={index} {...item} screen={item.screen} />
        ))}
      </View>
    </View>
  );
};

const TabButton = ({ icon, label, screen }) => {
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


export default BottomTabNavigator;
