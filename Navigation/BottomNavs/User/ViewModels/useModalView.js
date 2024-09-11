import { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../../Routings/UserContext";
import { submitReport, submitErrorAI } from "../Services/apiService";

const useBottomTabNavigatorViewModel = () => {
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [thankYouModalVisible, setThankYouModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [locationAvailable, setLocationAvailable] = useState(false);
  const [image, setImage] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const { user } = useContext(UserContext);
  const [appLanguage, setAppLanguage] = useState(null);
  const [foundTags, setFoundTags] = useState([]);
  const [falseURL, setFalseURL] = useState("");

  useEffect(() => {
    const fetchAppLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("appLanguage");
        if (value) {
          setAppLanguage(JSON.parse(value).key);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppLanguage();
    const intervalId = setInterval(fetchAppLanguage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCameraPress = () => {
    setMainModalVisible(true);
  };

  const closeModal = () => {
    setTimeout(() => {
      setMainModalVisible(false);
      setFormModalVisible(false);
    }, 300);
  };

  const submitForm = async (t) => {
    if (!title || !description || !location || !altitude || !longitude || !imageFile?.uri) {
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
      const result = await submitReport(formData, user, title, description, user.Country, altitude, longitude);
      if (result.status) {
        closeModal();
        setThankYouModalVisible(true);
        setTimeout(() => setThankYouModalVisible(false), 2000);
      } else {
        setFoundTags(result.tags);
        setFalseURL(result.image_url);
        closeModal();
        setErrorModalVisible(true);
        setTimeout(() => setErrorModalVisible(false), 50000);
      }
    } catch (error) {
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
        quality: 0.8,
      });
    } else if (option === "gallery") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.8,
      });
    }
    if (result.cancelled) {
      setMainModalVisible(false);
      setFormModalVisible(false);
      return; 
    }

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
    setFormModalVisible(true);
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocationAvailable(true);
      setAltitude(coords.latitude);
      setLongitude(coords.longitude);
      setLocation(`Altitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return {
    mainModalVisible,
    formModalVisible,
    thankYouModalVisible,
    title,
    description,
    location,
    locationAvailable,
    image,
    altitude,
    longitude,
    imageFile,
    loading,
    errorModalVisible,
    appLanguage,
    foundTags,
    falseURL,
    handleCameraPress,
    closeModal,
    handleOptionSelect,
    getLocation,
    submitErrorAI,
    submitForm,
    setTitle,
    setDescription,
  };
};

export default useBottomTabNavigatorViewModel;
