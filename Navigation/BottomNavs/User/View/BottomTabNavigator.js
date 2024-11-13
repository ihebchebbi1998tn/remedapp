import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Colors from "../../../../utils/color";
import styles from "../Styles/StyleBottomTab";
import { getTabArr, TabButton } from "./tabsview";
import useBottomTabNavigatorViewModel from "../ViewModels/useModalView";
import * as Permissions from "expo-permissions"; // Use expo-permissions to handle permissions
import { useState , useEffect } from "react";
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera'; // Use Camera permission from expo-camera
import { Location } from "expo-media-library";
const renderModals = ({
  mainModalVisible,
  formModalVisible,
  thankYouModalVisible,
  title,
  description,
  location,
  locationAvailable,
  image,
  loading,
  errorModalVisible,
  appLanguage,
  submitErrorAI,
  handleOptionSelect,
  getLocation,
  submitForm,
  setTitle,
  setDescription,
  closeModal,
  t,
}) => (
  <>
    <Modal
      animationType="fade"
      transparent={true}
      visible={mainModalVisible}
      onRequestClose={closeModal}
    >
      <Animated.View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={24} color={Colors.primary} />
          </TouchableOpacity>
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
      <Animated.View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {image && (
              <Image source={{ uri: image }} style={styles.placeholderImage} />
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
                  <Text style={styles.input}>{location}</Text>
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
                    <Text style={styles.input}>{location}</Text>
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
                    <Text style={styles.input}>{location}</Text>
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
                    <Text style={styles.input}>{location}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => submitForm(t)}
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
            source={require("../../../../assets/images/thankyou.png")}
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
              <Image
                source={{ uri: image }}
                style={styles.placeholderImage}
              />
              <View style={styles.overlayIcon}>
                <Text style={styles.overlayIconText}>X</Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.submitButtonAAi}
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

const BottomTabNavigator = () => {
  const {
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
    submitErrorAI,
    handleCameraPress,
    closeModal,
    handleOptionSelect,
    getLocation,
    submitForm,
    setTitle,
    setDescription,
  } = useBottomTabNavigatorViewModel();
  const { t } = useTranslation();
  const TabArr = getTabArr(t);


  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaPermission, setMediaPermission] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // Show alert explaining why permissions are needed
        Alert.alert(
          t('permissions_needed'),
          t('permissions_explanation'), // Replace with a string like "We need access to your camera and media to upload photos or videos."
          [
            {
              text: t('cancel'),
              style: 'cancel',
            },
            {
              text: t('ok'),
              onPress: async () => {
                // Request Camera Permission
                const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
                setCameraPermission(cameraStatus);

                // Request Media Library Permission for full access to media (not just photos or videos)
                const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
                setMediaPermission(mediaStatus);
              },
            },
          ]
        );
      } catch (error) {
        console.error('Error requesting permissions:', error);
        Alert.alert(
          t('error'),
          t('permissions_request_failed')
        );
      }
    };

    requestPermissions();
  }, []);

  const handleCameraPressWithPermission = async () => {
    try {
      if (cameraPermission === 'granted' && mediaPermission === 'granted') {
        handleCameraPress();
      } else {
        Alert.alert(
          t('permissions_required'),
          t('camera_and_media_permissions_needed') // "Camera and media permissions are required to use this feature."
        );
      }
    } catch (error) {
      console.error('Error in handleCameraPressWithPermission:', error);
      Alert.alert(
        t('error'),
        t('camera_access_failed')
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.tabGroup}>
        {TabArr.slice(0, Math.floor(TabArr.length / 2)).map((item, index) => (
          <TabButton key={index} {...item} screen={item.screen} t={t} />
        ))}
      </View>
      <View style={styles.cameraContainer}>
      <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleCameraPressWithPermission}
          activeOpacity={0.8}
          disabled={cameraPermission !== 'granted' || mediaPermission !== 'granted'}
        >
          <AntDesign name="camera" size={27} color="#FFF" />
        </TouchableOpacity>
        {renderModals({
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
          submitErrorAI,
          handleOptionSelect,
          getLocation,
          submitForm,
          setTitle,
          setDescription,
          closeModal,
          t,
        })}
      </View>
      <View style={styles.tabGroup}>
        {TabArr.slice(Math.floor(TabArr.length / 2)).map((item, index) => (
          <TabButton key={index} {...item} screen={item.screen} />
        ))}
      </View>
    </View>
  );
};

export default BottomTabNavigator;
