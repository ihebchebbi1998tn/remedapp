import * as React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import Colors from '../../../utils/color';
import { useMapViewModel } from '../ViewModels/MapViewModel';
import styles from '../Styles/StyleMapScreen';
import customMapStyle from '../Styles/customMapStyle';

const collectedMarkerImage = require('../../../assets/images/collected_marker.png');
const pendingMarkerImage = require('../../../assets/images/pending_marker.png');
const reportedMarkerImage = require('../../../assets/images/reported.png');
const carImage = require('../../../assets/images/green_marker.png');
const userImage = require('../../../assets/images/car.png');

const MapScreen = () => {
  const {
    search,
    filteredMarkers,
    selectedMarker,
    dropdownVisible,
    filterStatus,
    userLocation,
    pulseAnimation,
    carLocations,
    handleSearch,
    handleSelectTitle,
    setSelectedMarker,
    setDropdownVisible,
    handleLocateMe,
    renderSortingButton,
    mapRef,
    newMarkerLocation,
  } = useMapViewModel();
  const { t } = useTranslation();

  const renderNewMarker = () =>
    newMarkerLocation && (
      <Marker coordinate={newMarkerLocation}>
        <Image source={pendingMarkerImage} style={{ width: 30, height: 30 }} />
      </Marker>
    );

  const renderCars = () =>
    carLocations.map((location, index) => (
      <Marker key={index} coordinate={location}>
        <Image source={userImage} style={{ width: 30, height: 30 }} />
      </Marker>
    ));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.inputText}>
            <Ionicons name="search-outline" size={17} color={Colors.primary} />
            <TextInput
              placeholder={t('map.Search')}
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
          >
            {renderNewMarker()}
            {renderCars()}
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
                    marker.state === 'Collected'
                      ? collectedMarkerImage
                      : marker  
                      ? pendingMarkerImage
                      : reportedMarkerImage
                    }
                    style={{ width: 25, height: 25 }}
                  />
                </Marker>
              ))}
              </MapView>
              <View style={styles.sortingContainer}>
                {renderSortingButton('All', t('map.All'), '✪')}
                {renderSortingButton('Collected', t('map.Collected'), '✓')}
                {renderSortingButton('Pending', t('map.Pending'), '⟳')}
                {renderSortingButton('Reported', t('MapScreenAdmin.Reported'), '!')}
              </View>
              <TouchableOpacity
                style={styles.localizeButton}
                onPress={handleLocateMe}
              >
                <Ionicons name="locate" size={24} color={Colors.white} />
              </TouchableOpacity>
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
                      <Text style={styles.markerDescription}>
                        {selectedMarker.description}
                      </Text>
                      <View>
                        {selectedMarker.state === 'Pending' ? (
                          <Text
                            style={[styles.markerStateText, styles.pendingText]}
                          >
                            {t('map.Status')} : X
                          </Text>
                        ) : selectedMarker.state === 'Collected' ? (
                          <Text
                            style={[styles.markerStateText, styles.collectedText]}
                          >
                            {t('map.Status')} : ✓
                          </Text>
                        ) : (
                          <Text
                            style={[styles.markerStateText, styles.reportedText]}
                          >
                            {t('map.Status')} : Reported
                          </Text>
                        )}
                      </View>
                      <Text style={styles.markerLocation}>
                        {t('map.Location')} : {selectedMarker.location}
                      </Text>
                      {selectedMarker.pickedup_by && (
                        <Text style={styles.markerPicker}>
                          {t('map.CollectedBy')} : {selectedMarker.pickedup_by}
                        </Text>
                      )}
                      <Text style={styles.markerDate}>
                        {t('map.ReportedAt')} :{' '}
                        {new Date(selectedMarker.created_at).toLocaleString()}
                      </Text>
                      <Text style={styles.markerDate}>
                        {t('map.PickedupAt')} :{' '}
                        {new Date(selectedMarker.updated_at).toLocaleString()}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      );
    };
    
    export default MapScreen;
    