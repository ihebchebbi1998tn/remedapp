import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  TextInput,
  Animated,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { BASE_URL } from "../../../Navigation/apiConfig";
import Colors from "../../../utils/color";
import { LinearGradient } from "expo-linear-gradient";
import customMapStyle from "../Styles/customMapStyle";
import styles from "../Styles/StyleMapScreenAdmin";
import {
  fetchAppLanguage,
  markReportAsCollected,
  markReportAsReported,
  fetchAllReports,
} from "../Services/apiServiceAdmin";
import useModalView from "../ViewModels/AdminMapViewModel";
import ImageResources from '../../../utils/ImageRessources';
import { SafeAreaView } from 'react-native-safe-area-context';

const collectedMarkerImage = ImageResources.collectedMarkerImage;
const pendingMarkerImage = ImageResources.pendingMarkerImage;
const reportedMarkerImage = ImageResources.reportedMarkerImage;
const carImage = ImageResources.carImage;


const MapScreenAdmin = () => {
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [pulseAnimation] = useState(new Animated.Value(1));
  const [newMarkerLocation, setNewMarkerLocation] = useState(null);
  const { t, search, handleSearch, handleLocateMe, checkClosestMarker, mapRef, userLocation } = useModalView(
    markers,
    setMarkers,
    setFilteredMarkers,
    setSelectedMarker
  );
  const [collectModalVisible, setCollectModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [appLanguage, setAppLanguage] = useState(null);

  useEffect(() => {
    fetchAppLanguage(setAppLanguage);
    const intervalId = setInterval(
      () => fetchAppLanguage(setAppLanguage),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchAllReports(setMarkers, setFilteredMarkers);
  }, []);

  useEffect(() => {
    setFilteredMarkers(
      markers.filter(
        (marker) => filterStatus === "All" || marker.state === filterStatus
      )
    );
  }, [filterStatus, markers]);

  const handleCollect = () => {
    markReportAsCollected(
      selectedMarker,
      markers,
      setMarkers,
      setFilteredMarkers,
      setSelectedMarker,
      setCollectModalVisible
    );
  };

  const handleReport = () => {
    markReportAsReported(
      selectedMarker,
      markers,
      setMarkers,
      setFilteredMarkers,
      setSelectedMarker,
      setReportModalVisible
    );
  };

  const renderSortingButton = (status, label, symbol) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        filterStatus === status && styles.activeSortButton,
      ]}
      onPress={() => setFilterStatus(status)}
    >
      <Text
        style={[
          styles.sortButtonText,
          filterStatus === status && styles.activeSortButtonText,
        ]}
      >
        {label}:
        {status === "All"
          ? markers.length
          : markers.filter((marker) => marker.state === status).length}
        {symbol}
      </Text>
    </TouchableOpacity>
  );

  const renderNewMarker = () =>
    newMarkerLocation && (
      <Marker coordinate={newMarkerLocation}>
        <Image source={pendingMarkerImage} style={{ width: 30, height: 30 }} />
      </Marker>
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MainBackground }} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.inputText}>
            <Ionicons name="search-outline" size={17} color={Colors.primary} />
            <TextInput
              placeholder={t("map.Search")}
              style={styles.input}
              value={search}
              onChangeText={handleSearch}
            />
          </View>
          {dropdownVisible && (
            <View style={styles.dropdownContainer}>
              <FlatList
                data={filteredMarkers}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelectTitle(item.title)}
                  >
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                style={styles.dropdown}
              />
            </View>
          )}
        </View>

        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 33.8869,
              longitude: 9.5375,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            customMapStyle={customMapStyle}
            region={
              userLocation
                ? { ...userLocation, latitudeDelta: 0.1, longitudeDelta: 0.1 }
                : undefined
            }
          >
            {renderNewMarker()}
            {userLocation && (
              <Marker.Animated
                coordinate={userLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                style={{ transform: [{ scale: pulseAnimation }] }}
              >
                <Image source={carImage} style={{ width: 30, height: 30 }} />
              </Marker.Animated>
            )}

            {filteredMarkers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(marker.altitude),
                  longitude: parseFloat(marker.longitude),
                }}
                onPress={() => setSelectedMarker(marker)}
              >
                <Image
                  source={
                    marker.state === "Collected"
                      ? collectedMarkerImage
                      : marker.state === "Pending"
                      ? pendingMarkerImage
                      : reportedMarkerImage
                  }
                  style={{ width: 25, height: 25 }}
                />
              </Marker>
            ))}
          </MapView>
          <View style={styles.sortingContainer}>
            {renderSortingButton("All", t("map.All"), "✪")}
            {renderSortingButton("Collected", t("map.Collected"), "✓")}
            {renderSortingButton("Pending", t("map.Pending"), "⟳")}
            {renderSortingButton("Reported", t("MapScreenAdmin.Reported"), "!")}
          </View>
          <TouchableOpacity
            style={styles.localizeButton}
            onPress={handleLocateMe}
          >
            <Ionicons name="locate" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <TouchableOpacity
              style={styles.actionButton}
              onPress={checkClosestMarker}
            >
              <Text style={styles.buttonText}>{t("map.StartCollecting")}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedMarker !== null}
          onRequestClose={() => setSelectedMarker(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedMarker(null)}
              >
                <Ionicons name="close-circle-outline" size={35} color="black" />
              </TouchableOpacity>
              {selectedMarker && (
                <>
                  <Text style={styles.markerTitle}>{selectedMarker.title}</Text>
                  {selectedMarker.picture && (
                    <Image
                      source={{
                        uri: `${BASE_URL}remed/api/reports/${selectedMarker.picture}`,
                      }}
                      style={styles.markerImage}
                    />
                  )}
                  {selectedMarker.state === "Pending" && (
                    <View style={styles.modalButtonContainer}>
                      {appLanguage === "ar" ? (
                        <>
                          <TouchableOpacity
                            style={[
                              styles.modalButton,
                              styles.modalReportButton,
                            ]}
                            onPress={() => setReportModalVisible(true)}
                          >
                            <Text style={styles.modalButtonText}>
                              {t("Report")}
                            </Text>
                            <Ionicons
                              name="flag-outline"
                              size={20}
                              color={Colors.white}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setCollectModalVisible(true)}
                          >
                            <Text style={styles.modalButtonText}>
                              {t("Collect")}
                            </Text>
                            <Ionicons
                              name="checkmark"
                              size={20}
                              color={Colors.white}
                            />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <TouchableOpacity
                            style={[
                              styles.modalButton,
                              styles.modalReportButton,
                            ]}
                            onPress={() => setReportModalVisible(true)}
                            >
                              <Ionicons
                                name="flag-outline"
                                size={20}
                                color={Colors.white}
                              />
                              <Text style={styles.modalButtonText}>
                                {t("Report")}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.modalButton}
                              onPress={() => setCollectModalVisible(true)}
                            >
                              <Ionicons
                                name="checkmark"
                                size={20}
                                color={Colors.white}
                              />
                              <Text style={styles.modalButtonText}>
                                {t("Collect")}
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    )}
                    <Text style={styles.markerDescription}>
                      {selectedMarker.description}
                    </Text>
                    <View>
                      {selectedMarker.state === "Pending" ? (
                        <Text
                          style={[styles.markerStateText, styles.pendingText]}
                        >
                          {t("map.Status")} : X
                        </Text>
                      ) : selectedMarker.state === "Collected" ? (
                        <Text
                          style={[styles.markerStateText, styles.collectedText]}
                        >
                          {t("map.Status")} : ✓
                        </Text>
                      ) : (
                        <Text
                          style={[styles.markerStateText, styles.reportedText]}
                        >
                          {t("map.Status")} : Reported
                        </Text>
                      )}
                    </View>
                    <Text style={styles.markerLocation}>
                      {t("map.Location")} : {selectedMarker.location}
                    </Text>
                    {selectedMarker.pickedup_by && (
                      <Text style={styles.markerPicker}>
                        {t("map.CollectedBy")} : {selectedMarker.pickedup_by}
                      </Text>
                    )}
                    <Text style={styles.markerDate}>
                      {t("map.ReportedAt")} :{" "}
                      {new Date(selectedMarker.created_at).toLocaleString()}
                    </Text>
                    <Text style={styles.markerDate}>
                      {t("map.PickedupAt")} :{" "}
                      {new Date(selectedMarker.updated_at).toLocaleString()}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={collectModalVisible}
            onRequestClose={() => setCollectModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.confirmationModal}>
                <Text style={styles.confirmationTitle}>
                  {t("map.ConfirmCollect")}
                </Text>
                <View style={styles.confirmationButtonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.confirmationButton,
                      styles.confirmationCancelButton,
                    ]}
                    onPress={() => setCollectModalVisible(false)}
                  >
                    <Text style={styles.confirmationButtonText}>
                      {t("map.NO")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.confirmationButton,
                      styles.confirmationConfirmButton,
                    ]}
                    onPress={handleCollect}
                  >
                    <Text style={styles.confirmationButtonText}>
                      {t("map.YES")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={reportModalVisible}
            onRequestClose={() => setReportModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.confirmationModal}>
                <Text style={styles.confirmationTitle}>
                  {t("map.ConfirmReport")}
                </Text>
                <View style={styles.confirmationButtonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.confirmationButton,
                      styles.confirmationCancelButton,
                    ]}
                    onPress={() => setReportModalVisible(false)}
                  >
                    <Text style={styles.confirmationButtonText}>
                      {t("map.NO")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.confirmationButton,
                      styles.confirmationConfirmButton,
                    ]}
                    onPress={handleReport}
                  >
                    <Text style={styles.confirmationButtonText}>
                      {t("map.YES")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  };
  
  export default MapScreenAdmin;
  

